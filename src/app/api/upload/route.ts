import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { isValidFileName, checkRateLimit } from '@/lib/security';

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
const ALLOWED_EXTENSIONS = new Set([
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
  'mp4', 'webm', 'mov',
  'pdf', 'doc', 'docx', 'xls', 'xlsx',
  'stl', 'step', 'stp', 'iges', 'igs', 'dwg', '3mf', 'obj',
]);

export async function POST(request: NextRequest) {
  // Rate limit
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(`upload:${ip}`, 20, 60000)) {
    return NextResponse.json(
      { success: false, error: 'Troppe richieste. Riprova tra un minuto.' },
      { status: 429 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Nessun file ricevuto' },
        { status: 400 }
      );
    }

    // Validate file name
    if (!isValidFileName(file.name)) {
      return NextResponse.json(
        { success: false, error: 'Nome file non valido' },
        { status: 400 }
      );
    }

    // Validate extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { success: false, error: `Tipo file non consentito: .${ext}` },
        { status: 400 }
      );
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File troppo grande (max 15 MB)' },
        { status: 400 }
      );
    }

    // Read file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Magic bytes check for common file types (basic content validation)
    if (!validateMagicBytes(buffer, ext)) {
      return NextResponse.json(
        { success: false, error: 'Il contenuto del file non corrisponde all\'estensione' },
        { status: 400 }
      );
    }

    // Generate safe unique filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${timestamp}_${safeName}`;

    // Upload using service_role (bypasses RLS)
    const { data, error } = await supabaseAdmin.storage
      .from('preventivi-allegati')
      .upload(path, buffer, {
        contentType: file.type || 'application/octet-stream',
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return NextResponse.json(
        { success: false, error: 'Errore durante l\'upload' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('preventivi-allegati')
      .getPublicUrl(data.path);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      name: file.name,
    });
  } catch (err) {
    console.error('Upload API error:', err);
    return NextResponse.json(
      { success: false, error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

/**
 * Basic magic bytes validation to ensure file content matches extension
 */
function validateMagicBytes(buffer: Buffer, ext: string): boolean {
  if (buffer.length < 4) return false;

  const magicMap: Record<string, number[][]> = {
    jpg: [[0xFF, 0xD8, 0xFF]],
    jpeg: [[0xFF, 0xD8, 0xFF]],
    png: [[0x89, 0x50, 0x4E, 0x47]],
    gif: [[0x47, 0x49, 0x46, 0x38]],
    pdf: [[0x25, 0x50, 0x44, 0x46]],
    mp4: [], // complex container, skip
    webm: [[0x1A, 0x45, 0xDF, 0xA3]],
    mov: [], // complex container, skip
  };

  const signatures = magicMap[ext];
  if (!signatures || signatures.length === 0) return true; // no check for this type

  return signatures.some((sig) =>
    sig.every((byte, i) => buffer[i] === byte)
  );
}

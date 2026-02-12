import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import {
  sanitizeFormData,
  isValidEmail,
  isValidPhone,
  containsMaliciousContent,
  isValidSupabaseUrl,
  checkRateLimit,
} from '@/lib/security';
import { sendPreventivoEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // ── Rate limiting ────────────────────────────────
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(`preventivo:${ip}`, 5, 60000)) {
      return NextResponse.json(
        { success: false, error: 'Troppe richieste. Riprova tra un minuto.' },
        { status: 429 }
      );
    }

    // ── Parse body ───────────────────────────────────
    const raw = await request.json();

    // ── Sanitize all string fields ───────────────────
    const body = sanitizeFormData(raw);

    const {
      nome,
      email,
      telefono = '',
      azienda = '',
      tipo_cliente = null,
      settore = null,
      servizi_selezionati = [],
      messaggio = '',
      allegati = [],
      provenienza = null,
    } = body;

    // ── Validate required fields ─────────────────────
    if (!nome || typeof nome !== 'string' || nome.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Nome richiesto (min 2 caratteri)' },
        { status: 400 }
      );
    }

    if (nome.length > 200) {
      return NextResponse.json(
        { success: false, error: 'Nome troppo lungo' },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Email non valida' },
        { status: 400 }
      );
    }

    if (telefono && !isValidPhone(telefono)) {
      return NextResponse.json(
        { success: false, error: 'Formato telefono non valido' },
        { status: 400 }
      );
    }

    // ── Check for malicious content ──────────────────
    const textFields = [nome, email, telefono, azienda, messaggio, provenienza].filter(Boolean);
    for (const field of textFields) {
      if (containsMaliciousContent(field as string)) {
        return NextResponse.json(
          { success: false, error: 'Contenuto non consentito rilevato' },
          { status: 400 }
        );
      }
    }

    // ── Validate arrays ──────────────────────────────
    if (!Array.isArray(servizi_selezionati) || servizi_selezionati.length > 20) {
      return NextResponse.json(
        { success: false, error: 'Servizi non validi' },
        { status: 400 }
      );
    }

    for (const s of servizi_selezionati) {
      if (typeof s !== 'string' || s.length > 200 || containsMaliciousContent(s)) {
        return NextResponse.json(
          { success: false, error: 'Servizio non valido' },
          { status: 400 }
        );
      }
    }

    // ── Validate allegati URLs ───────────────────────
    const validAllegati: string[] = [];
    if (Array.isArray(allegati)) {
      for (const url of allegati) {
        if (typeof url === 'string' && (isValidSupabaseUrl(url) || url.startsWith('https://'))) {
          validAllegati.push(url);
        }
      }
    }

    // ── Validate tipo_cliente & settore ──────────────
    if (tipo_cliente && typeof tipo_cliente !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Tipo cliente non valido' },
        { status: 400 }
      );
    }

    if (settore && typeof settore !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Settore non valido' },
        { status: 400 }
      );
    }

    // ── Limit message length ─────────────────────────
    const cleanMessaggio = typeof messaggio === 'string' ? messaggio.slice(0, 5000) : '';

    // ── Insert into Supabase ─────────────────────────
    // Try with new columns first, fall back to base columns if migration hasn't run
    const fullPayload = {
      nome,
      email,
      telefono: telefono || null,
      azienda: azienda || null,
      tipo_cliente: tipo_cliente || null,
      settore: settore || null,
      servizi_selezionati: servizi_selezionati as string[],
      messaggio: cleanMessaggio || null,
      allegati: validAllegati,
      provenienza: provenienza || null,
      stato: 'nuovo',
    };

    let { data, error } = await supabaseAdmin.from('preventivi').insert(fullPayload).select().single();

    // Fallback: if new columns don't exist yet, insert with base columns only
    if (error && error.code === 'PGRST204') {
      console.warn('New columns not found — using base schema. Run migration_preventivi_v2.sql to enable all features.');
      const basePayload = {
        nome,
        email,
        telefono: telefono || null,
        azienda: azienda || null,
        servizi_selezionati: servizi_selezionati as string[],
        messaggio: cleanMessaggio || null,
        stato: 'nuovo',
      };
      ({ data, error } = await supabaseAdmin.from('preventivi').insert(basePayload).select().single());
    }

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Errore nel salvataggio' },
        { status: 500 }
      );
    }

    // ── Send email notification ──────────────────────
    try {
      await sendPreventivoEmail({
        nome,
        email,
        telefono: telefono || undefined,
        azienda: azienda || undefined,
        tipo_cliente: (tipo_cliente as string) || undefined,
        settore: (settore as string) || undefined,
        servizi_selezionati: servizi_selezionati as string[],
        messaggio: cleanMessaggio || undefined,
        allegati: validAllegati,
        provenienza: (provenienza as string) || undefined,
      });
    } catch (emailErr) {
      // Log but don't fail — the quote is saved in DB
      console.error('Email notification failed:', emailErr);
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { success: false, error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

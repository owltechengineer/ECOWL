import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  // Rate limit: max 5 tentativi al minuto
  if (!checkRateLimit(`admin-auth:${ip}`, 5, 60000)) {
    return NextResponse.json(
      { success: false, error: 'Troppi tentativi. Riprova tra un minuto.' },
      { status: 429 }
    );
  }

  const { password } = await request.json();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { success: false, error: 'Password admin non configurata.' },
      { status: 500 }
    );
  }

  if (password === adminPassword) {
    // Genera un token semplice basato su password + timestamp (valido per 24h)
    const expiry = Date.now() + 24 * 60 * 60 * 1000;
    const token = Buffer.from(`${adminPassword}:${expiry}`).toString('base64');

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 ore
    });

    return response;
  }

  return NextResponse.json(
    { success: false, error: 'Password errata.' },
    { status: 401 }
  );
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!token || !adminPassword) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [pwd, expiryStr] = decoded.split(':');
    const expiry = parseInt(expiryStr);

    if (pwd === adminPassword && Date.now() < expiry) {
      return NextResponse.json({ authenticated: true });
    }
  } catch {
    // Token non valido
  }

  return NextResponse.json({ authenticated: false });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_token');
  return response;
}

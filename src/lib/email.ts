// ============================================================
// OWLTECH — Email Sending Utility (Nodemailer)
// ============================================================

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface PreventivoEmailData {
  nome: string;
  email: string;
  telefono?: string;
  azienda?: string;
  tipo_cliente?: string;
  settore?: string;
  servizi_selezionati: string[];
  messaggio?: string;
  allegati: string[];
  provenienza?: string;
}

export async function sendPreventivoEmail(data: PreventivoEmailData) {
  const to = process.env.NOTIFICATION_EMAIL || 'info@owltech.it';
  const from = process.env.SMTP_FROM || 'noreply@owltech.it';

  const allegatiHtml = data.allegati.length > 0
    ? `<tr>
        <td style="padding:8px 12px;color:#999;font-size:12px;vertical-align:top;white-space:nowrap;">Allegati</td>
        <td style="padding:8px 12px;font-size:13px;">${data.allegati.map((a) => `<a href="${a}" style="color:#FF6600;display:block;margin-bottom:4px;">${decodeURIComponent(a.split('/').pop() || 'file')}</a>`).join('')}</td>
      </tr>`
    : '';

  const html = `
  <div style="font-family:'Courier New',monospace;max-width:600px;margin:0 auto;background:#0a0a0a;border:1px solid #333;padding:0;">
    <div style="padding:24px 24px 16px;border-bottom:1px solid #222;">
      <h1 style="margin:0;font-size:18px;color:#FF6600;letter-spacing:2px;">OWLTECH — NUOVA RICHIESTA</h1>
      ${data.provenienza ? `<p style="margin:8px 0 0;font-size:11px;color:#666;">Provenienza: ${data.provenienza}</p>` : ''}
    </div>
    <table style="width:100%;border-collapse:collapse;color:#fff;">
      <tr style="border-bottom:1px solid #1a1a1a;">
        <td style="padding:8px 12px;color:#999;font-size:12px;white-space:nowrap;">Nome</td>
        <td style="padding:8px 12px;font-size:13px;">${data.nome}</td>
      </tr>
      <tr style="border-bottom:1px solid #1a1a1a;">
        <td style="padding:8px 12px;color:#999;font-size:12px;">Email</td>
        <td style="padding:8px 12px;font-size:13px;"><a href="mailto:${data.email}" style="color:#FF6600;">${data.email}</a></td>
      </tr>
      ${data.telefono ? `<tr style="border-bottom:1px solid #1a1a1a;"><td style="padding:8px 12px;color:#999;font-size:12px;">Telefono</td><td style="padding:8px 12px;font-size:13px;">${data.telefono}</td></tr>` : ''}
      ${data.azienda ? `<tr style="border-bottom:1px solid #1a1a1a;"><td style="padding:8px 12px;color:#999;font-size:12px;">Azienda</td><td style="padding:8px 12px;font-size:13px;">${data.azienda}</td></tr>` : ''}
      ${data.tipo_cliente ? `<tr style="border-bottom:1px solid #1a1a1a;"><td style="padding:8px 12px;color:#999;font-size:12px;">Tipo</td><td style="padding:8px 12px;font-size:13px;">${data.tipo_cliente}</td></tr>` : ''}
      ${data.settore ? `<tr style="border-bottom:1px solid #1a1a1a;"><td style="padding:8px 12px;color:#999;font-size:12px;">Settore</td><td style="padding:8px 12px;font-size:13px;">${data.settore}</td></tr>` : ''}
      <tr style="border-bottom:1px solid #1a1a1a;">
        <td style="padding:8px 12px;color:#999;font-size:12px;vertical-align:top;">Servizi</td>
        <td style="padding:8px 12px;font-size:13px;">${data.servizi_selezionati.length > 0 ? data.servizi_selezionati.join(', ') : '—'}</td>
      </tr>
      ${data.messaggio ? `<tr style="border-bottom:1px solid #1a1a1a;"><td style="padding:8px 12px;color:#999;font-size:12px;vertical-align:top;">Messaggio</td><td style="padding:8px 12px;font-size:13px;white-space:pre-wrap;">${data.messaggio}</td></tr>` : ''}
      ${allegatiHtml}
    </table>
    <div style="padding:16px 24px;border-top:1px solid #222;text-align:center;">
      <p style="margin:0;font-size:10px;color:#555;letter-spacing:1px;">OWLTECH — ENGINEERING BEYOND LIMITS</p>
    </div>
  </div>`;

  try {
    await transporter.sendMail({
      from,
      to,
      subject: `Nuova richiesta preventivo — ${data.nome}${data.azienda ? ` (${data.azienda})` : ''}`,
      html,
      replyTo: data.email,
    });
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

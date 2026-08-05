// Envoi de l'accusé de réception d'une candidature « Devenir guide ».
// Appelée depuis /rejoindre/ juste après l'insertion en base.
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const SENDER = Deno.env.get('SENDER_EMAIL') || 'La plateforme Omra <contact@laplateformeomra.com>';
const BCC_EMAIL = Deno.env.get('BCC_EMAIL') || 'contact@laplateformeomra.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOGO_URL = 'https://www.laplateformeomra.com/assets/images/logo-email.png';
const GREETING = "As-salamu 'aleykom wa rahmatoulLahi wa barakaatouh,";

function esc(s: unknown): string {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildApplicationEmail(a: Record<string, string>): string {
  const row = (label: string, value: string) => value ? `
    <tr>
      <td style="padding:11px 16px;border-bottom:1px solid #EFEDE6;font-family:Arial,sans-serif;font-size:13px;color:#6B6B63;width:42%;">${esc(label)}</td>
      <td style="padding:11px 16px;border-bottom:1px solid #EFEDE6;font-family:Arial,sans-serif;font-size:14px;color:#1C1C1A;font-weight:500;">${esc(value)}</td>
    </tr>` : '';

  const cityLabel = a.city === 'mecca' ? 'Makkah' : a.city === 'medina' ? 'Médine' : (a.city || '');
  const rows = [
    row('Nom & prénom', `${a.first_name || ''} ${a.last_name || ''}`.trim()),
    row('E-mail', a.email || ''),
    row('Téléphone', a.phone || ''),
    row('Ville de résidence', cityLabel),
    row('Langues parlées', a.languages || ''),
  ].join('');

  const experience = (a.experience || '').trim();

  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF8F4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F4;padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #EFEDE6;">
        <tr><td style="background:#14513A;padding:28px 32px;text-align:center;">
          <div style="display:inline-block;background:#FFFFFF;border-radius:12px;padding:10px 18px;margin:0 auto 12px;"><img src="${LOGO_URL}" alt="La plateforme Omra" width="58" height="73" style="display:block;width:58px;height:73px;" /></div>
          <div style="font-family:Georgia,serif;font-size:20px;font-weight:bold;color:#E9D9AE;">Candidature bien reçue</div>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#4A4A42;">
            ${GREETING}
          </p>
          <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#4A4A42;">
            Merci pour votre intérêt. Nous avons bien reçu votre candidature pour rejoindre
            l'équipe de guides de La plateforme Omra. Notre équipe l'étudie avec attention
            et reviendra vers vous au plus vite après analyse.
          </p>
          <div style="font-family:Georgia,serif;font-size:17px;font-weight:bold;color:#14513A;margin:0 0 12px;">Votre candidature</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #EFEDE6;border-radius:12px;overflow:hidden;">
            ${rows}
          </table>
          ${experience ? `
          <div style="margin-top:20px;padding:18px 20px;background:#FAF8F4;border:1px solid #EFEDE6;border-radius:12px;">
            <div style="font-family:Arial,sans-serif;font-size:13px;color:#6B6B63;margin-bottom:8px;">Votre expérience</div>
            <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#1C1C1A;white-space:pre-wrap;">${esc(experience)}</div>
          </div>` : ''}
          <p style="margin:24px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#4A4A42;">
            Si vous souhaitez ajouter un élément à votre dossier, répondez simplement à cet e-mail.
          </p>
          <p style="margin:16px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#4A4A42;">
            Qu'Allah facilite vos affaires.<br>— L'équipe de La plateforme Omra
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const application = await req.json();
    const to = String(application?.email || '').trim();
    if (!to) {
      return new Response(JSON.stringify({ error: 'email requis' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!RESEND_API_KEY) {
      console.log('RESEND_API_KEY manquant : email non envoyé.');
      return new Response(JSON.stringify({ sent: false }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const payload: Record<string, unknown> = {
      from: SENDER,
      to: [to],
      subject: 'Votre candidature — La plateforme Omra',
      html: buildApplicationEmail(application),
    };
    if (BCC_EMAIL) payload.bcc = [BCC_EMAIL];

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Échec envoi email candidature :', res.status, detail);
      return new Response(JSON.stringify({ sent: false, error: detail }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ sent: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err?.message || err) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

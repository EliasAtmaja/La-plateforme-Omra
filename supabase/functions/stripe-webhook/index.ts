import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
const SENDER = Deno.env.get('SENDER_EMAIL') || 'La plateforme Omra <contact@laplateformeomra.com>';
const BCC_EMAIL = Deno.env.get('BCC_EMAIL') || 'contact@laplateformeomra.com';

const MONTHS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
function formatDate(d: string): string {
  if (!d) return '';
  const [y, m, day] = d.split('-').map(Number);
  return `${day} ${MONTHS[(m || 1) - 1]} ${y}`;
}
function esc(s: string): string {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function euros(cents: number): string {
  return (Math.round(cents) / 100).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

async function verifyStripeSignature(body: string, signature: string, secret: string): Promise<boolean> {
  const parts = signature.split(',');
  const timestamp = parts.find(p => p.startsWith('t='))?.slice(2);
  const sig = parts.find(p => p.startsWith('v1='))?.slice(3);
  if (!timestamp || !sig) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const signed = await crypto.subtle.sign('HMAC', key, encoder.encode(`${timestamp}.${body}`));
  const expected = Array.from(new Uint8Array(signed)).map(b => b.toString(16).padStart(2, '0')).join('');
  return expected === sig;
}

const LOGO_URL = 'https://www.laplateformeomra.com/Sans%20titre%20logo%20adapt..png';

function buildEmail(opts: {
  clientName: string;
  lines: { guideName: string; activity: string; date: string; slot: string; guidePrice: number; servicePrice: number; groupLabel: string }[];
  paidOnlineCents: number;
}): string {
  const { clientName, lines, paidOnlineCents } = opts;
  const onsiteTotal = lines.reduce((s, l) => s + l.guidePrice, 0);
  const rows = lines.map((l) => `
    <tr>
      <td style="padding:16px;border-bottom:1px solid #EFEDE6;">
        <div style="font-family:Georgia,serif;font-size:16px;font-weight:bold;color:#14513A;">${esc(l.guideName)}</div>
        ${l.activity ? `<div style="font-family:Arial,sans-serif;font-size:14px;color:#4A4A42;margin-top:4px;">Activité : ${esc(l.activity)}</div>` : ''}
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#4A4A42;margin-top:4px;">
          Date : ${esc(formatDate(l.date))}${l.slot ? ` &middot; Créneau : ${esc(l.slot)}` : ''}
        </div>
        ${l.groupLabel ? `<div style="font-family:Arial,sans-serif;font-size:14px;color:#4A4A42;margin-top:4px;">Groupe : ${esc(l.groupLabel)}</div>` : ''}
        <div style="font-family:Arial,sans-serif;font-size:14px;color:#14513A;font-weight:bold;margin-top:8px;">
          ${l.guidePrice + l.servicePrice} &euro; <span style="font-size:12px;color:#9B9B92;font-weight:normal;">frais inclus</span>
        </div>
      </td>
    </tr>`).join('');

  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF8F4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F4;padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #EFEDE6;">
        <tr><td style="background:#14513A;padding:28px 32px;text-align:center;">
          <img src="${LOGO_URL}" alt="La plateforme Omra" width="180" style="display:block;margin:0 auto 12px;max-width:180px;height:auto;" />
          <div style="font-family:Georgia,serif;font-size:20px;font-weight:bold;color:#E9D9AE;">Confirmation de réservation</div>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#4A4A42;">
            ${clientName ? `As-salamu alaykum ${esc(clientName)},<br>` : 'As-salamu alaykum,<br>'}
            Nous vous confirmons la bonne réception de votre paiement. Voici le récapitulatif de votre réservation.
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #EFEDE6;border-radius:12px;overflow:hidden;">
            ${rows}
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;border:1px solid #EFEDE6;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:14px 16px;font-family:Arial,sans-serif;font-size:14px;color:#4A4A42;border-bottom:1px solid #EFEDE6;">Payé aujourd'hui (frais de service)</td>
              <td style="padding:14px 16px;font-family:Arial,sans-serif;font-size:16px;color:#14513A;font-weight:bold;text-align:right;border-bottom:1px solid #EFEDE6;">${euros(paidOnlineCents)} &euro;</td>
            </tr>
            <tr>
              <td style="padding:14px 16px;font-family:Arial,sans-serif;font-size:14px;color:#4A4A42;">Reste à payer sur place (au guide)</td>
              <td style="padding:14px 16px;font-family:Arial,sans-serif;font-size:16px;color:#14513A;font-weight:bold;text-align:right;">${onsiteTotal} &euro;</td>
            </tr>
          </table>
          <p style="margin:24px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#4A4A42;">
            Le reste à payer sera à régler directement à votre guide sur place. Notre équipe reste à votre entière
            disposition sur WhatsApp pour toute question durant votre séjour.
          </p>
          <p style="margin:16px 0 0;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#4A4A42;">
            Qu'Allah facilite votre voyage.<br>— L'équipe de La plateforme Omra
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function sendConfirmationEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log('RESEND_API_KEY manquant : email non envoyé.');
    return;
  }
  const payload: Record<string, unknown> = { from: SENDER, to: [to], subject, html };
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
    console.error('Échec envoi email :', res.status, await res.text());
  } else {
    console.log('Email envoyé à', to);
  }
}

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing signature', { status: 400 });
  }

  const body = await req.text();

  if (endpointSecret) {
    const valid = await verifyStripeSignature(body, signature, endpointSecret);
    if (!valid) {
      console.error('Signature Stripe invalide');
      return new Response('Invalid signature', { status: 400 });
    }
  }

  const event = JSON.parse(body);
  console.log('Événement reçu:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data?.object;
    const bookingIdsRaw = session?.metadata?.booking_ids;
    const itemDetailsRaw = session?.metadata?.item_details;

    if (bookingIdsRaw) {
      const bookingIds: string[] = JSON.parse(bookingIdsRaw);
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      await supabase
        .from('bookings')
        .update({
          status: 'paid',
          amount_paid: session.amount_total || 0,
        })
        .in('id', bookingIds);

      const clientEmail = session.customer_details?.email || session.customer_email || '';
      const clientName = session.customer_details?.name || '';
      console.log('Client:', clientEmail, clientName);

      if (clientEmail) {
        let lines: any[] = [];

        if (itemDetailsRaw) {
          const details = JSON.parse(itemDetailsRaw);
          lines = details.map((d: any) => ({
            guideName: d.guideName || 'Guide',
            activity: d.activityName || '',
            date: d.date || '',
            slot: d.slot || '',
            guidePrice: d.guidePrice || 0,
            servicePrice: d.servicePrice || 0,
            groupLabel: d.groupLabel || '',
          }));
        } else {
          const { data: bookings } = await supabase
            .from('bookings')
            .select('id, guide_id, date, slot, activity_name')
            .in('id', bookingIds);

          const guideIds = [...new Set((bookings || []).map((b: any) => b.guide_id))];
          const { data: guides } = await supabase
            .from('guides')
            .select('id, first_name, last_name, price_per_day, service_price')
            .in('id', guideIds);

          const guideMap: Record<string, any> = {};
          (guides || []).forEach((g: any) => { guideMap[g.id] = g; });

          lines = (bookings || []).map((b: any) => {
            const g = guideMap[b.guide_id];
            return {
              guideName: g ? `${g.first_name} ${g.last_name}` : 'Guide',
              activity: b.activity_name || '',
              date: b.date,
              slot: b.slot || '',
              guidePrice: g?.price_per_day || 0,
              servicePrice: g?.service_price || 0,
              groupLabel: '',
            };
          });
        }

        try {
          const html = buildEmail({
            clientName,
            lines,
            paidOnlineCents: session.amount_total || 0,
          });
          await sendConfirmationEmail(clientEmail, 'Votre réservation — La plateforme Omra', html);
        } catch (err) {
          console.error('Erreur email :', err);
        }
      }
    } else {
      console.log('Pas de booking_ids dans les metadata');
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@14.14.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// ---- Config email (à renseigner en secrets Supabase) ----
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';
// Adresse d'expéditeur : doit appartenir à un domaine vérifié dans Resend.
// ⚠️ Vérifie l'orthographe exacte du domaine (avec ou sans tiret).
const SENDER = Deno.env.get('SENDER_EMAIL') || 'La plateforme Omra <contact@laplateforme-omra.com>';
// Copie cachée reçue par l'équipe (optionnel).
const BCC_EMAIL = Deno.env.get('BCC_EMAIL') || 'contact@laplateforme-omra.com';

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

// Construit le HTML de l'email de confirmation.
function buildEmail(opts: {
  clientName: string;
  lines: { guideName: string; activity: string; date: string; slot: string; guidePrice: number; servicePrice: number }[];
  paidOnlineCents: number;
}): string {
  const { clientName, lines, paidOnlineCents } = opts;
  const onsiteTotal = lines.reduce((s, l) => s + l.guidePrice, 0); // reste à payer sur place (€)
  const rows = lines.map((l) => `
    <tr>
      <td style="padding:14px 16px;border-bottom:1px solid #EFEDE6;font-family:Georgia,serif;color:#14513A;font-size:16px;font-weight:bold;">
        ${esc(l.guideName)}
        ${l.activity ? `<div style="font-family:Arial,sans-serif;font-size:13px;font-weight:normal;color:#6B6B63;margin-top:2px;">${esc(l.activity)}</div>` : ''}
      </td>
      <td style="padding:14px 16px;border-bottom:1px solid #EFEDE6;font-family:Arial,sans-serif;font-size:14px;color:#4A4A42;">
        ${esc(formatDate(l.date))}${l.slot ? ` &middot; ${esc(l.slot)}` : ''}
      </td>
      <td style="padding:14px 16px;border-bottom:1px solid #EFEDE6;font-family:Arial,sans-serif;font-size:14px;color:#4A4A42;text-align:right;white-space:nowrap;">
        ${l.guidePrice + l.servicePrice} &euro;<br>
        <span style="font-size:12px;color:#9B9B92;">frais inclus</span>
      </td>
    </tr>`).join('');

  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF8F4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F4;padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #EFEDE6;">
        <tr><td style="background:#14513A;padding:28px 32px;text-align:center;">
          <div style="font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#E9D9AE;">La plateforme Omra</div>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 8px;font-family:Georgia,serif;font-size:24px;color:#14513A;">Votre réservation est confirmée</h1>
          <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#4A4A42;">
            ${clientName ? `As-salamu alaykum ${esc(clientName)},<br>` : 'As-salamu alaykum,<br>'}
            Nous vous confirmons la bonne réception de votre paiement. Voici le récapitulatif de votre réservation.
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #EFEDE6;border-radius:12px;overflow:hidden;">
            ${rows}
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
            <tr>
              <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:14px;color:#4A4A42;">Payé aujourd'hui (frais de service)</td>
              <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:14px;color:#14513A;font-weight:bold;text-align:right;">${euros(paidOnlineCents)} &euro;</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:14px;color:#4A4A42;">Reste à payer sur place (au guide)</td>
              <td style="padding:6px 0;font-family:Arial,sans-serif;font-size:14px;color:#14513A;font-weight:bold;text-align:right;">${onsiteTotal} &euro;</td>
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
  }
}

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing signature', { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    return new Response(`Webhook signature verification failed: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingIdsRaw = session.metadata?.booking_ids;

    if (bookingIdsRaw) {
      const bookingIds: string[] = JSON.parse(bookingIdsRaw);
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // 1) Marquer les réservations comme payées
      await supabase
        .from('bookings')
        .update({
          status: 'paid',
          amount_paid: session.amount_total || 0,
        })
        .in('id', bookingIds);

      // 2) Envoyer l'email de confirmation au client (email récupéré par Stripe)
      const clientEmail = session.customer_details?.email || session.customer_email || '';
      const clientName = session.customer_details?.name || '';

      if (clientEmail) {
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

        const lines = (bookings || []).map((b: any) => {
          const g = guideMap[b.guide_id];
          return {
            guideName: g ? `${g.first_name} ${g.last_name}` : 'Guide',
            activity: b.activity_name || '',
            date: b.date,
            slot: b.slot || '',
            guidePrice: g?.price_per_day || 0,
            servicePrice: g?.service_price || 0,
          };
        });

        try {
          const html = buildEmail({
            clientName,
            lines,
            paidOnlineCents: session.amount_total || 0,
          });
          await sendConfirmationEmail(clientEmail, 'Votre réservation — La plateforme Omra', html);
        } catch (err) {
          console.error('Erreur lors de la préparation/envoi de l\'email :', err);
        }
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
});

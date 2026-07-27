import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@14.14.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { bookingIds, items, callBooking, successUrl, cancelUrl } = await req.json();

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // ---- Cas particulier : réservation d'un appel de planification ----
    if (callBooking && callBooking.id) {
      const cb = callBooking;
      const priceCents = Math.round((cb.price || 39) * 100);
      const callDetails = {
        type: 'call',
        id: cb.id,
        date: cb.date || '',
        time: cb.time || '',
        name: cb.name || '',
        groupSize: cb.groupSize || null,
        arrival: cb.arrival || '',
        departure: cb.departure || '',
        phone: cb.phone || '',
        email: cb.email || '',
        hasTickets: !!cb.hasTickets,
      };

      const callSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'paypal'],
        mode: 'payment',
        customer_email: cb.email || undefined,
        line_items: [{
          price_data: {
            currency: 'eur',
            unit_amount: priceCents,
            product_data: {
              name: 'Appel de planification (30 min)',
              description: [cb.date, cb.time].filter(Boolean).join(' — '),
            },
          },
          quantity: 1,
        }],
        success_url: successUrl || 'https://www.laplateformeomra.com/paiement/confirmation/?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: cancelUrl || 'https://www.laplateformeomra.com/services/planification/',
        metadata: {
          call_booking_id: cb.id,
          call_details: JSON.stringify(callDetails),
        },
      });

      await supabase
        .from('call_bookings')
        .update({ stripe_session_id: callSession.id })
        .eq('id', cb.id);

      return new Response(
        JSON.stringify({ url: callSession.url }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if ((!bookingIds || bookingIds.length === 0) && (!items || items.length === 0)) {
      return new Response(
        JSON.stringify({ error: 'bookingIds ou items requis' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    let line_items: any[];
    let ids: string[] = bookingIds || [];

    let itemDetails: any[] = [];

    if (items && items.length > 0) {
      ids = items.map((i: any) => i.bookingId);
      itemDetails = items.map((item: any) => ({
        guideName: item.guideName || 'Guide',
        activityName: item.activityName || '',
        groupLabel: item.groupLabel || '',
        date: item.date || '',
        slot: item.slot || '',
        servicePrice: item.servicePrice || 0,
        guidePrice: item.guidePrice || 0,
        price: item.price || 0,
      }));
      line_items = items.map((item: any) => ({
        price_data: {
          currency: 'eur',
          unit_amount: Math.round((item.servicePrice || item.price || 0) * 100),
          product_data: {
            name: item.guideName || 'Guide',
            description: [item.activityName, item.date, item.slot, item.groupLabel].filter(Boolean).join(' — '),
          },
        },
        quantity: 1,
      }));
    } else {
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('id, guide_id, date, slot, activity_name')
        .in('id', bookingIds);

      if (error) {
        return new Response(
          JSON.stringify({ error: `Erreur DB: ${error.message}` }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      }

      if (!bookings || bookings.length === 0) {
        return new Response(
          JSON.stringify({ error: `Aucune réservation trouvée pour les IDs: ${JSON.stringify(bookingIds)}` }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      }

      const guideIds = [...new Set(bookings.map((b: any) => b.guide_id))];
      const { data: guides } = await supabase
        .from('guides')
        .select('id, first_name, last_name, price_per_day')
        .in('id', guideIds);

      const guideMap: Record<string, any> = {};
      (guides || []).forEach((g: any) => { guideMap[g.id] = g; });

      line_items = bookings.map((b: any) => {
        const guide = guideMap[b.guide_id];
        const guideName = guide ? `${guide.first_name} ${guide.last_name}` : 'Guide';
        const price = guide?.price_per_day || 0;
        const slotLabel = b.slot ? ` (${b.slot})` : '';
        const actLabel = b.activity_name ? ` — ${b.activity_name}` : '';

        return {
          price_data: {
            currency: 'eur',
            unit_amount: Math.round(price * 100),
            product_data: {
              name: `${guideName}${actLabel}`,
              description: `${b.date}${slotLabel}`,
            },
          },
          quantity: 1,
        };
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      mode: 'payment',
      line_items,
      success_url: successUrl || 'https://www.laplateformeomra.com/paiement/confirmation/?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: cancelUrl || 'https://www.laplateformeomra.com/guides/',
      metadata: {
        booking_ids: JSON.stringify(ids),
        item_details: JSON.stringify(itemDetails),
      },
      payment_intent_data: {
        metadata: {
          booking_ids: JSON.stringify(ids),
        },
      },
    });

    await supabase
      .from('bookings')
      .update({ stripe_session_id: session.id })
      .in('id', ids);

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});

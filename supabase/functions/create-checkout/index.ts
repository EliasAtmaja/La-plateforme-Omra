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
    const { bookingIds, items, successUrl, cancelUrl } = await req.json();

    if ((!bookingIds || bookingIds.length === 0) && (!items || items.length === 0)) {
      return new Response(
        JSON.stringify({ error: 'bookingIds ou items requis' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let line_items: any[];
    let ids: string[] = bookingIds || [];

    if (items && items.length > 0) {
      ids = items.map((i: any) => i.bookingId);
      line_items = items.map((item: any) => ({
        price_data: {
          currency: 'eur',
          unit_amount: Math.round((item.price || 0) * 100),
          product_data: {
            name: item.guideName || 'Guide',
            description: [item.date, item.slot].filter(Boolean).join(' — '),
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
      success_url: successUrl || 'https://www.laplateforme-omra.com/paiement/confirmation/?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: cancelUrl || 'https://www.laplateforme-omra.com/guides/',
      metadata: {
        booking_ids: JSON.stringify(ids),
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

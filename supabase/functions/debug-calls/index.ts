import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const GUARD = 'diag-7f3a9c21';

serve(async (req) => {
  const url = new URL(req.url);
  if (url.searchParams.get('key') !== GUARD) {
    return new Response('forbidden', { status: 403 });
  }
  const supabase = createClient(supabaseUrl, serviceKey);
  const { data: calls, error: e1 } = await supabase
    .from('call_bookings')
    .select('id, status, slot_date, slot_time, name, email, amount_paid, stripe_session_id, created_at')
    .order('created_at', { ascending: false })
    .limit(20);
  const { data: slots, error: e2 } = await supabase
    .from('call_slots')
    .select('date, time')
    .order('date')
    .limit(20);
  return new Response(JSON.stringify({
    serviceKeyPresent: !!serviceKey,
    callBookings: calls,
    callBookingsError: e1?.message || null,
    slots,
    slotsError: e2?.message || null,
  }, null, 2), { headers: { 'Content-Type': 'application/json' } });
});

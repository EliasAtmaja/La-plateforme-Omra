import { createClient } from '@supabase/supabase-js';

// Clé « anon public » : conçue pour être publique — la sécurité est appliquée
// par les règles RLS côté base de données, pas par le secret de cette clé.
export const SUPABASE_URL = 'https://sraygiyydntxazaaypno.supabase.co';
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyYXlnaXl5ZG50eGF6YWF5cG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNzc3MzUsImV4cCI6MjA5OTg1MzczNX0.D3U4dtwRBv-q5AkJJ4uFarXosU36A3lfZwbdYosZgh4';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Suffixe utilisé pour transformer l'identifiant d'un guide en email Supabase Auth
export const GUIDE_EMAIL_SUFFIX = '@guides.omra.app';

// Les 4 créneaux d'une journée
export const ALL_SLOTS = ['Matin', 'Après-midi', 'Soir', 'Nuit'];

// ---- Helpers session ----

export async function getSessionUser() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}

/** L'utilisateur connecté est-il administrateur ? (table app_admins, lisible par soi-même) */
export async function isAdmin(): Promise<boolean> {
  const user = await getSessionUser();
  if (!user) return false;
  const { data } = await supabase
    .from('app_admins')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();
  return !!data;
}

// ---- Mapping DB (snake_case) → app (camelCase) ----

export function mapGuide(row: any) {
  return {
    id: row.id,
    authUserId: row.auth_user_id,
    firstName: row.first_name,
    lastName: row.last_name,
    city: row.city,
    photo: row.photo || '',
    diploma: row.diploma || '',
    description: row.description || '',
    languages: row.languages || [],
    pricePerDay: row.price_per_day || 0,
    login: row.login || '',
  };
}

export function mapBooking(row: any) {
  return {
    id: row.id,
    guideId: row.guide_id,
    date: row.date,
    slot: row.slot || '',
    activitySlug: row.activity_slug || '',
    activityName: row.activity_name || '',
    clientName: row.client_name || '',
    clientEmail: row.client_email || '',
    clientPhone: row.client_phone || '',
    status: row.status,
    refusalReason: row.refusal_reason || '',
    replacementOf: row.replacement_of || '',
    seen: !!row.seen,
    createdAt: row.created_at,
  };
}

export function mapReview(row: any) {
  return {
    id: row.id,
    guideId: row.guide_id,
    name: row.name,
    text: row.text,
    stars: row.stars,
    service: row.service || '',
    status: row.status,
    date: row.created_at,
  };
}

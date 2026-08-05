/**
 * Activités (sous-services) qu'un guide peut proposer.
 * Source unique partagée entre l'admin (assignation + prix), la page publique
 * des guides et l'espace guide (un calendrier par activité).
 */
export interface GuideActivity {
  slug: string;
  label: string;
  city: 'mecca' | 'medina';
  gender: 'all' | 'homme' | 'femme';
}

export const GUIDE_ACTIVITIES: GuideActivity[] = [
  { slug: 'omra-classique', label: 'Omra Privé Premium', city: 'mecca', gender: 'all' },
  { slug: 'guide-pmr-omra', label: 'Omra Privé Premium PMR', city: 'mecca', gender: 'homme' },
  { slug: 'omra-masjid-aicha', label: 'Seconde Omra vers Masjid Aïcha', city: 'mecca', gender: 'all' },
  { slug: 'visite-historique-makkah', label: 'Visite historique de Makkah', city: 'mecca', gender: 'all' },
  { slug: 'visite-historique-medine', label: 'Visite historique de Médine', city: 'medina', gender: 'all' },
  { slug: 'visite-masjid-nabawi', label: 'Visite du Masjid An-Nabawi', city: 'medina', gender: 'all' },
  { slug: 'shopping-guide-medine', label: 'Orientation & Shopping Privilège (Femmes)', city: 'medina', gender: 'femme' },
];

export function guideActivityLabel(slug: string): string {
  return GUIDE_ACTIVITIES.find((a) => a.slug === slug)?.label || slug;
}

/** Activités assignées à un guide, dans l'ordre de la liste de référence. */
export function guideAssignedActivities(guide: any): GuideActivity[] {
  const slugs = new Set<string>([
    ...Object.keys(guide?.activityPrices || {}),
    ...((guide?.services || []) as string[]),
  ]);
  const known = GUIDE_ACTIVITIES.filter((a) => slugs.has(a.slug));
  const extra = [...slugs]
    .filter((s) => s && !GUIDE_ACTIVITIES.some((a) => a.slug === s))
    .map((s) => ({ slug: s, label: s, city: 'mecca' as const, gender: 'all' as const }));
  return [...known, ...extra];
}

/** Certaines activités n'autorisent qu'une partie des créneaux de la journée. */
export const ACTIVITY_SLOTS: Record<string, string[]> = {
  'shopping-guide-medine': ['Soir'],
  'visite-historique-makkah': ['Matin'],
  'visite-historique-medine': ['Matin', 'Soir'],
};

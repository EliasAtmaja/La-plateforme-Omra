export interface SubService {
  slug: string;
  title: string;
  desc: string;
  duration: string;
  type: string;
  typeIcon: 'private' | 'group' | 'pmr';
  image: string;
  premium?: boolean;
}

export interface ServicePage {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage: string;
  features: { icon: string; label: string }[];
  subServices: SubService[];
}

export const services: ServicePage[] = [
  {
    slug: 'planification',
    eyebrow: 'Organisation',
    title: 'Conseil & Optimisation : Votre appel privé',
    subtitle: 'Un entretien privé de 30 minutes avec un expert pour structurer l\'intégralité de votre séjour.',
    heroImage: '/assets/images/planification-bg.webp',
    features: [
      { icon: 'calendar', label: 'Planning personnalisé' },
      { icon: 'hotel', label: 'Hébergements' },
      { icon: 'transport', label: 'Transports' },
      { icon: 'support', label: 'Support 7j/7' },
    ],
    subServices: [
      {
        slug: 'formule-essentielle',
        title: 'Formule Essentielle',
        desc: 'Organisation des étapes clés de votre Omra : itinéraire, conseils pratiques et checklist complète.',
        duration: '1 à 2 semaines',
        type: 'Individuel',
        typeIcon: 'private',
        image: '/assets/images/makkah-bg.webp',
      },
      {
        slug: 'formule-confort',
        title: 'Formule Confort',
        desc: 'Planification complète incluant réservation d\'hébergements, transferts aéroport et programme jour par jour.',
        duration: '1 à 3 semaines',
        type: 'Famille',
        typeIcon: 'group',
        image: '/assets/images/planification-bg.webp',
        premium: true,
      },
      {
        slug: 'formule-sur-mesure',
        title: 'Formule Sur Mesure',
        desc: 'Un conseiller dédié organise chaque détail selon vos besoins : dates, budget, accompagnement spécifique.',
        duration: 'Flexible',
        type: 'Privé',
        typeIcon: 'private',
        image: '/assets/images/makkah-bg.webp',
        premium: true,
      },
    ],
  },
  {
    slug: 'makkah',
    eyebrow: 'Accompagnement',
    title: 'Vos accompagnements à Makkah Al Mukaramah',
    subtitle: 'Un accompagnement complet pour accomplir votre Omra en toute sérénité.',
    heroImage: '/assets/images/hero-omra-prive.webp',
    features: [
      { icon: 'guide', label: 'Encadrement personnalisé' },
      { icon: 'ritual', label: 'Rituels de l\'Omra' },
      { icon: 'support', label: 'Assistance à chaque étape' },
      { icon: 'shield', label: 'Sécurité & tranquillité' },
    ],
    subServices: [
      {
        slug: 'omra-classique',
        title: 'Omra Privé Premium',
        desc: 'La \'Omra en toute exclusivité. Sérénité absolue et accompagnement privé sur mesure, guidé par l\'accompagnant(e) local(e) de votre choix.',
        duration: '3 à 4h',
        type: 'Privé',
        typeIcon: 'private',
        image: '/assets/images/hero-omra-prive.webp',
        premium: true,
      },
      {
        slug: 'guide-pmr-omra',
        title: 'Omra Privé Premium PMR',
        desc: 'Accompagnement privilégié et mobilité adaptée. Vivez votre Omra à votre rythme, en toute quiétude et sans contrainte, guidé(e) par l\'accompagnant(e) local(e) de votre choix.',
        duration: '2 à 4h',
        type: 'PMR',
        typeIcon: 'pmr',
        image: '/assets/images/hero-omra-pmr.webp',
        premium: true,
      },
      {
        slug: 'visite-historique-makkah',
        title: 'Visite historique de Makkah',
        desc: 'Sur les traces de l\'Histoire Sacrée. Venez découvrir Jabal Al Thawr, Arafat, les lieux du Hajj et Jabal Al Nour. Une immersion historique 100 % privée, aux côtés de l\'accompagnant local de votre choix.',
        duration: 'Une demi-journée',
        type: 'Privé',
        typeIcon: 'private',
        image: '/assets/images/hero-visite-makkah.webp',
      },
      {
        slug: 'omra-masjid-aicha',
        title: 'Seconde Omra vers Masjid Aïcha',
        desc: 'Un trajet dédié vers Masjid Aïcha et un accompagnement privé pour l\'accomplissement de vos rites, à votre propre rythme, avec l\'accompagnant(e) local(e) de votre choix.',
        duration: '3 à 5h',
        type: 'Privé',
        typeIcon: 'private',
        image: '/assets/images/hero-masjid-aicha.webp',
      },
    ],
  },
  {
    slug: 'madinah',
    eyebrow: 'Découverte',
    title: 'Vos accompagnements à Al-Madinah',
    subtitle: 'Découvrez la ville du Prophète avec des guides locaux passionnés et bienveillants.',
    heroImage: '/assets/images/hero-medine.webp',
    features: [
      { icon: 'guide', label: 'Guides locaux certifiés' },
      { icon: 'history', label: 'Visites historiques' },
      { icon: 'shopping', label: 'Sorties guidées' },
      { icon: 'support', label: 'Accompagnement spirituel' },
    ],
    subServices: [
      {
        slug: 'visite-historique-medine',
        title: 'Visite historique de Médine',
        desc: 'Explorez Masjid Quba et le Mont Uhud tout en écoutant les enseignements de l\'imam : une immersion captivante pour revivre l\'histoire à votre propre rythme.',
        duration: '3 à 4h',
        type: 'Groupe',
        typeIcon: 'group',
        image: '/assets/images/hero-visite-medine.webp',
      },
      {
        slug: 'visite-masjid-nabawi',
        title: 'Visite du Masjid An-Nabawi',
        desc: 'Orientation et explications au Masjid An-Nabawi. Repères pratiques, explications historiques et spirituelles : marchez là où le Prophète ﷺ a marché lors d\'un parcours 100 % sur mesure.',
        duration: '1h',
        type: 'Privé',
        typeIcon: 'private',
        image: '/assets/images/hero-medine.webp',
      },
      {
        slug: 'shopping-guide-medine',
        title: 'Orientation & Shopping Privilège (Femmes)',
        desc: 'Orientation au Masjid Nabawi et shopping guidé avec votre guide femme dédiée.',
        duration: '3 à 4h',
        type: 'Privé',
        typeIcon: 'private',
        image: '/assets/images/shopping-medine.webp',
      },
    ],
  },
  {
    slug: 'visa',
    eyebrow: 'Administratif',
    title: 'Visas & Formalités',
    subtitle: 'Nous vous accompagnons dans toutes vos démarches administratives simplement et rapidement.',
    heroImage: '/assets/images/visa-bg.webp',
    features: [
      { icon: 'document', label: 'Dossier complet' },
      { icon: 'fast', label: 'Traitement rapide' },
      { icon: 'support', label: 'Suivi personnalisé' },
      { icon: 'shield', label: 'Garantie obtention' },
    ],
    subServices: [
      {
        slug: 'visa-omra-standard',
        title: 'Visa Omra standard',
        desc: 'Constitution et dépôt de votre dossier de visa Omra. Délai de traitement : 5 à 10 jours ouvrés.',
        duration: '5 à 10 jours',
        type: 'Individuel',
        typeIcon: 'private',
        image: '/assets/images/visa-bg.webp',
      },
      {
        slug: 'visa-omra-express',
        title: 'Visa Omra express',
        desc: 'Traitement accéléré de votre demande de visa. Idéal pour les départs urgents.',
        duration: '2 à 3 jours',
        type: 'Individuel',
        typeIcon: 'private',
        image: '/assets/images/visa-bg.webp',
        premium: true,
      },
      {
        slug: 'visa-groupe-famille',
        title: 'Visa groupe / famille',
        desc: 'Gestion complète des visas pour votre groupe ou famille. Un seul interlocuteur pour tous les dossiers.',
        duration: '7 à 14 jours',
        type: 'Groupe',
        typeIcon: 'group',
        image: '/assets/images/visa-bg.webp',
      },
    ],
  },
];

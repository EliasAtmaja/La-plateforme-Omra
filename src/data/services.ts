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
    heroImage: '/assets/images/planification-bg.png',
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
        image: '/assets/images/makkah-bg.jpg',
      },
      {
        slug: 'formule-confort',
        title: 'Formule Confort',
        desc: 'Planification complète incluant réservation d\'hébergements, transferts aéroport et programme jour par jour.',
        duration: '1 à 3 semaines',
        type: 'Famille',
        typeIcon: 'group',
        image: '/assets/images/planification-bg.png',
        premium: true,
      },
      {
        slug: 'formule-sur-mesure',
        title: 'Formule Sur Mesure',
        desc: 'Un conseiller dédié organise chaque détail selon vos besoins : dates, budget, accompagnement spécifique.',
        duration: 'Flexible',
        type: 'Privé',
        typeIcon: 'private',
        image: '/assets/images/makkah-bg.jpg',
        premium: true,
      },
    ],
  },
  {
    slug: 'makkah',
    eyebrow: 'Accompagnement',
    title: 'Vos accompagnements à Makkah Al Mukaramah',
    subtitle: 'Un accompagnement complet pour accomplir votre Omra en toute sérénité.',
    heroImage: '/assets/images/hero-omra-prive.jpg',
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
        desc: 'Accompagnement complet des rituels de l\'Omra avec un guide expérimenté.',
        duration: '3 à 5h',
        type: 'Privé',
        typeIcon: 'private',
        image: '/assets/images/hero-omra-prive.jpg',
        premium: true,
      },
      {
        slug: 'guide-pmr-omra',
        title: 'Omra Privé Premium PMR',
        desc: 'Un service dédié aux personnes à mobilité réduite. Guide privé et assistance complète de A à Z.',
        duration: '5 à 6h',
        type: 'PMR',
        typeIcon: 'pmr',
        image: '/assets/images/hero-omra-prive.jpg',
        premium: true,
      },
      {
        slug: 'visite-historique-makkah',
        title: 'Visite historique de Makkah',
        desc: 'Sur les traces de l\'histoire sacrée : Jabal al-Nour, Jabal Thawr, Mina, Arafat et Muzdalifah avec un guide passionné.',
        duration: 'Journée complète',
        type: 'Groupe',
        typeIcon: 'group',
        image: '/assets/images/hero-visite-makkah.jpg',
      },
      {
        slug: 'omra-masjid-aicha',
        title: 'Omra au départ du Masjid Aïcha (Taneem)',
        desc: 'Accomplissez votre Omra depuis le Masjid Aïcha (Taneem) avec notre accompagnement.',
        duration: '4 à 5h',
        type: 'Privé',
        typeIcon: 'private',
        image: '/assets/images/hero-masjid-aicha.jpg',
      },
    ],
  },
  {
    slug: 'madinah',
    eyebrow: 'Découverte',
    title: 'Vos accompagnements à Al-Madinah',
    subtitle: 'Découvrez la ville du Prophète avec des guides locaux passionnés et bienveillants.',
    heroImage: '/assets/images/hero-medine.jpg',
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
        desc: 'Découvrez les lieux historiques de Médine : Masjid Quba, Mont Uhud, Masjid Qiblatain et plus encore.',
        duration: '4 à 6h',
        type: 'Groupe',
        typeIcon: 'group',
        image: '/assets/images/hero-visite-medine.jpg',
      },
      {
        slug: 'visite-masjid-nabawi',
        title: 'Visite du Masjid An-Nabawi',
        desc: 'Visite guidée complète du Masjid An-Nabawi, Rawdah et cimetière Al-Baqi.',
        duration: '2 à 3h',
        type: 'Privé',
        typeIcon: 'private',
        image: '/assets/images/hero-medine.jpg',
      },
      {
        slug: 'shopping-guide-medine',
        title: 'Orientation & Shopping Privilège (Femmes)',
        desc: 'Orientation au Masjid Nabawi et shopping guidé avec votre guide femme dédiée.',
        duration: '3 à 4h',
        type: 'Privé',
        typeIcon: 'private',
        image: '/assets/images/shopping-medine.jpg',
      },
    ],
  },
  {
    slug: 'visa',
    eyebrow: 'Administratif',
    title: 'Visas & Formalités',
    subtitle: 'Nous vous accompagnons dans toutes vos démarches administratives simplement et rapidement.',
    heroImage: '/assets/images/visa-bg.png',
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
        image: '/assets/images/visa-bg.png',
      },
      {
        slug: 'visa-omra-express',
        title: 'Visa Omra express',
        desc: 'Traitement accéléré de votre demande de visa. Idéal pour les départs urgents.',
        duration: '2 à 3 jours',
        type: 'Individuel',
        typeIcon: 'private',
        image: '/assets/images/visa-bg.png',
        premium: true,
      },
      {
        slug: 'visa-groupe-famille',
        title: 'Visa groupe / famille',
        desc: 'Gestion complète des visas pour votre groupe ou famille. Un seul interlocuteur pour tous les dossiers.',
        duration: '7 à 14 jours',
        type: 'Groupe',
        typeIcon: 'group',
        image: '/assets/images/visa-bg.png',
      },
    ],
  },
];

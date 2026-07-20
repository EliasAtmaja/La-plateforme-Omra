export interface TimelineStep {
  title: string;
  description: string;
}

export interface ActivityDetail {
  slug: string;
  parentSlug: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  heroImage: string;
  city: 'medina' | 'mecca' | 'general';
  longDescription: string;
  timeline: TimelineStep[];
  duration: string;
  tags: string[];
  type: string;
  premium?: boolean;
  extraInfo?: { title: string; items: { label: string; value: string }[] };
}

export const activities: ActivityDetail[] = [
  // --- Planification ---
  {
    slug: 'formule-essentielle',
    parentSlug: 'planification',
    title: 'Formule Essentielle',
    eyebrow: 'Planification',
    subtitle: 'Organisez les étapes clés de votre Omra avec un itinéraire clair et des conseils pratiques.',
    heroImage: '/assets/images/makkah-bg.jpg',
    city: 'general',
    longDescription: 'La Formule Essentielle vous accompagne dans la préparation de votre Omra. Vous recevez un itinéraire personnalisé, une checklist complète et des conseils pratiques pour chaque étape de votre voyage sacré.',
    timeline: [
      { title: 'Prise de contact', description: 'Échange initial pour comprendre vos besoins, vos dates et votre budget.' },
      { title: 'Itinéraire personnalisé', description: 'Création d\'un programme jour par jour adapté à votre situation.' },
      { title: 'Checklist complète', description: 'Liste détaillée de tout ce qu\'il faut préparer avant le départ : documents, vêtements, invocations.' },
      { title: 'Conseils pratiques', description: 'Guide des bonnes pratiques sur place : transports, restaurants, lieux à visiter.' },
      { title: 'Support avant départ', description: 'Disponibilité pour répondre à toutes vos questions avant votre voyage.' },
    ],
    duration: '1 à 2 semaines',
    tags: ['Organisation', 'Itinéraire', 'Conseils'],
    type: 'Individuel',
  },
  {
    slug: 'formule-confort',
    parentSlug: 'planification',
    title: 'Formule Confort',
    eyebrow: 'Planification',
    subtitle: 'Planification complète incluant hébergements, transferts et programme détaillé.',
    heroImage: '/assets/images/planification-bg.png',
    city: 'general',
    longDescription: 'La Formule Confort prend en charge l\'intégralité de votre planification. De la réservation des hébergements aux transferts aéroport, en passant par un programme jour par jour, tout est organisé pour vous.',
    timeline: [
      { title: 'Consultation initiale', description: 'Analyse approfondie de vos attentes, du nombre de voyageurs et de vos préférences.' },
      { title: 'Réservation hébergements', description: 'Sélection et réservation d\'hôtels de qualité à proximité des lieux saints.' },
      { title: 'Organisation des transferts', description: 'Transferts aéroport, inter-villes et navettes vers les lieux de culte.' },
      { title: 'Programme jour par jour', description: 'Planning détaillé de chaque journée avec horaires, lieux et recommandations.' },
      { title: 'Documents de voyage', description: 'Remise de votre dossier complet avec toutes les confirmations et informations utiles.' },
      { title: 'Suivi pendant le séjour', description: 'Un interlocuteur reste disponible tout au long de votre voyage.' },
    ],
    duration: '1 à 3 semaines',
    tags: ['Hébergement', 'Transferts', 'Programme complet'],
    type: 'Famille',
    premium: true,
  },
  {
    slug: 'formule-sur-mesure',
    parentSlug: 'planification',
    title: 'Formule Sur Mesure',
    eyebrow: 'Planification',
    subtitle: 'Un conseiller dédié organise chaque détail selon vos besoins spécifiques.',
    heroImage: '/assets/images/makkah-bg.jpg',
    city: 'general',
    longDescription: 'La Formule Sur Mesure est notre offre la plus complète. Un conseiller personnel vous est attribué pour concevoir un voyage entièrement adapté à vos besoins : dates flexibles, budget maîtrisé, accompagnement spécifique pour les personnes à mobilité réduite ou les familles nombreuses.',
    timeline: [
      { title: 'Rendez-vous personnalisé', description: 'Entretien approfondi avec votre conseiller dédié pour définir chaque aspect du voyage.' },
      { title: 'Conception sur mesure', description: 'Élaboration d\'un programme unique adapté à vos contraintes et envies.' },
      { title: 'Validation & ajustements', description: 'Présentation du programme, ajustements selon vos retours jusqu\'à satisfaction complète.' },
      { title: 'Réservations complètes', description: 'Prise en charge de toutes les réservations : vols, hôtels, guides, transports.' },
      { title: 'Briefing pré-départ', description: 'Session de préparation complète avec votre conseiller avant le grand jour.' },
      { title: 'Accompagnement continu', description: 'Votre conseiller reste joignable 24h/24 pendant tout votre séjour.' },
    ],
    duration: 'Flexible',
    tags: ['Sur mesure', 'Conseiller dédié', 'Flexibilité'],
    type: 'Privé',
    premium: true,
  },

  // --- Makkah ---
  {
    slug: 'omra-classique',
    parentSlug: 'makkah',
    title: 'Omra Privé Premium',
    eyebrow: 'Accompagnement à Makkah',
    subtitle: 'Accomplissez votre Omra avec un guide expérimenté qui vous accompagne à chaque rituel.',
    heroImage: '/assets/images/hero-omra-prive.jpg',
    city: 'mecca',
    longDescription: 'L\'Omra Privé Premium est un accompagnement complet pour accomplir les rituels sacrés en toute sérénité. Votre guide francophone vous explique chaque étape, vous aide avec les invocations et veille à ce que votre expérience spirituelle soit la plus enrichissante possible.',
    timeline: [
      { title: 'Prise en charge & Introduction', description: 'Accueil exclusif à votre point de rendez-vous par votre guide privé dédié, suivi d\'un rappel personnalisé sur les mérites et l\'importance de la Omra pour vous préparer à vivre pleinement ce moment unique.' },
      { title: 'Le Tawaf', description: 'Circumambulation autour de la Ka\'ba. Votre guide vous récite les invocations et vous guide à chaque tour.' },
      { title: 'Prière au Maqam Ibrahim', description: 'Deux unités de prière derrière le Maqam Ibrahim après le Tawaf.' },
      { title: 'S\'abreuver de Zamzam', description: 'Moment pour boire l\'eau bénie de Zamzam et faire vos invocations personnelles.' },
      { title: 'Le Sa\'i entre Safa et Marwa', description: 'Parcours entre les monts Safa et Marwa (7 allers-retours). Votre guide vous accompagne et vous encourage.' },
      { title: 'Clôture & Enseignements', description: 'Synthèse des rites accomplis et partage d\'enseignements spirituels pour ancrer cette expérience.' },
      { title: 'Orientation Logistique & Autonomie', description: 'Explication des repères clés sur l\'esplanade du Haram pour vous permettre de vous orienter facilement et d\'être totalement autonome durant le reste de votre séjour à Makkah.' },
      { title: 'Finalisation des Rites (Désacralisation)', description: 'Clôture de la Omra avec une orientation personnalisée vers les salons de coiffure pour les hommes ou un accompagnement vers l\'hôtel pour les femmes.' },
    ],
    duration: '3 à 5h',
    tags: ['Spiritualité', 'Rituels', 'Accompagnement'],
    type: 'Privé',
  },
  {
    slug: 'guide-pmr-omra',
    parentSlug: 'makkah',
    title: 'Omra Privé Premium PMR',
    eyebrow: 'Accompagnement à Makkah',
    subtitle: 'Un service dédié aux personnes à mobilité réduite, avec assistance complète de A à Z.',
    heroImage: '/assets/images/hero-omra-prive.jpg',
    city: 'mecca',
    longDescription: 'Ce service spécialisé garantit aux personnes à mobilité réduite un accomplissement serein de leur Omra. Un guide formé et attentionné vous accompagne à chaque instant, avec un fauteuil roulant mis à disposition et une assistance permanente.',
    timeline: [
      { title: 'À votre hôtel : Prise en charge & Introduction', description: 'Accueil exclusif par votre guide privé dédié, suivi d\'un rappel personnalisé sur les mérites et l\'importance de la Omra pour vous préparer à vivre pleinement ce moment unique.' },
      { title: 'Le Tawaf', description: 'Circumambulation autour de la Ka\'ba avec assistance complète. Votre guide pousse le fauteuil et récite les invocations.' },
      { title: 'Prière au Maqam Ibrahim', description: 'Installation confortable pour la prière avec l\'aide de votre guide.' },
      { title: 'S\'abreuver de Zamzam', description: 'Moment pour boire l\'eau bénie de Zamzam et faire vos invocations personnelles.' },
      { title: 'Le Sa\'i entre Safa et Marwa', description: 'Parcours entre les monts Safa et Marwa avec assistance permanente et pauses selon vos besoins.' },
      { title: 'Clôture & Enseignements', description: 'Synthèse des rites accomplis et partage d\'enseignements spirituels pour ancrer cette expérience.' },
      { title: 'Orientation Logistique & Autonomie', description: 'Explication des repères clés sur l\'esplanade du Haram pour vous permettre de vous orienter facilement et d\'être totalement autonome durant le reste de votre séjour à Makkah.' },
      { title: 'Finalisation des Rites (Désacralisation)', description: 'Clôture de la Omra avec une orientation personnalisée vers les salons de coiffure pour les hommes ou un accompagnement vers l\'hôtel pour les femmes.' },
    ],
    duration: '5 à 6h',
    tags: ['Accessibilité', 'Assistance', 'Bienveillance'],
    type: 'PMR',
    premium: true,
  },
  {
    slug: 'omra-masjid-aicha',
    parentSlug: 'makkah',
    title: 'Omra au départ du Masjid Aïcha',
    eyebrow: 'Accompagnement à Makkah',
    subtitle: 'Accomplissez votre Omra depuis le Miqat du Masjid Aïcha (Taneem).',
    heroImage: '/assets/images/hero-masjid-aicha.jpg',
    city: 'mecca',
    longDescription: 'Pour ceux qui sont déjà à Makkah et souhaitent accomplir une Omra supplémentaire, le départ se fait depuis le Masjid Aïcha (Taneem), le Miqat le plus proche. Votre guide vous accompagne depuis ce lieu sacré jusqu\'à l\'accomplissement complet des rituels.',
    timeline: [
      { title: 'Prise en charge à votre hôtel & direction Masjid Aïcha', description: 'Sortie de la zone sacrée à bord de notre transport VIP et explications sur l\'histoire de Al Tan\'im (Masjid Aïcha) رضي الله عنها' },
      { title: 'Le Tawaf', description: 'Circumambulation autour de la Ka\'ba. Votre guide vous récite les invocations et vous guide à chaque tour.' },
      { title: 'Prière au Maqam Ibrahim', description: 'Deux unités de prière derrière le Maqam Ibrahim après le Tawaf.' },
      { title: 'S\'abreuver de Zamzam', description: 'Moment pour boire l\'eau bénie de Zamzam et faire vos invocations personnelles.' },
      { title: 'Le Sa\'i entre Safa et Marwa', description: 'Parcours entre les monts Safa et Marwa (7 allers-retours). Votre guide vous accompagne et vous encourage.' },
      { title: 'Clôture & Enseignements', description: 'Synthèse des rites accomplis et partage d\'enseignements spirituels pour ancrer cette expérience.' },
      { title: 'Finalisation des Rites (Désacralisation)', description: 'Clôture de la Omra avec une orientation personnalisée vers les salons de coiffure pour les hommes ou un accompagnement vers l\'hôtel pour les femmes.' },
    ],
    duration: '4 à 5h',
    tags: ['Omra', 'Taneem', 'Miqat'],
    type: 'Privé',
  },

  {
    slug: 'visite-historique-makkah',
    parentSlug: 'makkah',
    title: 'Visite historique de Makkah',
    eyebrow: 'Accompagnement à Makkah',
    subtitle: 'Sur les traces de l\'histoire sacrée de La Mecque, du Mont de la Lumière à la plaine d\'Arafat.',
    heroImage: '/assets/images/hero-visite-makkah.jpg',
    city: 'mecca',
    longDescription: 'Explorez les sites historiques et spirituels de La Mecque avec un guide spécialisé. Du Jabal al-Nour, où le Prophète ﷺ reçut la première révélation, au Jabal Thawr, refuge de l\'Hégire, en passant par les lieux emblématiques du Hajj — Mina, Arafat et Muzdalifah — chaque étape vous plonge dans l\'histoire de l\'Islam. Votre guide francophone vous transmet les récits et les enseignements liés à chaque lieu.',
    timeline: [
      { title: 'Prise en charge à votre hôtel en véhicule privé VIP', description: 'Début de la visite avec des explications sur les vertus exceptionnelles de Makkah, l\'histoire de cette ville sacrée et les immenses récompenses qu\'elle renferme.' },
      { title: 'Jabel Al-Thawr', description: 'Halte historique devant le mont où s\'est réfugié le Prophète (que la paix et le salut soient sur lui) avec Abou Bakr (qu\'Allah l\'agrée) lors de leur émigration (l\'Hégire) vers Médine.' },
      { title: 'Arrêt au Mont Arafat', description: 'Présentation sur place avec des explications détaillées sur le déroulement du Hajj et les mérites de ce grand jour d\'Arafat.' },
      { title: 'Parcours commenté & Rites du Hajj', description: 'Visite en van VIP avec des explications complètes sur les stations clés du pèlerinage : Muzdalifah, Mina et les Jamarates.' },
      { title: 'Jabel An-Nour', description: 'Découverte du Mont de la Lumière et explications historiques sur le lieu unique où le Prophète (que la paix et le salut soient sur lui) a reçu les tout premiers versets de la Révélation.' },
      { title: 'Retour à votre hôtel', description: 'Fin de la visite et retour confortable à votre hébergement.' },
    ],
    duration: 'Journée complète',
    tags: ['Histoire', 'Spiritualité', 'Découverte'],
    type: 'Groupe',
    extraInfo: {
      title: 'Bon à savoir',
      items: [
        { label: 'Transport', value: 'Véhicule climatisé inclus, prise en charge et retour à votre hôtel.' },
        { label: 'Guide', value: 'Guide francophone dédié tout au long de la visite.' },
        { label: 'Tenue', value: 'Prévoyez des chaussures confortables et une protection contre le soleil.' },
        { label: 'Hydratation', value: 'Pensez à emporter de l\'eau, surtout pendant les mois chauds.' },
        { label: 'Familles', value: 'Activité adaptée aux familles et aux enfants.' },
      ],
    },
  },

  // --- Madinah ---
  {
    slug: 'visite-historique-medine',
    parentSlug: 'madinah',
    title: 'Visite historique de Médine',
    eyebrow: 'Découverte de Médine',
    subtitle: 'Explorez les lieux historiques de Médine avec un guide passionné.',
    heroImage: '/assets/images/hero-visite-medine.jpg',
    city: 'medina',
    longDescription: 'Plongez dans l\'histoire de la ville du Prophète ﷺ en visitant ses sites les plus emblématiques. De la première mosquée de l\'Islam au mont Uhud, chaque lieu raconte une page de l\'histoire islamique. Votre guide francophone vous transmet les récits et les enseignements liés à chaque endroit.',
    timeline: [
      { title: 'Prise en charge à votre hôtel en véhicule privé VIP', description: 'Début de la visite avec des explications captivantes sur les mérites et les vertus exceptionnelles de la ville de Médine.' },
      { title: 'Masjid Quba', description: 'Prière et explications historiques au sein de la toute première mosquée construite en Islam.' },
      { title: 'Uhud', description: 'Halte historique devant le mont Uhud et récit détaillé des événements marquants liés à cette célèbre bataille.' },
      { title: 'Cours préparatoire à la Omra', description: 'Profitez d\'un excellent moment de partage et de détente au cœur d\'une magnifique palmeraie pour aborder sereinement quelques points importants de votre religion et un cours sur la Omra.' },
      { title: 'Retour à l\'hôtel', description: 'Fin de la visite et dépose à votre hôtel en véhicule privé VIP.' },
    ],
    duration: '4 à 6h',
    tags: ['Histoire', 'Spiritualité', 'Découverte'],
    type: 'Groupe',
  },
  {
    slug: 'visite-masjid-nabawi',
    parentSlug: 'madinah',
    title: 'Visite du Masjid An-Nabawi',
    eyebrow: 'Découverte de Médine',
    subtitle: 'Session d\'orientation exclusive pour maîtriser le Masjid Nabawi et ses abords.',
    heroImage: '/assets/images/hero-medine.jpg',
    city: 'medina',
    longDescription: 'Cette session d\'orientation exclusive est conçue pour permettre aux pèlerins de prendre immédiatement leurs marques à Médine et d\'optimiser chaque instant de leur séjour. Le guide local que vous aurez choisi vous accompagnera pour vous transmettre une parfaite maîtrise géographique du Masjid Nabawi et de ses abords. Grâce à ses conseils pratiques et ses astuces de terrain, vous saurez exactement comment vous repérer, où prier selon les moments de la journée, et comment circuler avec fluidité. Il vous guidera précisément pour situer les lieux fondamentaux : l\'accès à la Rawda Sharifa, l\'emplacement où repose le Prophète ﷺ, la porte dédiée aux salutations, ainsi que le cimetière du Baqî\'. Pour un séjour sans imprévu, votre guide vous montrera également les infrastructures essentielles comme le dispensaire, tout en vous orientant vers les différents musées culturels à proximité. Une fois ces repères solidement établis, vous disposerez d\'une autonomie totale pour vivre vos adorations en toute sérénité.',
    timeline: [],
    duration: '2 à 3h',
    tags: ['Mosquée', 'Rawdah', 'Spiritualité'],
    type: 'Privé',
  },
  {
    slug: 'shopping-guide-medine',
    parentSlug: 'madinah',
    title: 'Orientation & Shopping Privilège (Femmes)',
    eyebrow: 'Découverte de Médine',
    subtitle: 'Orientation au Masjid Nabawi et shopping guidé avec votre guide femme dédiée.',
    heroImage: '/assets/images/shopping-medine.jpg',
    city: 'medina',
    longDescription: 'Une expérience exclusive réservée aux femmes : votre guide femme vous accompagne pour découvrir le Masjid Nabawi en toute autonomie, puis vous emmène dans les meilleures boutiques à proximité de la mosquée.',
    timeline: [
      { title: 'Prise en charge à votre hôtel', description: 'Accueil et prise en charge directement à votre hôtel par votre guide femme choisie.' },
      { title: 'Esplanade du Masjid Nabawi', description: 'Visite guidée pour apprendre à s\'orienter facilement dans la mosquée. La guide vous expliquera comment et où prier, ainsi que les portes clés pour vous repérer en toute autonomie.' },
      { title: 'Shopping guidé à pied', description: 'Découverte et achats dans les boutiques d\'une artère commerçante à proximité immédiate du Masjid Nabawi.' },
      { title: 'Accompagnement à votre hôtel', description: 'Fin de l\'activité et retour vers votre hôtel, accompagnée en toute sérénité par votre guide.' },
    ],
    duration: '3 à 4h',
    tags: ['Shopping', 'Souks', 'Découverte'],
    type: 'Privé',
  },

  // --- Visa ---
  {
    slug: 'visa-omra-standard',
    parentSlug: 'visa',
    title: 'Visa Omra standard',
    eyebrow: 'Assistance administrative',
    subtitle: 'Constitution et dépôt de votre dossier de visa Omra en toute simplicité.',
    heroImage: '/assets/images/visa-bg.png',
    city: 'general',
    longDescription: 'Nous prenons en charge l\'intégralité de votre demande de visa Omra. De la constitution du dossier au suivi du traitement, vous n\'avez qu\'à nous fournir vos documents et nous nous occupons du reste.',
    timeline: [
      { title: 'Envoi des documents', description: 'Transmettez-nous les documents requis : passeport, photos, formulaire rempli.' },
      { title: 'Vérification du dossier', description: 'Notre équipe vérifie la conformité de tous vos documents.' },
      { title: 'Dépôt de la demande', description: 'Soumission officielle de votre demande de visa auprès des autorités.' },
      { title: 'Suivi du traitement', description: 'Nous suivons l\'avancement de votre demande et vous tenons informé.' },
      { title: 'Réception & envoi', description: 'Réception de votre visa et envoi sécurisé à votre adresse.' },
    ],
    duration: '5 à 10 jours',
    tags: ['Visa', 'Administratif', 'Simple'],
    type: 'Individuel',
  },
  {
    slug: 'visa-omra-express',
    parentSlug: 'visa',
    title: 'Visa Omra express',
    eyebrow: 'Assistance administrative',
    subtitle: 'Traitement accéléré de votre visa pour les départs urgents.',
    heroImage: '/assets/images/visa-bg.png',
    city: 'general',
    longDescription: 'Le service express est conçu pour les départs imminents. Grâce à notre réseau et notre expertise, nous accélérons le traitement de votre demande de visa pour que vous puissiez partir l\'esprit tranquille.',
    timeline: [
      { title: 'Envoi des documents', description: 'Transmettez vos documents immédiatement par voie numérique.' },
      { title: 'Vérification express', description: 'Vérification prioritaire de votre dossier dans les heures qui suivent.' },
      { title: 'Dépôt prioritaire', description: 'Soumission en procédure accélérée auprès des autorités.' },
      { title: 'Réception rapide', description: 'Réception de votre visa et envoi express à votre adresse.' },
    ],
    duration: '2 à 3 jours',
    tags: ['Express', 'Urgence', 'Prioritaire'],
    type: 'Individuel',
    premium: true,
  },
  {
    slug: 'visa-groupe-famille',
    parentSlug: 'visa',
    title: 'Visa groupe / famille',
    eyebrow: 'Assistance administrative',
    subtitle: 'Gestion complète des visas pour votre groupe ou famille.',
    heroImage: '/assets/images/visa-bg.png',
    city: 'general',
    longDescription: 'Un seul interlocuteur pour tous les dossiers de votre groupe ou famille. Nous coordonnons l\'ensemble des demandes pour que tout le monde parte ensemble, sans stress administratif.',
    timeline: [
      { title: 'Collecte des dossiers', description: 'Rassemblement des documents de chaque membre du groupe.' },
      { title: 'Vérification groupée', description: 'Vérification de la conformité de l\'ensemble des dossiers.' },
      { title: 'Dépôt coordonné', description: 'Soumission simultanée de toutes les demandes pour un traitement groupé.' },
      { title: 'Suivi centralisé', description: 'Un seul point de contact pour suivre l\'avancement de tous les visas.' },
      { title: 'Réception & distribution', description: 'Réception groupée et distribution des visas à chaque membre.' },
    ],
    duration: '7 à 14 jours',
    tags: ['Groupe', 'Famille', 'Coordonné'],
    type: 'Groupe',
  },
];

export function getActivityBySlug(slug: string): ActivityDetail | undefined {
  return activities.find(a => a.slug === slug);
}

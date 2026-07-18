# CLAUDE.md — La plateforme Omra

> Fichier de configuration pour Claude Code.  
> Ce fichier guide l'assistant IA tout au long du développement de la plateforme de réservation de guides **La plateforme Omra**.

---

## 🏛️ Présentation du projet

**Nom du site :** La plateforme Omra  
**Type :** Plateforme de mise en relation (type Airbnb) entre pèlerins et guides locaux  
**Framework :** [Astro](https://astro.build/) (SSR)  
**Langues :** Français, Anglais  
**Public cible :** Pèlerins francophones et anglophones souhaitant réserver un guide pour leur Omra ou visite de Médine

### Concept

La plateforme Omra met en relation des pèlerins avec des guides locaux qualifiés. Les visiteurs parcourent la liste des guides disponibles, consultent leurs profils, vérifient leurs disponibilités, et réservent directement en ligne. Le pèlerin paie des frais de service sur le site, le reste est payé sur place au guide.

### Modèle économique

- Le pèlerin paie des **frais de service / mise en relation** directement sur le site (rémunération de la plateforme)
- Le reste de la somme est payé **sur place, en mains propres au guide**, une fois la prestation terminée

### Services proposés par ville

**À Médine :**
- Visite historique de la ville
- Visite du Masjid En-Nabawi (avec explications des différentes portes/entrées)
- Sortie shopping

**À La Mecque :**
- Visite historique de la ville
- Accompagnement pour l'accomplissement de la Omra
- Omra au départ du Masjid Aïcha (Taneem)

### Acteurs du système

| Acteur | Rôle |
|---|---|
| **Visiteur** | Consulte les guides, crée un compte pour réserver |
| **Client (pèlerin)** | Réserve un guide, effectue le paiement des frais de service, consulte ses réservations |
| **Guide** | Gère son profil, ses disponibilités, voit ses réservations |
| **Admin** | Vue globale : gestion des guides, suivi des réservations, modération |

---

## 🎨 Identité visuelle

> ⚠️ Le logo et la charte graphique sont fournis par le client.  
> Ne jamais générer, remplacer ou modifier ces éléments.

### Couleurs principales

Alliance de **Vert** et de **Blanc** — épuré, spirituel et professionnel.

### Expérience visuelle par ville

Le site s'adapte visuellement selon la ville sélectionnée :

- **Pages Médine** : En fond d'écran / filigrane, le motif du **tapis du Masjid En-Nabawi** (pattern vert/rouge caractéristique)
- **Pages La Mecque** : En fond d'écran / filigrane, le motif de la **Kiswa de la Kaaba** (tissu noir et or avec calligraphie)

Ce changement visuel est subtil (opacité faible en filigrane) pour ne pas gêner la lisibilité.

---

## 🗂️ Structure du projet

```
la-plateforme-omra/
├── public/
│   ├── logo.svg              # Fourni par le client — NE PAS MODIFIER
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       │   ├── gallery/
│       │   └── guides/
│       └── fonts/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── sections/
│   │   ├── guide/
│   │   ├── booking/
│   │   └── dashboard/
│   ├── layouts/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── guides/
│   │   ├── a-propos.astro
│   │   ├── reserver/
│   │   ├── compte/
│   │   ├── dashboard/
│   │   ├── mentions-legales.astro
│   │   └── api/
│   ├── i18n/
│   ├── lib/
│   ├── data/
│   └── styles/
│       ├── global.css
│       └── tokens.css
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

---

## ✅ Standards de code

- **Langue du code :** Anglais
- **Langue du contenu :** Français et Anglais (via i18n)
- **Indentation :** 2 espaces
- **TypeScript :** Obligatoire partout
- **Accessibilité :** WCAG AA minimum
- **Mobile-first**
- Composants Astro : PascalCase
- Pages : kebab-case
- Variables CSS : `--kebab-case`

---

## 💳 Paiement

- **Stripe** + **PayPal**
- Le paiement sur le site couvre uniquement les frais de service/mise en relation
- Le reste est payé sur place au guide

---

## 🌍 i18n

- Français (défaut, sans préfixe URL)
- Anglais (préfixe `/en/`)

---

*Ce fichier CLAUDE.md est la source de vérité pour le développement de la plateforme.*

# Mise en ligne — Configuration Supabase

Le site est maintenant branché sur Supabase (projet `sraygiyydntxazaaypno`).
Il reste **3 étapes à faire une seule fois** dans le tableau de bord Supabase,
puis le déploiement GitHub → Hostinger.

---

## Étape 1 — Créer les tables et la sécurité

1. Va sur ton projet Supabase → **SQL Editor** (icône `>_` dans le menu de gauche)
2. Ouvre le fichier [`supabase/schema.sql`](supabase/schema.sql) de ce projet
3. Copie **tout** son contenu, colle-le dans l'éditeur, clique **Run**

Tu dois voir « Success. No rows returned ». Les tables apparaissent dans
**Table Editor** : `guides`, `availability`, `reviews`, `bookings`,
`planif_requests`, `visa_requests`, `app_admins`.

---

## Étape 2 — Désactiver la confirmation d'email

Les comptes guides utilisent des emails internes (`identifiant@guides.omra.app`)
qui ne reçoivent pas de vrais emails, donc la confirmation doit être désactivée :

1. **Authentication** → **Sign In / Providers** (ou « Sign In / Up » selon la version)
2. Clique sur **Email**
3. Désactive **« Confirm email »**
4. Enregistre

---

## Étape 3 — Créer ton compte administrateur

1. **Authentication** → **Users** → **Add user** → **Create new user**
   - Email : ton adresse (ex. `elias@atmaja.be`)
   - Mot de passe : un mot de passe fort
   - Coche **« Auto Confirm User »** si proposé
2. Retourne dans **SQL Editor** et exécute (remplace l'email par le tien) :

```sql
insert into public.app_admins
select id from auth.users where email = 'elias@atmaja.be';
```

C'est ce qui donne les droits admin à ce compte. Tu peux ajouter d'autres
admins de la même façon.

**Connexion admin** : `/dashboard/admin/` avec cet email + mot de passe.

---

## Comment ça marche maintenant

| Quoi | Où |
|---|---|
| Guides, avis, réservations, dispos, demandes | Base PostgreSQL Supabase (Europe) |
| Mots de passe admin & guides | Supabase Auth — hachés, jamais visibles |
| Qui peut lire/écrire quoi | Règles RLS dans la base (voir `schema.sql`) |
| Panier du visiteur | Son navigateur (référence ses réservations + jeton d'annulation) |

- **Créer un guide** (panel admin) : crée un compte Auth (`identifiant@guides.omra.app`)
  + la fiche. Le guide se connecte sur `/dashboard/guide/` avec son identifiant + mot de passe.
- **Avis** : créés « en attente », publics seulement après ton approbation.
- **Demandes visa/planification** : lisibles uniquement par l'admin
  (les numéros de passeport ne sont jamais exposés au public).

### Limitations connues

- **Changer le mot de passe d'un guide** : pas possible depuis le panel
  (il faudrait exposer une clé privée). Passe par Supabase →
  Authentication → Users → ⋮ → « Send password recovery » ne marche pas
  (email interne) → utilise « Update user » pour saisir un nouveau mot de passe.
- **Supprimer un guide** supprime sa fiche mais pas son compte Auth
  (sans conséquence : il ne peut plus se connecter à rien). Tu peux le
  supprimer manuellement dans Authentication → Users si tu veux nettoyer.
- Les demandes planif/visa sont enregistrées mais **pas encore affichées
  dans le panel admin** (consultables dans Supabase → Table Editor).

---

## Déploiement GitHub → Hostinger

1. Crée un dépôt GitHub (privé) et donne son URL à Claude pour initialiser le git
2. Dans Hostinger hPanel → **Avancé → Git** : connecte le dépôt
3. La commande de build est `npm install && npm run build`, le dossier à servir est `dist/`
   (si ton plan Hostinger ne builde pas, une GitHub Action peut builder et pousser `dist/` en FTP — à configurer avec Claude)

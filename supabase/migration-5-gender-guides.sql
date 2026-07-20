-- Migration 5 : Ajout du champ gender sur les guides
ALTER TABLE guides ADD COLUMN IF NOT EXISTS gender text NOT NULL DEFAULT 'homme';

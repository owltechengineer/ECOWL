-- ============================================================
-- OWLTECH — Migration: Aggiunge cover_image alla tabella servizi
-- Esegui questo script nel SQL Editor di Supabase
-- ============================================================

-- 1. Aggiungi la colonna cover_image
ALTER TABLE servizi ADD COLUMN IF NOT EXISTS cover_image TEXT;

-- 2. Aggiorna i servizi esistenti con i path delle immagini
UPDATE servizi SET cover_image = '/images/servizi/post-production.jpg'
  WHERE slug = 'post-production-quality-finishing';

UPDATE servizi SET cover_image = '/images/servizi/product-development.jpg'
  WHERE slug = 'product-development-rd';

UPDATE servizi SET cover_image = '/images/servizi/prototyping-manufacturing.jpg'
  WHERE slug = 'prototyping-manufacturing-soft-automation';

UPDATE servizi SET cover_image = '/images/servizi/reverse-engineering.jpg'
  WHERE slug = 'reverse-engineering-digitalization';

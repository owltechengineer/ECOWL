-- ============================================================
-- Aggiorna site_settings con i dati di Fabiano Gaio (persona fisica)
-- Esegui nel SQL Editor di Supabase
-- ============================================================
-- NOTA: Inserisci la tua email nel campo contact_email prima di eseguire,
--       oppure aggiorna dopo da Admin → Impostazioni

UPDATE site_settings
SET
  site_name = 'Fabiano Gaio',
  contact_email = COALESCE(contact_email, 'contatti@email.it'),
  phone = '+39 339 637 2630',
  address = 'Via Don Pozzi 17, 20844 Triuggio (MB), Italia',
  updated_at = NOW()
WHERE id = (SELECT id FROM site_settings LIMIT 1);

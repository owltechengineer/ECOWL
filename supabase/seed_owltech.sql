-- ============================================================
-- OWLTECH — SEED DATA
-- Esegui DOPO rebuild_schema.sql nel SQL Editor di Supabase
-- ============================================================

-- ============================================================
-- HERO
-- ============================================================
INSERT INTO hero (headline, subtitle, cta_text, cta_link, cta_secondary_text, cta_secondary_link)
VALUES (
  'Il tuo partner tecnologico end-to-end.',
  'Trasformiamo idee, concept e componenti esistenti in prodotti reali, funzionali e pronti alla produzione. Dall''analisi iniziale alla validazione tecnica, riduciamo tempi, costi e complessità diventando un''estensione tecnica della tua azienda.',
  'Scopri i servizi',
  '/#servizi',
  'Vedi i progetti',
  '/#progetti'
);

-- ============================================================
-- SERVIZI (4 servizi principali)
-- ============================================================
INSERT INTO servizi (title, description, icon, slug, order_index, is_active) VALUES
(
  'Product Development & R&D',
  'Dall''idea al prodotto funzionante. Supportiamo aziende e professionisti nello sviluppo di prodotti meccanici, robotici, di microprecisione e di design. Seguiamo l''intero processo attraverso analisi tecnica, progettazione, simulazioni, prototipazione e validazione. Integriamo componenti software e automazioni digitali quando richiesto.',
  'Lightbulb',
  'product-development-rd',
  0,
  true
),
(
  'Prototyping, Manufacturing & Soft-Automation',
  'Dal modello digitale al pezzo reale, e oltre. Realizziamo prototipi funzionali, piccole serie e componenti finiti tramite stampa 3D, lavorazioni CNC, microproduzione e assemblaggi. Integrata a questo servizio c''è la possibilità di sviluppare software, automazioni digitali e sistemi logici per test di prodotto o automazione di processo.',
  'Cog',
  'prototyping-manufacturing-soft-automation',
  1,
  true
),
(
  'Reverse Engineering & Digitalization',
  'Dal reale al digitale, con precisione e replicabilità. Digitalizziamo e ricostruiamo componenti meccanici, microcomponenti e parti non più reperibili. Specializzati in meccanica, orologeria, robotica, automazioni e design. Ricostruzione accurata pronta per produzione o miglioramento tecnico.',
  'ScanLine',
  'reverse-engineering-digitalization',
  2,
  true
),
(
  'Post-Production & Quality Finishing',
  'Finiture, perfezionamento e validazione tecnica. Completamento del ciclo produttivo attraverso finiture estetiche, correzioni dimensionali, montaggi, controllo qualità e validazioni. Servizio pensato per prodotti tecnici ed estetici come orologi, microcomponenti e parti per automazioni.',
  'CheckCircle',
  'post-production-quality-finishing',
  3,
  true
);

-- ============================================================
-- SITE SETTINGS
-- ============================================================
INSERT INTO site_settings (site_name, contact_email, phone, address, social_links)
VALUES (
  'OWLTECH',
  'info@owltech.it',
  '',
  'Italia',
  '{}'::jsonb
);

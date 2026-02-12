-- ============================================================
-- OWLTECH — Supabase Database Schema
-- PostgreSQL (Supabase)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- HERO CONTENT
-- ============================================================
CREATE TABLE IF NOT EXISTS hero (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  headline    TEXT NOT NULL DEFAULT 'Siamo diversi, ma seri.',
  subtitle    TEXT DEFAULT 'Progettiamo soluzioni digitali su misura, con un approccio serio e un''anima creativa.',
  cta_text    TEXT DEFAULT 'Scopri i servizi',
  cta_link    TEXT DEFAULT '/#servizi',
  cta_secondary_text TEXT DEFAULT 'Vedi i progetti',
  cta_secondary_link TEXT DEFAULT '/#progetti',
  background_type TEXT DEFAULT '3d',
  background_url  TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SERVIZI (Services)
-- ============================================================
CREATE TABLE IF NOT EXISTS servizi (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT,
  icon        TEXT DEFAULT 'Globe',
  cover_image TEXT,
  slug        TEXT UNIQUE,
  order_index INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROGETTI (Projects)
-- ============================================================
CREATE TABLE IF NOT EXISTS progetti (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  content     TEXT,
  cover_image TEXT,
  images      TEXT[] DEFAULT '{}',
  tags        TEXT[] DEFAULT '{}',
  client_name TEXT,
  year        INTEGER,
  link_live   TEXT,
  link_repo   TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active   BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRODOTTI (Shop Products)
-- ============================================================
CREATE TABLE IF NOT EXISTS prodotti (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  content     TEXT,
  cover_image TEXT,
  images      TEXT[] DEFAULT '{}',
  price       NUMERIC(10,2) DEFAULT 0,
  currency    TEXT DEFAULT 'EUR',
  category    TEXT,
  tags        TEXT[] DEFAULT '{}',
  is_active   BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  progetto_id UUID REFERENCES progetti(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BLOG POSTS
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  excerpt     TEXT,
  content     TEXT,
  cover_image TEXT,
  author      TEXT DEFAULT 'Team OWLTECH',
  tags        TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  read_time   INTEGER,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PREVENTIVI (Quote Requests)
-- ============================================================
CREATE TABLE IF NOT EXISTS preventivi (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome                TEXT NOT NULL,
  email               TEXT NOT NULL,
  telefono            TEXT,
  azienda             TEXT,
  servizi_selezionati TEXT[] DEFAULT '{}',
  budget              TEXT,
  messaggio           TEXT,
  note_interne        TEXT,
  stato               TEXT DEFAULT 'nuovo' CHECK (stato IN ('nuovo', 'in_lavorazione', 'completato', 'archiviato')),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SITE SETTINGS
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name     TEXT DEFAULT 'OWLTECH',
  logo_url      TEXT,
  contact_email TEXT DEFAULT 'info@owltech.com',
  phone         TEXT,
  address       TEXT,
  social_links  JSONB DEFAULT '{}',
  seo_title     TEXT,
  seo_description TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_servizi_active ON servizi(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_progetti_active ON progetti(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_progetti_slug ON progetti(slug);
CREATE INDEX IF NOT EXISTS idx_prodotti_active ON prodotti(is_active, order_index);
CREATE INDEX IF NOT EXISTS idx_prodotti_slug ON prodotti(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_preventivi_stato ON preventivi(stato, created_at DESC);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_hero_updated_at
  BEFORE UPDATE ON hero FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_servizi_updated_at
  BEFORE UPDATE ON servizi FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_progetti_updated_at
  BEFORE UPDATE ON progetti FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_prodotti_updated_at
  BEFORE UPDATE ON prodotti FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_preventivi_updated_at
  BEFORE UPDATE ON preventivi FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE servizi ENABLE ROW LEVEL SECURITY;
ALTER TABLE progetti ENABLE ROW LEVEL SECURITY;
ALTER TABLE prodotti ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE preventivi ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (anon can read active/published items)
CREATE POLICY "Public read hero" ON hero
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read servizi" ON servizi
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read progetti" ON progetti
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read prodotti" ON prodotti
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read blog_posts" ON blog_posts
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Public read site_settings" ON site_settings
  FOR SELECT USING (TRUE);

-- Public insert for preventivi (anyone can submit a quote request)
CREATE POLICY "Public insert preventivi" ON preventivi
  FOR INSERT WITH CHECK (TRUE);

-- Service role has full access (handled by supabaseAdmin with service_role key)
-- No explicit policies needed — service_role bypasses RLS

-- ============================================================
-- SEED DATA (Optional starter content)
-- ============================================================
INSERT INTO hero (headline, subtitle, cta_text, cta_link, cta_secondary_text, cta_secondary_link)
VALUES (
  'Siamo diversi, ma seri.',
  'Progettiamo soluzioni digitali su misura, con un approccio serio e un''anima creativa.',
  'Scopri i servizi',
  '/#servizi',
  'Vedi i progetti',
  '/#progetti'
) ON CONFLICT DO NOTHING;

INSERT INTO servizi (title, description, icon, order_index) VALUES
  ('Sviluppo Web', 'Siti e applicazioni web performanti, responsive e ottimizzati SEO.', 'Globe', 0),
  ('App Mobile', 'App native e cross-platform per iOS e Android.', 'Smartphone', 1),
  ('UI/UX Design', 'Design system coerenti, interfacce intuitive e esperienze memorabili.', 'Palette', 2),
  ('Cloud & DevOps', 'Infrastruttura scalabile, CI/CD, monitoraggio e sicurezza.', 'Cloud', 3),
  ('Intelligenza Artificiale', 'Soluzioni AI/ML personalizzate per automazione e analisi dati.', 'Brain', 4),
  ('Cyber Security', 'Audit, penetration testing e protezione dei dati aziendali.', 'Shield', 5)
ON CONFLICT DO NOTHING;

INSERT INTO site_settings (site_name, contact_email, phone, address, social_links)
VALUES (
  'OWLTECH',
  'info@owltech.com',
  '+39 02 1234 5678',
  'Milano, Italia',
  '{"github":"https://github.com/owltech","linkedin":"https://linkedin.com/company/owltech"}'::jsonb
) ON CONFLICT DO NOTHING;

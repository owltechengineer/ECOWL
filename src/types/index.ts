// ============================================================
// OWLTECH — Type Definitions (aligned with Supabase schema)
// ============================================================

export interface HeroContent {
  id: string;
  headline: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  cta_secondary_text: string | null;
  cta_secondary_link: string | null;
  background_type: string;
  background_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Servizio {
  id: string;
  title: string;
  description: string | null;
  icon: string;
  cover_image: string | null;
  slug: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Progetto {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  cover_image: string | null;
  images: string[];
  tags: string[];
  client_name: string | null;
  year: number | null;
  link_live: string | null;
  link_repo: string | null;
  is_featured: boolean;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Prodotto {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  cover_image: string | null;
  images: string[];
  price: number;
  currency: string;
  category: string | null;
  tags: string[];
  is_active: boolean;
  is_featured: boolean;
  order_index: number;
  progetto_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  author: string;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  read_time: number | null;
  created_at: string;
  updated_at: string;
}

export interface Preventivo {
  id: string;
  nome: string;
  email: string;
  telefono: string | null;
  azienda: string | null;
  tipo_cliente: string | null;
  settore: string | null;
  servizi_selezionati: string[];
  messaggio: string | null;
  allegati: string[];
  provenienza: string | null;
  note_interne: string | null;
  stato: 'nuovo' | 'in_lavorazione' | 'completato' | 'archiviato';
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  site_name: string;
  logo_url: string | null;
  contact_email: string;
  phone: string | null;
  address: string | null;
  social_links: Record<string, string>;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

// Dashboard types
export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
}

export type TableName =
  | 'hero'
  | 'servizi'
  | 'progetti'
  | 'prodotti'
  | 'blog_posts'
  | 'preventivi'
  | 'site_settings';

// API response type
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

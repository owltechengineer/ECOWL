// ============================================================
// OWLTECH — Server-side Supabase Data Fetching
// ============================================================

import { supabase } from './client';
import type {
  HeroContent,
  Servizio,
  Progetto,
  Prodotto,
  BlogPost,
  SiteSettings,
} from '@/types';

// ── Hero ──────────────────────────────────────────────────────
export async function getHero(): Promise<HeroContent | null> {
  const { data, error } = await supabase
    .from('hero')
    .select('*')
    .eq('is_active', true)
    .limit(1)
    .single();

  if (error) {
    console.error('[getHero]', error.message);
    return null;
  }
  return data;
}

// ── Servizi ───────────────────────────────────────────────────
export async function getServizi(): Promise<Servizio[]> {
  const { data, error } = await supabase
    .from('servizi')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('[getServizi]', error.message);
    return [];
  }
  return data ?? [];
}

// ── Progetti ──────────────────────────────────────────────────
export async function getProgetti(limit?: number): Promise<Progetto[]> {
  let query = supabase
    .from('progetti')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error('[getProgetti]', error.message);
    return [];
  }
  return data ?? [];
}

export async function getProgettoBySlug(slug: string): Promise<Progetto | null> {
  const { data, error } = await supabase
    .from('progetti')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('[getProgettoBySlug]', error.message);
    return null;
  }
  return data;
}

// ── Prodotti (Shop) ───────────────────────────────────────────
export async function getProdotti(limit?: number): Promise<Prodotto[]> {
  let query = supabase
    .from('prodotti')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error('[getProdotti]', error.message);
    return [];
  }
  return data ?? [];
}

export async function getProdottoBySlug(slug: string): Promise<Prodotto | null> {
  const { data, error } = await supabase
    .from('prodotti')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('[getProdottoBySlug]', error.message);
    return null;
  }
  return data;
}

// ── Blog Posts ────────────────────────────────────────────────
export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error('[getBlogPosts]', error.message);
    return [];
  }
  return data ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('[getBlogPostBySlug]', error.message);
    return null;
  }
  return data;
}

// ── Site Settings ─────────────────────────────────────────────
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('[getSiteSettings]', error.message);
    return null;
  }
  return data;
}

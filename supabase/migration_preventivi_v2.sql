-- ============================================================
-- OWLTECH — Migration: Preventivi V2
-- Adds: tipo_cliente, settore, allegati, provenienza
-- Removes requirement for: budget
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Add new columns
ALTER TABLE preventivi ADD COLUMN IF NOT EXISTS tipo_cliente TEXT;
ALTER TABLE preventivi ADD COLUMN IF NOT EXISTS settore TEXT;
ALTER TABLE preventivi ADD COLUMN IF NOT EXISTS allegati TEXT[] DEFAULT '{}';
ALTER TABLE preventivi ADD COLUMN IF NOT EXISTS provenienza TEXT;

-- Create storage bucket for quote attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('preventivi-allegati', 'preventivi-allegati', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public uploads to the bucket (anyone can submit a quote)
CREATE POLICY "Public upload preventivi allegati"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'preventivi-allegati');

-- Allow public read of uploaded files
CREATE POLICY "Public read preventivi allegati"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'preventivi-allegati');

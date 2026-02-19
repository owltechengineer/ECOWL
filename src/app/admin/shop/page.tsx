'use client';

import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import SectionTitle from '@/components/ui/SectionTitle';
import DataTable from '@/components/admin/DataTable';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Save, X, Loader2, Trash2, Image as ImageIcon } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Prodotto } from '@/types';

export default function AdminShopPage() {
  const [prodotti, setProdotti] = useState<Prodotto[]>([]);
  const [editing, setEditing] = useState<Partial<Prodotto> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = () => {
    fetch('/api/admin/prodotti')
      .then((r) => r.json())
      .then((d) => setProdotti(d.data || []))
      .catch(console.error);
  };

  useEffect(() => { fetchData(); }, []);

  const handleUploadImage = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setEditing((prev) => prev ? { ...prev, cover_image: data.url } : prev);
        toast.success('Immagine caricata!');
      } else {
        toast.error(data.error || 'Errore nel caricamento');
      }
    } catch {
      toast.error('Errore di connessione');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const method = editing.id ? 'PATCH' : 'POST';
      const res = await fetch('/api/admin/prodotti', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editing.id ? 'Prodotto aggiornato!' : 'Prodotto creato!');
        setEditing(null);
        fetchData();
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('Errore di connessione');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminare questo prodotto?')) return;
    try {
      await fetch('/api/admin/prodotti', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      toast.success('Prodotto eliminato');
      fetchData();
    } catch {
      toast.error('Errore');
    }
  };

  const columns = [
    { key: 'title', label: 'Titolo' },
    { key: 'slug', label: 'Slug' },
    {
      key: 'cover_image',
      label: 'Immagine',
      render: (val: unknown) =>
        val ? (
          <img src={String(val)} alt="" className="w-10 h-10 object-cover border border-[#333]" />
        ) : (
          <span className="text-[#555]">—</span>
        ),
    },
    { key: 'price', label: 'Prezzo', render: (val: unknown) => <span className="text-[#FF6600]">{formatPrice(Number(val) || 0)}</span> },
    { key: 'is_active', label: 'Attivo', render: (val: unknown) => <span className={val ? 'text-emerald-400' : 'text-[#FF3300]'}>{val ? '● Sì' : '○ No'}</span> },
  ];

  return (
    <div>
      <SectionTitle label="Admin" title="Shop / Prodotti" description="Gestisci i prodotti digitali dello shop." />

      {editing && (
        <div className="max-w-2xl space-y-3 md:space-y-5 mb-4 md:mb-8 p-3 md:p-5 border border-[#333] bg-[#0a0a0a]">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[10px] md:text-sm uppercase tracking-wider text-[#FF6600]">{editing.id ? 'Modifica prodotto' : 'Nuovo prodotto'}</h3>
            <button onClick={() => setEditing(null)} className="text-[#999] hover:text-white cursor-pointer"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <Input label="Titolo" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            <Input label="Slug" value={editing.slug || ''} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
          </div>
          <Textarea label="Descrizione" value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          <Input label="Prezzo (€)" type="number" value={String(editing.price || 0)} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} />

          {/* Cover Image Upload */}
          <div>
            <label className="block font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-[#999] mb-2">
              Immagine di copertina
            </label>
            {editing.cover_image ? (
              <div className="relative inline-block">
                <img src={editing.cover_image} alt="Cover" className="w-full max-w-xs h-40 object-cover border border-[#333]" />
                <button
                  onClick={() => setEditing({ ...editing, cover_image: null })}
                  className="absolute top-2 right-2 p-1 bg-black/70 text-[#FF3300] hover:text-white transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-xs h-32 border border-dashed border-[#555] hover:border-[#FF6600] flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {uploading ? (
                  <Loader2 size={20} className="text-[#FF6600] animate-spin" />
                ) : (
                  <>
                    <ImageIcon size={20} className="text-[#555]" />
                    <span className="font-mono text-[10px] text-[#555]">Clicca per caricare</span>
                  </>
                )}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUploadImage(file);
                e.target.value = '';
              }}
            />
            <Input
              label="oppure inserisci URL"
              value={editing.cover_image || ''}
              onChange={(e) => setEditing({ ...editing, cover_image: e.target.value || null })}
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-2 md:gap-4">
            <Button variant="cta" onClick={handleSave} disabled={saving}>
              {saving ? <><Loader2 size={12} className="animate-spin mr-1" /> Salva...</> : <><Save size={12} className="mr-1" /> Salva</>}
            </Button>
            <Button variant="secondary" onClick={() => setEditing(null)}>Annulla</Button>
          </div>
        </div>
      )}

      <DataTable
        title="Elenco Prodotti"
        columns={columns}
        data={prodotti}
        onAdd={() => setEditing({ title: '', slug: '', description: '', price: 0, cover_image: null, is_active: true })}
        onEdit={(row) => setEditing(row as unknown as Partial<Prodotto>)}
        onDelete={handleDelete}
        onExport={() => window.open('/api/admin/export?table=prodotti')}
      />
    </div>
  );
}

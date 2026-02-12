'use client';

import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import SectionTitle from '@/components/ui/SectionTitle';
import DataTable from '@/components/admin/DataTable';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Save, X, Loader2, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import type { Servizio } from '@/types';

export default function AdminServiziPage() {
  const [servizi, setServizi] = useState<Servizio[]>([]);
  const [editing, setEditing] = useState<Partial<Servizio> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = () => {
    fetch('/api/admin/servizi')
      .then((r) => r.json())
      .then((d) => setServizi(d.data || []))
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
      const res = await fetch('/api/admin/servizi', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editing.id ? 'Servizio aggiornato!' : 'Servizio creato!');
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
    if (!confirm('Eliminare questo servizio?')) return;
    try {
      const res = await fetch('/api/admin/servizi', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Servizio eliminato');
        fetchData();
      }
    } catch {
      toast.error('Errore');
    }
  };

  const columns = [
    { key: 'title', label: 'Titolo' },
    { key: 'description', label: 'Descrizione' },
    { key: 'icon', label: 'Icona' },
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
    { key: 'order_index', label: 'Ordine' },
    {
      key: 'is_active',
      label: 'Attivo',
      render: (val: unknown) => (
        <span className={val ? 'text-emerald-400' : 'text-[#FF3300]'}>
          {val ? '● Sì' : '○ No'}
        </span>
      ),
    },
  ];

  return (
    <div>
      <SectionTitle label="Admin" title="Servizi" description="Gestisci i servizi mostrati nel sito." />

      {editing ? (
        <div className="max-w-2xl space-y-3 md:space-y-5 mb-4 md:mb-8 p-3 md:p-5 border border-[#333] bg-[#0a0a0a]">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[10px] md:text-sm uppercase tracking-wider text-[#FF6600]">
              {editing.id ? 'Modifica servizio' : 'Nuovo servizio'}
            </h3>
            <button onClick={() => setEditing(null)} className="text-[#999] hover:text-white cursor-pointer">
              <X size={16} />
            </button>
          </div>
          <Input label="Titolo" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          <Textarea label="Descrizione" value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <Input label="Icona (Lucide)" value={editing.icon || ''} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} placeholder="Globe, Shield, Brain..." />
            <Input label="Ordine" type="number" value={String(editing.order_index || 0)} onChange={(e) => setEditing({ ...editing, order_index: parseInt(e.target.value) || 0 })} />
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-[#999] mb-2">
              Immagine di copertina
            </label>
            {editing.cover_image ? (
              <div className="relative inline-block">
                <img
                  src={editing.cover_image}
                  alt="Cover"
                  className="w-full max-w-xs h-40 object-cover border border-[#333]"
                />
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
            {/* Oppure URL manuale */}
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
      ) : null}

      <DataTable
        title="Elenco Servizi"
        columns={columns}
        data={servizi}
        onAdd={() => setEditing({ title: '', description: '', icon: 'Globe', cover_image: null, order_index: servizi.length, is_active: true })}
        onEdit={(row) => setEditing(row as unknown as Partial<Servizio>)}
        onDelete={handleDelete}
        onExport={() => window.open('/api/admin/export?table=servizi')}
      />
    </div>
  );
}

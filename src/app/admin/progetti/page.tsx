'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SectionTitle from '@/components/ui/SectionTitle';
import DataTable from '@/components/admin/DataTable';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Save, X, Loader2 } from 'lucide-react';
import type { Progetto } from '@/types';

export default function AdminProgettiPage() {
  const [progetti, setProgetti] = useState<Progetto[]>([]);
  const [editing, setEditing] = useState<Partial<Progetto> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = () => {
    fetch('/api/admin/progetti')
      .then((r) => r.json())
      .then((d) => setProgetti(d.data || []))
      .catch(console.error);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const method = editing.id ? 'PATCH' : 'POST';
      const payload = {
        ...editing,
        tags: typeof editing.tags === 'string' ? (editing.tags as string).split(',').map((t: string) => t.trim()) : editing.tags,
      };
      const res = await fetch('/api/admin/progetti', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editing.id ? 'Progetto aggiornato!' : 'Progetto creato!');
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
    if (!confirm('Eliminare questo progetto?')) return;
    try {
      await fetch('/api/admin/progetti', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      toast.success('Progetto eliminato');
      fetchData();
    } catch {
      toast.error('Errore');
    }
  };

  const columns = [
    { key: 'title', label: 'Titolo' },
    { key: 'slug', label: 'Slug' },
    { key: 'tags', label: 'Tags', render: (val: unknown) => (Array.isArray(val) ? (val as string[]).join(', ') : String(val || '')) },
    { key: 'is_featured', label: 'Featured', render: (val: unknown) => (val ? '★' : '—') },
    { key: 'is_active', label: 'Attivo', render: (val: unknown) => <span className={val ? 'text-emerald-400' : 'text-[#FF3300]'}>{val ? '● Sì' : '○ No'}</span> },
  ];

  return (
    <div>
      <SectionTitle label="Admin" title="Progetti" description="Gestisci il portfolio dei progetti." />

      {editing && (
        <div className="max-w-2xl space-y-3 md:space-y-5 mb-4 md:mb-8 p-3 md:p-5 border border-[#333] bg-[#0a0a0a]">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[10px] md:text-sm uppercase tracking-wider text-[#FF6600]">{editing.id ? 'Modifica progetto' : 'Nuovo progetto'}</h3>
            <button onClick={() => setEditing(null)} className="text-[#999] hover:text-white cursor-pointer"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <Input label="Titolo" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            <Input label="Slug" value={editing.slug || ''} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
          </div>
          <Textarea label="Descrizione" value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          <Input label="Tags (separati da virgola)" value={Array.isArray(editing.tags) ? editing.tags.join(', ') : ''} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(',').map(t => t.trim()) })} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <Input label="Cliente" value={editing.client_name || ''} onChange={(e) => setEditing({ ...editing, client_name: e.target.value })} />
            <Input label="Anno" type="number" value={String(editing.year || new Date().getFullYear())} onChange={(e) => setEditing({ ...editing, year: parseInt(e.target.value) })} />
          </div>
          <Input label="Cover Image URL" value={editing.cover_image || ''} onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })} />
          <div className="flex gap-2 md:gap-4">
            <Button variant="cta" onClick={handleSave} disabled={saving}>
              {saving ? <><Loader2 size={12} className="animate-spin mr-1" /> Salva...</> : <><Save size={12} className="mr-1" /> Salva</>}
            </Button>
            <Button variant="secondary" onClick={() => setEditing(null)}>Annulla</Button>
          </div>
        </div>
      )}

      <DataTable
        title="Elenco Progetti"
        columns={columns}
        data={progetti}
        onAdd={() => setEditing({ title: '', slug: '', description: '', tags: [], is_active: true, is_featured: false })}
        onEdit={(row) => setEditing(row as unknown as Partial<Progetto>)}
        onDelete={handleDelete}
        onExport={() => window.open('/api/admin/export?table=progetti')}
      />
    </div>
  );
}

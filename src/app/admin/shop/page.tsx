'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SectionTitle from '@/components/ui/SectionTitle';
import DataTable from '@/components/admin/DataTable';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Save, X, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Prodotto } from '@/types';

export default function AdminShopPage() {
  const [prodotti, setProdotti] = useState<Prodotto[]>([]);
  const [editing, setEditing] = useState<Partial<Prodotto> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = () => {
    fetch('/api/admin/prodotti')
      .then((r) => r.json())
      .then((d) => setProdotti(d.data || []))
      .catch(console.error);
  };

  useEffect(() => { fetchData(); }, []);

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
        title="Elenco Prodotti"
        columns={columns}
        data={prodotti}
        onAdd={() => setEditing({ title: '', slug: '', description: '', price: 0, is_active: true })}
        onEdit={(row) => setEditing(row as unknown as Partial<Prodotto>)}
        onDelete={handleDelete}
        onExport={() => window.open('/api/admin/export?table=prodotti')}
      />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SectionTitle from '@/components/ui/SectionTitle';
import DataTable from '@/components/admin/DataTable';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Save, X, Loader2, Eye, EyeOff } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = () => {
    fetch('/api/admin/blog_posts')
      .then((r) => r.json())
      .then((d) => setPosts(d.data || []))
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
      const res = await fetch('/api/admin/blog_posts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editing.id ? 'Articolo aggiornato!' : 'Articolo creato!');
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
    if (!confirm('Eliminare questo articolo?')) return;
    try {
      await fetch('/api/admin/blog_posts', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
      toast.success('Articolo eliminato');
      fetchData();
    } catch {
      toast.error('Errore');
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    const newState = !post.is_published;
    try {
      const res = await fetch('/api/admin/blog_posts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: post.id,
          is_published: newState,
          published_at: newState ? new Date().toISOString() : null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(newState ? 'Articolo pubblicato!' : 'Articolo riportato in bozza');
        fetchData();
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('Errore di connessione');
    }
  };

  const columns = [
    { key: 'title', label: 'Titolo' },
    { key: 'slug', label: 'Slug' },
    { key: 'author', label: 'Autore' },
    { key: 'published_at', label: 'Pubblicato', render: (val: unknown) => formatDate(val as string) || '—' },
    {
      key: 'is_published',
      label: 'Stato',
      render: (_val: unknown, row: BlogPost) => (
        <button
          onClick={(e) => { e.stopPropagation(); handleTogglePublish(row); }}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider border transition-colors cursor-pointer ${
            row.is_published
              ? 'text-emerald-400 border-emerald-400/30 hover:bg-emerald-400/10'
              : 'text-amber-400 border-amber-400/30 hover:bg-amber-400/10'
          }`}
        >
          {row.is_published ? <><Eye size={12} /> Pubblicato</> : <><EyeOff size={12} /> Bozza</>}
        </button>
      ),
    },
  ];

  return (
    <div>
      <SectionTitle label="Admin" title="Blog" description="Gestisci gli articoli del blog." />

      {editing && (
        <div className="max-w-3xl space-y-3 md:space-y-5 mb-4 md:mb-8 p-3 md:p-5 border border-[#333] bg-[#0a0a0a]">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[10px] md:text-sm uppercase tracking-wider text-[#FF6600]">{editing.id ? 'Modifica articolo' : 'Nuovo articolo'}</h3>
            <button onClick={() => setEditing(null)} className="text-[#999] hover:text-white cursor-pointer"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <Input label="Titolo" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            <Input label="Slug" value={editing.slug || ''} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
          </div>
          <Textarea label="Excerpt" value={editing.excerpt || ''} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
          <Textarea label="Contenuto (Markdown)" value={editing.content || ''} onChange={(e) => setEditing({ ...editing, content: e.target.value })} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            <Input label="Autore" value={editing.author || 'Team OWLTECH'} onChange={(e) => setEditing({ ...editing, author: e.target.value })} />
            <Input label="Tags (separati da virgola)" value={Array.isArray(editing.tags) ? editing.tags.join(', ') : ''} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(',').map(t => t.trim()) })} />
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
        title="Elenco Articoli"
        columns={columns}
        data={posts}
        onAdd={() => setEditing({ title: '', slug: '', excerpt: '', content: '', author: 'Team OWLTECH', tags: [], is_published: false })}
        onEdit={(row) => setEditing(row as unknown as Partial<BlogPost>)}
        onDelete={handleDelete}
        onExport={() => window.open('/api/admin/export?table=blog_posts')}
      />
    </div>
  );
}

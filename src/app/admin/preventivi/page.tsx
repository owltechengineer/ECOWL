'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SectionTitle from '@/components/ui/SectionTitle';
import DataTable from '@/components/admin/DataTable';
import { formatDate } from '@/lib/utils';
import type { Preventivo } from '@/types';

export default function AdminPreventiviPage() {
  const [preventivi, setPreventivi] = useState<Preventivo[]>([]);

  const fetchData = () => {
    fetch('/api/admin/preventivi?orderBy=created_at')
      .then((r) => r.json())
      .then((d) => setPreventivi(d.data || []))
      .catch(console.error);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStato = async (id: string, stato: Preventivo['stato']) => {
    try {
      const res = await fetch('/api/admin/preventivi', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, stato }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Stato aggiornato a: ${stato}`);
        fetchData();
      }
    } catch {
      toast.error('Errore aggiornamento');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminare questo preventivo?')) return;
    try {
      await fetch('/api/admin/preventivi', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      toast.success('Preventivo eliminato');
      fetchData();
    } catch {
      toast.error('Errore');
    }
  };

  const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'tipo_cliente', label: 'Tipo', render: (val: unknown) => <span className="text-xs">{(val as string) || '—'}</span> },
    { key: 'settore', label: 'Settore', render: (val: unknown) => <span className="text-xs">{(val as string) || '—'}</span> },
    { key: 'azienda', label: 'Azienda', render: (val: unknown) => <span className="text-xs">{(val as string) || '—'}</span> },
    {
      key: 'servizi_selezionati',
      label: 'Servizi',
      render: (val: unknown) => (
        <span className="text-xs">{Array.isArray(val) ? (val as string[]).join(', ') : '—'}</span>
      ),
    },
    {
      key: 'allegati',
      label: 'Allegati',
      render: (val: unknown) => {
        const urls = Array.isArray(val) ? (val as string[]) : [];
        if (urls.length === 0) return <span className="text-xs text-[#555]">—</span>;
        return (
          <div className="flex gap-1">
            {urls.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-[#FF6600] underline"
              >
                File {i + 1}
              </a>
            ))}
          </div>
        );
      },
    },
    {
      key: 'provenienza',
      label: 'Da',
      render: (val: unknown) => <span className="text-[10px] text-[#555]">{(val as string) || '—'}</span>,
    },
    {
      key: 'stato',
      label: 'Stato',
      render: (val: unknown, row: Record<string, unknown>) => (
        <select
          value={String(val)}
          onChange={(e) => updateStato(String(row.id), e.target.value as Preventivo['stato'])}
          className="bg-transparent border border-[#333] text-[#999] font-mono text-[10px] px-2 py-1 focus:outline-none focus:border-[#FF6600] cursor-pointer"
        >
          <option value="nuovo">Nuovo</option>
          <option value="in_lavorazione">In lavorazione</option>
          <option value="completato">Completato</option>
          <option value="archiviato">Archiviato</option>
        </select>
      ),
    },
    {
      key: 'created_at',
      label: 'Data',
      render: (val: unknown) => formatDate(val as string) || '—',
    },
  ];

  return (
    <div>
      <SectionTitle
        label="Admin"
        title="Preventivi"
        description="Gestisci le richieste di preventivo. Visualizza allegati, settore e tipo cliente."
      />

      <DataTable
        title="Richieste Preventivo"
        columns={columns}
        data={preventivi}
        onDelete={handleDelete}
        onExport={() => window.open('/api/admin/export?table=preventivi')}
      />
    </div>
  );
}

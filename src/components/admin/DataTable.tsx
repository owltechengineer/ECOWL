'use client';

import { useState } from 'react';
import { Edit2, Trash2, Search, Download, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (id: string) => void;
  onAdd?: () => void;
  onExport?: () => void;
  title: string;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  onAdd,
  onExport,
  title,
}: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter((row) =>
    columns.some((col) => {
      const val = row[col.key];
      return val && String(val).toLowerCase().includes(searchQuery.toLowerCase());
    })
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3 md:mb-6">
        <h2 className="font-mono text-xs md:text-lg uppercase tracking-wider text-white whitespace-nowrap">
          {title}
          <span className="text-[#555] text-[10px] md:text-sm ml-1 md:ml-2">({filteredData.length})</span>
        </h2>

        <div className="flex items-center gap-1.5 md:gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={12} className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-[#555]" />
            <input
              type="text"
              placeholder="Cerca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#111] border border-[#333] text-white font-mono text-[10px] md:text-xs px-2 py-1.5 md:px-4 md:py-2 pl-7 md:pl-9 focus:outline-none focus:border-[#FF6600] transition-colors w-24 md:w-48"
            />
          </div>

          {onExport && (
            <button
              onClick={onExport}
              className="hidden md:flex items-center gap-2 px-3 py-2 border border-[#333] text-[#999] hover:text-[#FF6600] hover:border-[#FF6600] transition-colors font-mono text-xs cursor-pointer"
            >
              <Download size={14} /> CSV
            </button>
          )}

          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-1 px-2 py-1.5 md:px-3 md:py-2 bg-[#FF6600] text-black font-mono text-[10px] md:text-xs uppercase tracking-wider hover:bg-[#FF6600]/90 transition-colors cursor-pointer"
            >
              <Plus size={12} className="md:w-3.5 md:h-3.5" /> Nuovo
            </button>
          )}
        </div>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-2">
        {filteredData.length === 0 ? (
          <p className="text-center font-mono text-[10px] text-[#555] py-8">Nessun dato trovato</p>
        ) : (
          filteredData.map((row, i) => (
            <div
              key={String(row.id) || i}
              className="bg-[#111] border border-[#1a1a1a] p-2.5"
            >
              <div className="space-y-1">
                {columns.slice(0, 3).map((col) => (
                  <div key={col.key} className="flex items-start gap-2">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#555] w-16 shrink-0 pt-0.5">
                      {col.label}
                    </span>
                    <span className="font-mono text-[10px] text-[#ccc] truncate flex-1">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? '—')}
                    </span>
                  </div>
                ))}
              </div>
              {(onEdit || onDelete) && (
                <div className="flex items-center justify-end gap-1.5 mt-2 pt-2 border-t border-[#1a1a1a]">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="px-2 py-1 text-[#999] hover:text-[#FF6600] transition-colors cursor-pointer font-mono text-[9px] uppercase flex items-center gap-1"
                    >
                      <Edit2 size={11} /> Modifica
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(String(row.id))}
                      className="px-2 py-1 text-[#999] hover:text-[#FF3300] transition-colors cursor-pointer font-mono text-[9px] uppercase flex items-center gap-1"
                    >
                      <Trash2 size={11} /> Elimina
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block border border-[#333] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#333]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left font-mono text-[10px] uppercase tracking-wider text-[#FF6600] px-3 py-2.5 bg-[#0a0a0a]"
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="text-right font-mono text-[10px] uppercase tracking-wider text-[#FF6600] px-3 py-2.5 bg-[#0a0a0a]">
                  Azioni
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="text-center font-mono text-xs text-[#555] py-12"
                >
                  Nessun dato trovato
                </td>
              </tr>
            ) : (
              filteredData.map((row, i) => (
                <tr
                  key={String(row.id) || i}
                  className="border-b border-[#1A1A1A] hover:bg-[#111] transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="font-mono text-[11px] text-[#ccc] px-3 py-2.5 max-w-[180px] truncate">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="text-right px-3 py-2.5">
                      <div className="flex items-center justify-end gap-1.5">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="p-1 text-[#999] hover:text-[#FF6600] transition-colors cursor-pointer"
                          >
                            <Edit2 size={13} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(String(row.id))}
                            className="p-1 text-[#999] hover:text-[#FF3300] transition-colors cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

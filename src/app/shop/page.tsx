'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { formatPrice } from '@/lib/utils';
import { supabase } from '@/lib/supabase/client';
import type { Prodotto } from '@/types';

export default function ShopPage() {
  const [prodotti, setProdotti] = useState<Prodotto[]>([]);
  const [selected, setSelected] = useState<Prodotto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('prodotti')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });
      setProdotti((data as Prodotto[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-20 md:pt-32 pb-12 md:pb-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs text-[#999] hover:text-[#FF6600] transition-colors mb-4 md:mb-6"
          >
            <ArrowLeft size={12} /> Torna alla Home
          </a>

          <SectionTitle
            label="Shop"
            title="Prodotti digitali"
            description="Soluzioni professionali pronte all'uso."
          />

          {loading ? (
            <div className="text-center py-16">
              <span className="font-mono text-[10px] text-[#555] animate-pulse">Caricamento...</span>
            </div>
          ) : prodotti.length === 0 ? (
            <p className="font-mono text-[11px] text-[#999] text-center py-16">
              Nessun prodotto disponibile al momento.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
              {prodotti.map((prodotto, i) => (
                <Card key={prodotto.id} delay={i * 0.05}>
                  <div
                    className="block cursor-pointer group"
                    onClick={() => setSelected(prodotto)}
                  >
                    {/* Image */}
                    <div className="aspect-square md:aspect-[4/3] bg-[#0a0a0a]/50 mb-2 md:mb-3 border border-[#1A1A1A] flex items-center justify-center overflow-hidden">
                      {prodotto.cover_image ? (
                        <img
                          src={prodotto.cover_image}
                          alt={prodotto.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingBag className="text-[#333]" size={20} />
                      )}
                    </div>

                    <h3 className="font-mono text-[9px] md:text-xs uppercase tracking-wider text-white mb-0.5 md:mb-1.5 leading-snug group-hover:text-[#FF6600] transition-colors">
                      {prodotto.title}
                    </h3>
                    {/* Description — desktop only */}
                    <p className="font-mono text-[11px] text-[#999] leading-relaxed mb-2 hidden md:block line-clamp-2">
                      {prodotto.description}
                    </p>

                    {/* Tags — desktop only */}
                    {prodotto.tags && prodotto.tags.length > 0 && (
                      <div className="hidden md:flex gap-1.5 flex-wrap mb-2">
                        {prodotto.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="font-mono text-[8px] uppercase tracking-wider text-[#FF6600] bg-[#FF6600]/10 px-1.5 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1.5 md:pt-3 border-t border-[#1A1A1A]">
                      <span className="font-mono text-[10px] md:text-sm text-[#FF6600] font-bold">
                        {formatPrice(prodotto.price)}
                      </span>
                      <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-wider text-[#555] group-hover:text-[#FF6600] transition-colors">
                        Dettagli →
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* ── Modal dettaglio prodotto ──────────────────── */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            {/* Image */}
            <div className="aspect-[4/3] bg-[#111] flex items-center justify-center overflow-hidden">
              {selected.cover_image ? (
                <img src={selected.cover_image} alt={selected.title} className="w-full h-full object-cover" />
              ) : (
                <ShoppingBag className="text-[#333]" size={40} />
              )}
            </div>

            {/* Content */}
            <div className="p-5 md:p-6">
              <h3 className="font-mono text-xs md:text-sm uppercase tracking-wider text-white mb-2 leading-snug">
                {selected.title}
              </h3>

              <span className="font-mono text-lg md:text-xl text-[#FF6600] font-bold block mb-3">
                {formatPrice(selected.price)}
              </span>

              <p className="font-mono text-[11px] md:text-xs text-[#999] leading-relaxed mb-4">
                {selected.description}
              </p>

              {/* Tags */}
              {selected.tags && selected.tags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap mb-4">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[9px] uppercase tracking-wider text-[#FF6600] bg-[#FF6600]/10 px-1.5 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Content preview */}
              {selected.content && (
                <p className="font-mono text-[10px] text-[#777] leading-relaxed mb-5 line-clamp-4">
                  {selected.content}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="cta"
                  size="md"
                  href={`/preventivo?from=shop&prodotto=${encodeURIComponent(selected.title)}&slug=${selected.slug}`}
                >
                  Richiedi preventivo <ArrowRight size={12} className="ml-1.5" />
                </Button>
                <Button variant="secondary" size="md" href={`/shop/${selected.slug}`}>
                  Pagina completa
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

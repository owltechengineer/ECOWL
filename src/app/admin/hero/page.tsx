'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SectionTitle from '@/components/ui/SectionTitle';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Save, Loader2 } from 'lucide-react';
import type { HeroContent } from '@/types';

export default function AdminHeroPage() {
  const [hero, setHero] = useState<Partial<HeroContent>>({
    headline: 'Siamo diversi, ma seri.',
    subtitle: 'Progettiamo soluzioni digitali su misura.',
    cta_text: 'Scopri i servizi',
    cta_link: '/#servizi',
    cta_secondary_text: 'Vedi i progetti',
    cta_secondary_link: '/#progetti',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/hero')
      .then((r) => r.json())
      .then((d) => {
        if (d.data && d.data.length > 0) {
          setHero(d.data[0]);
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const method = hero.id ? 'PATCH' : 'POST';
      const res = await fetch('/api/admin/hero', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero),
      });
      const data = await res.json();
      if (data.success) {
        setHero(data.data);
        toast.success('Hero salvato!');
      } else {
        toast.error(data.error || 'Errore nel salvataggio');
      }
    } catch {
      toast.error('Errore di connessione');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <SectionTitle
        label="Admin"
        title="Hero Section"
        description="Gestisci il contenuto della hero section nella homepage."
      />

      <div className="max-w-2xl space-y-3 md:space-y-5">
        <Input
          label="Headline"
          value={hero.headline || ''}
          onChange={(e) => setHero({ ...hero, headline: e.target.value })}
          placeholder="Il titolo principale"
        />
        <Textarea
          label="Sottotitolo"
          value={hero.subtitle || ''}
          onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
          placeholder="Descrizione sotto il titolo"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <Input
            label="Testo CTA Primario"
            value={hero.cta_text || ''}
            onChange={(e) => setHero({ ...hero, cta_text: e.target.value })}
          />
          <Input
            label="Link CTA Primario"
            value={hero.cta_link || ''}
            onChange={(e) => setHero({ ...hero, cta_link: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <Input
            label="Testo CTA Secondario"
            value={hero.cta_secondary_text || ''}
            onChange={(e) => setHero({ ...hero, cta_secondary_text: e.target.value })}
          />
          <Input
            label="Link CTA Secondario"
            value={hero.cta_secondary_link || ''}
            onChange={(e) => setHero({ ...hero, cta_secondary_link: e.target.value })}
          />
        </div>

        <div className="pt-2 md:pt-4">
          <Button variant="cta" onClick={handleSave} disabled={saving}>
            {saving ? (
              <><Loader2 size={12} className="animate-spin mr-1" /> Salva...</>
            ) : (
              <><Save size={12} className="mr-1" /> Salva Hero</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SectionTitle from '@/components/ui/SectionTitle';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Save, Loader2 } from 'lucide-react';
import type { SiteSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({
    site_name: 'OWLTECH',
    contact_email: 'info@owltech.com',
    phone: '+39 02 1234 5678',
    address: 'Milano, Italia',
    social_links: {},
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/site_settings')
      .then((r) => r.json())
      .then((d) => {
        if (d.data && d.data.length > 0) setSettings(d.data[0]);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const method = settings.id ? 'PATCH' : 'POST';
      const res = await fetch('/api/admin/site_settings', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.data);
        toast.success('Impostazioni salvate!');
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('Errore di connessione');
    } finally {
      setSaving(false);
    }
  };

  const updateSocial = (key: string, value: string) => {
    setSettings({
      ...settings,
      social_links: { ...(settings.social_links || {}), [key]: value },
    });
  };

  return (
    <div>
      <SectionTitle label="Admin" title="Impostazioni" description="Configura le impostazioni generali del sito." />

      <div className="max-w-2xl space-y-5 md:space-y-8">
        {/* General */}
        <div className="space-y-2 md:space-y-4">
          <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#FF6600] border-b border-[#333] pb-1.5 md:pb-2">
            Generale
          </h3>
          <Input label="Nome sito" value={settings.site_name || ''} onChange={(e) => setSettings({ ...settings, site_name: e.target.value })} />
          <Input label="Logo URL" value={settings.logo_url || ''} onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })} />
        </div>

        {/* Contact */}
        <div className="space-y-2 md:space-y-4">
          <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#FF6600] border-b border-[#333] pb-1.5 md:pb-2">
            Contatti
          </h3>
          <Input label="Email" type="email" value={settings.contact_email || ''} onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })} />
          <Input label="Telefono" value={settings.phone || ''} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
          <Input label="Indirizzo" value={settings.address || ''} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
        </div>

        {/* Social */}
        <div className="space-y-2 md:space-y-4">
          <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#FF6600] border-b border-[#333] pb-1.5 md:pb-2">
            Social Links
          </h3>
          <Input label="GitHub" value={settings.social_links?.github || ''} onChange={(e) => updateSocial('github', e.target.value)} placeholder="https://github.com/owltech" />
          <Input label="LinkedIn" value={settings.social_links?.linkedin || ''} onChange={(e) => updateSocial('linkedin', e.target.value)} placeholder="https://linkedin.com/company/owltech" />
          <Input label="Twitter / X" value={settings.social_links?.twitter || ''} onChange={(e) => updateSocial('twitter', e.target.value)} placeholder="https://x.com/owltech" />
          <Input label="Instagram" value={settings.social_links?.instagram || ''} onChange={(e) => updateSocial('instagram', e.target.value)} placeholder="https://instagram.com/owltech" />
        </div>

        <div className="pt-2 md:pt-4">
          <Button variant="cta" onClick={handleSave} disabled={saving}>
            {saving ? (
              <><Loader2 size={12} className="animate-spin mr-1" /> Salva...</>
            ) : (
              <><Save size={12} className="mr-1" /> Salva impostazioni</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

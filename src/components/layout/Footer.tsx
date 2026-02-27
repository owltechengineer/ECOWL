'use client';

import { NAV_ITEMS } from '@/lib/constants';
import type { SiteSettings } from '@/types';

interface FooterProps {
  settings?: SiteSettings | null;
}

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();

  const siteName = settings?.site_name || 'OWLTECH';
  const email = settings?.contact_email || 'info@owltech.com';
  const phone = settings?.phone || '+39 02 1234 5678';
  const socialLinks = settings?.social_links || {};

  // Costruisci la lista dei social con fallback
  const socials = Object.keys(socialLinks).length > 0
    ? Object.entries(socialLinks).map(([name, url]) => ({ name, url }))
    : [
        { name: 'GitHub', url: '#' },
        { name: 'LinkedIn', url: '#' },
        { name: 'Twitter', url: '#' },
      ];

  return (
    <footer className="border-t border-[#333] bg-black/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-16">
        {/* Mobile: compact 2-col layout */}
        <div className="grid grid-cols-2 md:hidden gap-4 mb-4">
          <div>
            <a href="/">
              <img src="/logo.svg" alt={siteName} className="h-6 w-auto mb-3" />
            </a>
            <p className="font-mono text-[8px] text-[#666] leading-snug">
              Tecnologia seria, design memorabile.
            </p>
          </div>
          <div>
            <ul className="space-y-1.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="font-mono text-[9px] text-[#999] hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 md:hidden gap-4 mb-4">
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-[#FF6600] mb-2">Contatti</h4>
            <ul className="space-y-1 font-mono text-[8px] text-[#999]">
              <li><a href={`mailto:${email}`} className="hover:text-white">{email}</a></li>
              {phone && <li>{phone}</li>}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-[#FF6600] mb-2">Social</h4>
            <div className="flex flex-wrap gap-1.5">
              {socials.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[8px] uppercase text-[#555] hover:text-[#FF6600] border border-[#333] hover:border-[#FF6600] px-2 py-1 transition-colors"
                >{social.name}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: original 4-col layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="mb-6">
              <a href="/"><img src="/logo.svg" alt={siteName} className="h-8 w-auto" /></a>
            </div>
            <p className="font-mono text-xs text-[#999] leading-relaxed max-w-sm">
              Tecnologia seria, design memorabile.
              <br />
              Progettiamo esperienze digitali che fanno la differenza.
            </p>
            <div className="flex gap-4 mt-6">
              {socials.map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[10px] uppercase tracking-wider text-[#555] hover:text-[#FF6600] transition-colors border border-[#333] hover:border-[#FF6600] px-3 py-1.5"
                >{social.name}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#FF6600] mb-4">Navigazione</h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="font-mono text-xs text-[#999] hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#FF6600] mb-4">Contatti</h4>
            <ul className="space-y-3 font-mono text-xs text-[#999]">
              <li><a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a></li>
              {phone && <li>{phone}</li>}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] text-[#555]">
            © {year} {siteName}. Tutti i diritti riservati.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            <a
              href="/privacy-policy"
              className="font-mono text-[9px] md:text-[10px] text-[#555] hover:text-[#FF6600] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/cookie-policy"
              className="font-mono text-[9px] md:text-[10px] text-[#555] hover:text-[#FF6600] transition-colors"
            >
              Cookie Policy
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('openCookieBanner'))}
              className="font-mono text-[9px] md:text-[10px] text-[#555] hover:text-[#FF6600] transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              Gestisci cookie
            </button>
            <a
              href="/creative"
              className="font-mono text-[9px] md:text-[10px] text-[#555] hover:text-[#FF6600] transition-colors"
            >
              Playground 3D
            </a>
            <a
              href="/admin"
              className="font-mono text-[9px] md:text-[10px] text-[#555] hover:text-[#FF6600] transition-colors"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Piccolo ritardo per non apparire subito al caricamento
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }

    // Se ha accettato, attiva GA
    if (consent === 'accepted') {
      enableAnalytics();
    }
  }, []);

  const enableAnalytics = () => {
    // Abilita Google Analytics (gtag è già caricato, basta aggiornare il consenso)
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    enableAnalytics();
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    // GA rimane in denied
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-3 md:p-4">
      <div className="max-w-2xl mx-auto bg-[#111] border border-[#333] p-3 md:p-4 shadow-2xl">
        <div className="flex items-start gap-2.5 md:gap-3">
          <Cookie size={16} className="text-[#FF6600] shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[9px] md:text-[11px] text-[#ccc] leading-relaxed mb-2.5 md:mb-3">
              Questo sito utilizza cookie tecnici necessari e, previo consenso, cookie analitici
              (Google Analytics) per migliorare l&apos;esperienza di navigazione.
              Puoi leggere la nostra{' '}
              <a href="/cookie-policy" className="text-[#FF6600] underline hover:text-white">Cookie Policy</a>{' '}
              e{' '}
              <a href="/privacy-policy" className="text-[#FF6600] underline hover:text-white">Privacy Policy</a>.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAccept}
                className="px-3 py-1.5 bg-[#FF6600] text-black font-mono text-[9px] md:text-[10px] uppercase tracking-wider hover:bg-[#FF6600]/90 transition-colors cursor-pointer"
              >
                Accetta
              </button>
              <button
                onClick={handleReject}
                className="px-3 py-1.5 border border-[#333] text-[#999] font-mono text-[9px] md:text-[10px] uppercase tracking-wider hover:text-white hover:border-[#555] transition-colors cursor-pointer"
              >
                Rifiuta
              </button>
            </div>
          </div>
          <button
            onClick={handleReject}
            className="text-[#555] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Extend Window for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

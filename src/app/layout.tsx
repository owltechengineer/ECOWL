import type { Metadata } from 'next';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import CookieBanner from '@/components/ui/CookieBanner';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'OWLTECH — Tecnologia & Design',
    template: '%s | OWLTECH',
  },
  description:
    'Progettiamo soluzioni digitali su misura. Dalla strategia al codice, ogni dettaglio è pensato per funzionare — e per distinguersi.',
  keywords: [
    'web development',
    'design',
    'tecnologia',
    'OWLTECH',
    'agenzia digitale',
    'Next.js',
    'Three.js',
    'React',
  ],
  authors: [{ name: 'OWLTECH' }],
  openGraph: {
    title: 'OWLTECH — Tecnologia & Design',
    description: 'Progettiamo soluzioni digitali su misura.',
    type: 'website',
    locale: 'it_IT',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2LKVJMSYR9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
            });
            gtag('js', new Date());
            gtag('config', 'G-2LKVJMSYR9', { anonymize_ip: true });
          `}
        </Script>
      </head>
      <body className="font-mono antialiased bg-black text-white">
        {children}
        <CookieBanner />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111',
              color: '#fff',
              border: '1px solid #333',
              fontFamily: "Andale Mono, Courier New, monospace",
              fontSize: '12px',
            },
          }}
        />
      </body>
    </html>
  );
}

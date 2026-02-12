import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
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
      <body className="font-mono antialiased bg-black text-white">
        {children}
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

import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Progetti from '@/components/sections/Progetti';
import { getProgetti, getSiteSettings } from '@/lib/supabase/queries';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Progetti',
  description: 'Portfolio dei nostri progetti. Dalla strategia alla realizzazione, ogni progetto racconta una storia.',
};

export default async function ProgettiPage() {
  const [progetti, settings] = await Promise.all([
    getProgetti(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-20 md:pt-32 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs text-[#999] hover:text-[#FF6600] transition-colors mb-4 md:mb-6"
          >
            <ArrowLeft size={12} /> Torna alla Home
          </a>
          <Progetti progetti={progetti} />
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}

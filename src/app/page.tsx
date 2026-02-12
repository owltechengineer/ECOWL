import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Servizi from '@/components/sections/Servizi';
import Progetti from '@/components/sections/Progetti';
import ShopPreview from '@/components/sections/ShopPreview';
import PreventivoPreview from '@/components/sections/PreventivoPreview';
import BlogPreview from '@/components/sections/BlogPreview';
import BackgroundWrapper from '@/components/three/BackgroundWrapper';
import {
  getHero,
  getServizi,
  getProgetti,
  getProdotti,
  getBlogPosts,
  getSiteSettings,
} from '@/lib/supabase/queries';

export const revalidate = 60; // ISR: rigenera ogni 60 secondi

export default async function HomePage() {
  // Fetch tutto in parallelo da Supabase
  const [hero, servizi, progetti, prodotti, blogPosts, siteSettings] =
    await Promise.all([
      getHero(),
      getServizi(),
      getProgetti(4),
      getProdotti(3),
      getBlogPosts(3),
      getSiteSettings(),
    ]);

  return (
    <>
      {/* Persistent 3D background — fixed, follows scroll + mouse */}
      <BackgroundWrapper />

      {/* Page content — renders above the 3D canvas */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero data={hero} />
          <Servizi servizi={servizi} />
          <Progetti progetti={progetti} />
          <ShopPreview prodotti={prodotti} />
          <PreventivoPreview />
          <BlogPreview posts={blogPosts} />
        </main>
        <Footer settings={siteSettings} />
      </div>
    </>
  );
}

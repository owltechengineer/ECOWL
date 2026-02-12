'use client';

import { useEffect, useState } from 'react';
import {
  Wrench, FolderOpen, ShoppingBag,
  FileText, Inbox, Eye, TrendingUp,
} from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import SectionTitle from '@/components/ui/SectionTitle';

interface DashboardStats {
  servizi: number;
  progetti: number;
  prodotti: number;
  blog_posts: number;
  preventivi: number;
  preventivi_nuovi: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    servizi: 0,
    progetti: 0,
    prodotti: 0,
    blog_posts: 0,
    preventivi: 0,
    preventivi_nuovi: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const tables = ['servizi', 'progetti', 'prodotti', 'blog_posts', 'preventivi'];
        const results = await Promise.all(
          tables.map((t) =>
            fetch(`/api/admin/${t}?limit=1`)
              .then((r) => r.json())
              .then((d) => ({ table: t, total: d.total || 0 }))
              .catch(() => ({ table: t, total: 0 }))
          )
        );

        const statsMap: Record<string, number> = {};
        results.forEach((r) => {
          statsMap[r.table] = r.total;
        });

        setStats({
          servizi: statsMap.servizi || 0,
          progetti: statsMap.progetti || 0,
          prodotti: statsMap.prodotti || 0,
          blog_posts: statsMap.blog_posts || 0,
          preventivi: statsMap.preventivi || 0,
          preventivi_nuovi: 0,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div>
      <SectionTitle
        label="Dashboard"
        title="Panoramica"
        description="Gestisci tutti i contenuti del sito OWLTECH da qui."
      />

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="admin-card p-3 md:p-5 animate-pulse">
              <div className="h-4 w-4 bg-[#1A1A1A] rounded mb-2" />
              <div className="h-6 w-12 bg-[#1A1A1A] rounded mb-1" />
              <div className="h-2 w-16 bg-[#1A1A1A] rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          <StatsCard title="Servizi attivi" value={stats.servizi} icon={Wrench} delay={0} />
          <StatsCard title="Progetti" value={stats.progetti} icon={FolderOpen} delay={0.05} />
          <StatsCard title="Prodotti Shop" value={stats.prodotti} icon={ShoppingBag} delay={0.1} />
          <StatsCard title="Articoli Blog" value={stats.blog_posts} icon={FileText} delay={0.15} />
          <StatsCard
            title="Preventivi totali"
            value={stats.preventivi}
            icon={Inbox}
            delay={0.2}
          />
          <StatsCard
            title="Preventivi nuovi"
            value={stats.preventivi_nuovi}
            icon={TrendingUp}
            trend="+nuovi"
            delay={0.25}
          />
        </div>
      )}

      {/* Quick links */}
      <div className="mt-6 md:mt-12 grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-6">
        <a
          href="/admin/preventivi"
          className="admin-card p-3 md:p-6 flex items-center gap-2 md:gap-4 group cursor-pointer"
        >
          <Inbox size={16} className="text-[#FF6600] md:w-6 md:h-6" />
          <div>
            <p className="font-mono text-[10px] md:text-sm text-white group-hover:text-[#FF6600] transition-colors">
              Preventivi
            </p>
            <p className="font-mono text-[8px] md:text-[10px] text-[#555] hidden md:block">
              Visualizza e gestisci le richieste
            </p>
          </div>
        </a>
        <a
          href="/"
          target="_blank"
          className="admin-card p-3 md:p-6 flex items-center gap-2 md:gap-4 group cursor-pointer"
        >
          <Eye size={16} className="text-[#FF6600] md:w-6 md:h-6" />
          <div>
            <p className="font-mono text-[10px] md:text-sm text-white group-hover:text-[#FF6600] transition-colors">
              Vedi sito
            </p>
            <p className="font-mono text-[8px] md:text-[10px] text-[#555] hidden md:block">
              Apre in una nuova finestra
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCw } from 'lucide-react';
import Button from '@/components/ui/Button';

const CreativeScene = dynamic(() => import('@/components/three/CreativeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="w-16 h-16 border border-[#FF6600] animate-spin" />
    </div>
  ),
});

export default function CreativePage() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Canvas (full background) */}
      <Suspense fallback={null}>
        <CreativeScene />
      </Suspense>

      {/* Overlay UI */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between pointer-events-auto"
        >
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border border-[#FF6600] flex items-center justify-center group-hover:bg-[#FF6600] transition-colors duration-300">
              <span className="text-[#FF6600] font-mono text-xs font-bold group-hover:text-black transition-colors duration-300">
                OT
              </span>
            </div>
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-white">
              OWLTECH
            </span>
          </a>

          <Button variant="secondary" size="sm" href="/">
            <ArrowLeft size={14} className="mr-2" /> Home
          </Button>
        </motion.div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#FF6600] block mb-2">
                [ Playground 3D ]
              </span>
              <h1 className="font-mono text-2xl md:text-4xl font-bold text-white mb-2">
                Esperimenti creativi
              </h1>
              <p className="font-mono text-xs text-[#999] max-w-md">
                Area sperimentale con prototipi 3D interattivi. Trascina, ruota e esplora.
                Questi esperimenti sono il cuore della nostra ricerca visiva.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-[#555]">
              <RotateCw size={12} />
              <span>Usa il mouse per esplorare</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

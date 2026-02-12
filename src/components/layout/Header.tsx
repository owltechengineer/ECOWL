'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-[#333]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <img
              src="/logo.svg"
              alt="OWLTECH"
              className="h-10 md:h-14 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) =>
              'isCta' in item && item.isCta ? (
                <Button key={item.label} variant="cta" size="sm" href={item.href}>
                  {item.label}
                </Button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-mono text-xs uppercase tracking-wider text-[#999] hover:text-[#FF6600] transition-colors duration-300"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-white hover:text-[#FF6600] transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsMobileOpen(false)}
                className={`font-mono text-lg uppercase tracking-wider ${
                  'isCta' in item && item.isCta ? 'text-[#FF6600]' : 'text-white'
                } hover:text-[#FF6600] transition-colors`}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

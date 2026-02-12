'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // Close on ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-3 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-[10vh] md:top-[12vh] z-[101] max-h-[80vh] overflow-y-auto md:w-full md:max-w-lg border border-[#333] bg-[#0a0a0a]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-1.5 border border-[#333] bg-black/60 hover:border-[#FF6600] transition-colors"
              aria-label="Chiudi"
            >
              <X size={14} className="text-[#999]" />
            </button>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

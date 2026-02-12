'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard, Monitor, Wrench, FolderOpen,
  ShoppingBag, FileText, Inbox, Settings, LogOut, Menu, X, Lock,
} from 'lucide-react';
import { ADMIN_NAV } from '@/lib/constants';

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard, Monitor, Wrench, FolderOpen,
  ShoppingBag, FileText, Inbox, Settings,
};

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navContent = (
    <>
      <nav className="flex-1 px-2 md:px-3">
        <ul className="space-y-0.5 md:space-y-1">
          {ADMIN_NAV.map((item) => {
            const Icon = ICON_MAP[item.icon] || LayoutDashboard;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 md:gap-3 px-2.5 py-2 md:py-2.5 font-mono text-[10px] md:text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-[#FF6600] bg-[#FF6600]/10 border-l-2 border-[#FF6600]'
                      : 'text-[#999] hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                  }`}
                >
                  <Icon size={14} className="md:w-4 md:h-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-2 md:px-3 pt-3 md:pt-6 border-t border-[#333] mx-2 md:mx-3 space-y-0.5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 md:gap-3 px-2.5 py-2 md:py-2.5 font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#555] hover:text-white transition-colors"
        >
          <LogOut size={14} />
          Torna al sito
        </Link>
        <button
          onClick={async () => {
            await fetch('/api/admin/auth', { method: 'DELETE' });
            window.location.reload();
          }}
          className="flex items-center gap-2 md:gap-3 px-2.5 py-2 md:py-2.5 font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#FF3300] hover:text-white transition-colors cursor-pointer w-full"
        >
          <Lock size={14} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-3 py-2.5 bg-[#111] border-b border-[#333] sticky top-0 z-50">
        <Link href="/admin" className="flex items-center gap-2">
          <img src="/logo.svg" alt="OWLTECH" className="h-7 w-auto" />
          <span className="font-mono text-[8px] text-[#555] border-l border-[#333] pl-2">Admin</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="p-1.5 text-[#999] hover:text-white transition-colors cursor-pointer"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden bg-[#111] border-b border-[#333] py-2 sticky top-[46px] z-50">
          {navContent}
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="admin-sidebar hidden md:flex w-56 min-h-screen flex-col py-4">
        <Link href="/admin" className="flex items-center gap-2 px-4 mb-6 group">
          <img src="/logo.svg" alt="OWLTECH" className="h-10 w-auto" />
          <span className="font-mono text-[9px] text-[#555] border-l border-[#333] pl-2">
            Admin
          </span>
        </Link>
        {navContent}
      </aside>
    </>
  );
}

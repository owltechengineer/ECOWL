'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Lock, Loader2, Eye, EyeOff } from 'lucide-react';

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    fetch('/api/admin/auth')
      .then((r) => r.json())
      .then((d) => setAuthenticated(d.authenticated))
      .catch(() => setAuthenticated(false));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        setAuthenticated(true);
      } else {
        setError(data.error || 'Password errata');
        setPassword('');
      }
    } catch {
      setError('Errore di connessione');
    } finally {
      setLoading(false);
    }
  };

  // Loading check
  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 size={20} className="text-[#FF6600] animate-spin" />
      </div>
    );
  }

  // Authenticated — show dashboard
  if (authenticated) {
    return <>{children}</>;
  }

  // Login form
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-xs">
        <div className="text-center mb-6">
          <img src="/logo.svg" alt="OWLTECH" className="h-12 mx-auto mb-4" />
          <div className="flex items-center justify-center gap-2 mb-1">
            <Lock size={14} className="text-[#FF6600]" />
            <h1 className="font-mono text-xs uppercase tracking-widest text-white">
              Admin
            </h1>
          </div>
          <p className="font-mono text-[9px] text-[#555]">
            Inserisci la password per accedere
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full bg-[#111] border border-[#333] text-white font-mono text-[11px] px-3 py-2.5 pr-10 focus:outline-none focus:border-[#FF6600] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#999] transition-colors cursor-pointer"
            >
              {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          {error && (
            <p className="font-mono text-[10px] text-[#FF3300]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full bg-[#FF6600] text-black font-mono text-[10px] uppercase tracking-wider py-2.5 hover:bg-[#FF6600]/90 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-1.5">
                <Loader2 size={12} className="animate-spin" /> Accesso...
              </span>
            ) : (
              'Accedi'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

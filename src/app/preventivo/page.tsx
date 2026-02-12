'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2, Upload, X, FileText, Image, Video, AlertTriangle, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { TIPO_CLIENTE_OPTIONS, SETTORE_OPTIONS, MAX_FILE_SIZE, MAX_TOTAL_SIZE } from '@/lib/constants';
import { supabase } from '@/lib/supabase/client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const preventivoSchema = z.object({
  nome: z.string().min(2, 'Nome richiesto (min 2 caratteri)'),
  email: z.string().email('Email non valida'),
  telefono: z.string().optional(),
  azienda: z.string().optional(),
  messaggio: z.string().optional(),
});

type PreventivoFormData = z.infer<typeof preventivoSchema>;

interface UploadedFile {
  file: File;
  preview?: string;
  uploading: boolean;
  error?: string;
  url?: string;
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) return <Image size={16} className="text-[#FF6600]" />;
  if (type.startsWith('video/')) return <Video size={16} className="text-[#FF6600]" />;
  return <FileText size={16} className="text-[#FF6600]" />;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ============================================================
   Inner form — uses useSearchParams (needs Suspense boundary)
   ============================================================ */
function PreventivoForm() {
  const searchParams = useSearchParams();
  const dropRef = useRef<HTMLDivElement>(null);

  // Context from URL params
  const fromParam = searchParams.get('from');
  const prodottoParam = searchParams.get('prodotto');
  const personalizzazione = searchParams.get('personalizzazione') === 'true';
  const provenienza = fromParam
    ? `${fromParam}${prodottoParam ? `: ${prodottoParam}` : ''}${personalizzazione ? ' (personalizzazione)' : ''}`
    : null;

  // State
  const [serviziOptions, setServiziOptions] = useState<string[]>([]);
  const [selectedServizi, setSelectedServizi] = useState<string[]>([]);
  const [tipoCliente, setTipoCliente] = useState<string>('');
  const [settore, setSettore] = useState<string>('');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Load services from Supabase
  useEffect(() => {
    async function loadServizi() {
      const { data } = await supabase
        .from('servizi')
        .select('title')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (data && data.length > 0) {
        setServiziOptions(data.map((s) => s.title));
      } else {
        setServiziOptions([
          'Post-Production & Quality Finishing',
          'Product Development & R&D',
          'Prototyping, Manufacturing & Soft-Automation',
          'Reverse Engineering & Digitalization',
        ]);
      }
    }
    loadServizi();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PreventivoFormData>({
    resolver: zodResolver(preventivoSchema),
  });

  const toggleServizio = (servizio: string) => {
    setSelectedServizi((prev) =>
      prev.includes(servizio)
        ? prev.filter((s) => s !== servizio)
        : [...prev, servizio]
    );
  };

  // ── File handling ────────────────────────────────────
  const validateFile = (file: File): string | null => {
    // Check extension-based MIME for common types that browsers may misreport
    const ext = file.name.split('.').pop()?.toLowerCase();
    const allowedExtensions = [
      'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
      'mp4', 'webm', 'mov',
      'pdf', 'doc', 'docx', 'xls', 'xlsx',
      'stl', 'step', 'stp', 'iges', 'igs', 'dwg', '3mf', 'obj',
    ];

    if (ext && !allowedExtensions.includes(ext)) {
      return `Tipo file non consentito: .${ext}`;
    }

    if (file.size > MAX_FILE_SIZE) {
      return `File troppo grande: ${formatFileSize(file.size)} (max ${formatFileSize(MAX_FILE_SIZE)})`;
    }

    const currentTotal = files.reduce((acc, f) => acc + f.file.size, 0);
    if (currentTotal + file.size > MAX_TOTAL_SIZE) {
      return `Limite totale superato (max ${formatFileSize(MAX_TOTAL_SIZE)})`;
    }

    // Check for suspicious file content in name
    if (/\.\./.test(file.name) || /[<>:"|?*]/.test(file.name)) {
      return 'Nome file non valido';
    }

    return null;
  };

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles: UploadedFile[] = [];

    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        toast.error(`${file.name}: ${error}`);
        continue;
      }

      const preview = file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : undefined;

      validFiles.push({ file, preview, uploading: false });
    }

    setFiles((prev) => [...prev, ...validFiles]);
  }, [files]);

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const removed = prev[index];
      if (removed.preview) URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Drag & Drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  }, [addFiles]);

  // ── Upload files via server API (secure) ──────────────
  const uploadFiles = async (): Promise<string[]> => {
    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f.url) {
        urls.push(f.url);
        continue;
      }

      setFiles((prev) =>
        prev.map((file, idx) => (idx === i ? { ...file, uploading: true } : file))
      );

      try {
        const formData = new FormData();
        formData.append('file', f.file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
          setFiles((prev) =>
            prev.map((file, idx) =>
              idx === i ? { ...file, uploading: false, error: result.error || 'Upload fallito' } : file
            )
          );
          toast.error(`${f.file.name}: ${result.error || 'Upload fallito'}`);
          continue;
        }

        urls.push(result.url);

        setFiles((prev) =>
          prev.map((file, idx) =>
            idx === i ? { ...file, uploading: false, url: result.url } : file
          )
        );
      } catch {
        setFiles((prev) =>
          prev.map((file, idx) =>
            idx === i ? { ...file, uploading: false, error: 'Errore di rete' } : file
          )
        );
      }
    }

    return urls;
  };

  // ── Submit ───────────────────────────────────────────
  const onSubmit = async (data: PreventivoFormData) => {
    try {
      // Upload files first
      const allegatiUrls = files.length > 0 ? await uploadFiles() : [];

      const payload = {
        ...data,
        tipo_cliente: tipoCliente || null,
        settore: settore || null,
        servizi_selezionati: selectedServizi,
        allegati: allegatiUrls,
        provenienza,
      };

      const res = await fetch('/api/preventivo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Errore nell'invio. Riprova.");
        return;
      }

      setIsSubmitted(true);
      toast.success('Richiesta inviata con successo!');
    } catch {
      toast.error("Errore nell'invio. Riprova più tardi.");
    }
  };

  // ── Success state ────────────────────────────────────
  if (isSubmitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-transparent relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md px-6"
          >
            <CheckCircle size={48} className="text-[#FF6600] mx-auto mb-6" />
            <h2 className="font-mono text-2xl uppercase tracking-wider text-white mb-4">
              Richiesta inviata
            </h2>
            <p className="font-mono text-sm text-[#999] mb-8">
              Grazie per averci contattato. Ti risponderemo entro 24 ore lavorative.
            </p>
            <Button variant="secondary" href="/">
              Torna alla Home
            </Button>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  // ── Form ─────────────────────────────────────────────
  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent pt-32 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <SectionTitle
            label="Preventivo"
            title="Richiedi un preventivo"
            description="Compilando il form ci aiuterai a capirti meglio. Nessun impegno, risposte chiare."
          />

          {/* Context banner */}
          <AnimatePresence>
            {provenienza && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 border border-[#FF6600]/30 bg-[#FF6600]/5"
              >
                <div className="flex items-center gap-3">
                  <Package size={16} className="text-[#FF6600] shrink-0" />
                  <p className="font-mono text-xs text-[#999]">
                    Richiesta per:{' '}
                    <span className="text-[#FF6600] font-bold">{prodottoParam || provenienza}</span>
                    {personalizzazione && (
                      <span className="ml-2 text-[10px] border border-[#FF6600]/30 px-2 py-0.5 text-[#FF6600]">
                        PERSONALIZZAZIONE
                      </span>
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

            {/* ── Tipo Cliente ──────────────────────────── */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#999] font-mono block mb-4">
                Tipo cliente
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {TIPO_CLIENTE_OPTIONS.map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setTipoCliente(tipo)}
                    className={`p-3 border font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      tipoCliente === tipo
                        ? 'border-[#FF6600] text-[#FF6600] bg-[#FF6600]/10'
                        : 'border-[#333] text-[#999] hover:border-[#555]'
                    }`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Settore ───────────────────────────────── */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#999] font-mono block mb-4">
                Settore di riferimento
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {SETTORE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSettore(s)}
                    className={`p-3 border font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      settore === s
                        ? 'border-[#FF6600] text-[#FF6600] bg-[#FF6600]/10'
                        : 'border-[#333] text-[#999] hover:border-[#555]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Servizi ───────────────────────────────── */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#999] font-mono block mb-4">
                Servizi di interesse
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviziOptions.map((servizio) => (
                  <button
                    key={servizio}
                    type="button"
                    onClick={() => toggleServizio(servizio)}
                    className={`p-3 border font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer text-left ${
                      selectedServizi.includes(servizio)
                        ? 'border-[#FF6600] text-[#FF6600] bg-[#FF6600]/10'
                        : 'border-[#333] text-[#999] hover:border-[#555]'
                    }`}
                  >
                    {servizio}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Contatti ──────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nome *"
                placeholder="Il tuo nome"
                {...register('nome')}
                error={errors.nome?.message}
              />
              <Input
                label="Email *"
                type="email"
                placeholder="email@azienda.com"
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                label="Telefono"
                type="tel"
                placeholder="+39 ..."
                {...register('telefono')}
              />
              <Input
                label="Azienda / Studio"
                placeholder="Nome azienda (opzionale)"
                {...register('azienda')}
              />
            </div>

            {/* ── Messaggio ─────────────────────────────── */}
            <Textarea
              label="Descrizione del progetto"
              placeholder="Raccontaci il tuo progetto, le esigenze, i tempi, i materiali, le specifiche tecniche..."
              {...register('messaggio')}
            />

            {/* ── File Upload ───────────────────────────── */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#999] font-mono block mb-4">
                Allegati (foto, video, documenti, file CAD)
              </label>

              {/* Drop zone */}
              <div
                ref={dropRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed p-8 text-center transition-all duration-300 cursor-pointer ${
                  isDragging
                    ? 'border-[#FF6600] bg-[#FF6600]/5'
                    : 'border-[#333] hover:border-[#555]'
                }`}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <Upload size={32} className="mx-auto mb-3 text-[#555]" />
                <p className="font-mono text-xs text-[#999] mb-1">
                  Trascina qui i file o <span className="text-[#FF6600] underline">sfoglia</span>
                </p>
                <p className="font-mono text-[10px] text-[#555]">
                  Immagini, video, PDF, documenti, file CAD (STL, STEP, IGES) — max 15 MB/file, 50 MB totali
                </p>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.mp4,.webm,.mov,.pdf,.doc,.docx,.xls,.xlsx,.stl,.step,.stp,.iges,.igs,.dwg,.3mf,.obj"
                  onChange={(e) => {
                    if (e.target.files) addFiles(e.target.files);
                    e.target.value = '';
                  }}
                />
              </div>

              {/* Uploaded files list */}
              <AnimatePresence>
                {files.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 space-y-2"
                  >
                    {files.map((f, i) => (
                      <motion.div
                        key={`${f.file.name}-${i}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className={`flex items-center gap-3 p-3 border ${
                          f.error ? 'border-[#FF3300]/50 bg-[#FF3300]/5' : 'border-[#333] bg-[#111]/50'
                        }`}
                      >
                        {/* Preview or icon */}
                        {f.preview ? (
                          <img src={f.preview} alt="" className="w-8 h-8 object-cover" />
                        ) : (
                          getFileIcon(f.file.type)
                        )}

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-mono text-xs text-white truncate">{f.file.name}</p>
                          <p className="font-mono text-[10px] text-[#555]">{formatFileSize(f.file.size)}</p>
                        </div>

                        {/* Status */}
                        {f.uploading && <Loader2 size={14} className="animate-spin text-[#FF6600]" />}
                        {f.error && <AlertTriangle size={14} className="text-[#FF3300]" />}
                        {f.url && <CheckCircle size={14} className="text-green-500" />}

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="p-1 hover:bg-[#333] transition-colors"
                        >
                          <X size={14} className="text-[#555]" />
                        </button>
                      </motion.div>
                    ))}

                    {/* Total size */}
                    <p className="font-mono text-[10px] text-[#555] text-right">
                      Totale: {formatFileSize(files.reduce((acc, f) => acc + f.file.size, 0))} / {formatFileSize(MAX_TOTAL_SIZE)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Submit ────────────────────────────────── */}
            <div className="flex justify-end pt-4">
              <Button type="submit" variant="cta" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Invia richiesta
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ============================================================
   Page wrapper with Suspense for useSearchParams
   ============================================================ */
export default function PreventivoPage() {
  return (
    <Suspense
      fallback={
        <>
          <Header />
          <main className="min-h-screen bg-transparent pt-32 pb-20 relative z-10">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <Loader2 size={32} className="animate-spin text-[#FF6600] mx-auto" />
            </div>
          </main>
        </>
      }
    >
      <PreventivoForm />
    </Suspense>
  );
}

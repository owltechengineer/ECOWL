import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { getSiteSettings } from '@/lib/supabase/queries';

const TITOLARE = {
  nome: 'Fabiano Gaio',
  indirizzo: 'Via Don Pozzi 17, 20844 Triuggio (MB), Italia',
  telefono: '+39 339 637 2630',
  email: 'contatti@email.it',
  codiceFiscale: 'GAIFBN04R05B729P',
};

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sulla privacy ai sensi del GDPR e della normativa italiana.',
};

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();
  const siteName = settings?.site_name || TITOLARE.nome;
  const email = settings?.contact_email || TITOLARE.email;
  const address = settings?.address || TITOLARE.indirizzo;
  const phone = settings?.phone || TITOLARE.telefono;
  const codiceFiscale = TITOLARE.codiceFiscale;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-20 md:pt-32 pb-12 md:pb-20">
        <article className="max-w-3xl mx-auto px-4 md:px-6">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-xs text-[#999] hover:text-[#FF6600] transition-colors mb-4 md:mb-8"
          >
            <ArrowLeft size={12} /> Torna alla Home
          </a>

          <h1 className="font-mono text-sm md:text-2xl font-semibold text-white mb-4 md:mb-8">
            Informativa sulla Privacy
          </h1>
          <p className="font-mono text-[9px] md:text-[11px] text-[#555] mb-6 md:mb-10">
            Ultimo aggiornamento: Febbraio 2026
          </p>

          <div className="prose-owltech prose-owltech-sm space-y-6 md:space-y-8">
            <section>
              <h2>1. Titolare del Trattamento</h2>
              <p>
                Il Titolare del trattamento dei dati personali è <strong>{siteName}</strong>
                (Codice Fiscale: {codiceFiscale}), persona fisica residente in Italia.
              </p>
              <p>
                <strong>Indirizzo:</strong> {address}<br />
                <strong>Telefono:</strong> <a href={`tel:${phone}`}>{phone}</a><br />
                <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p>
                Per esercitare i tuoi diritti o per qualsiasi richiesta relativa alla privacy puoi
                contattarci ai recapiti sopra indicati.
              </p>
            </section>

            <section>
              <h2>2. Tipologie di Dati Raccolti</h2>
              <p>Tra i dati personali raccolti, in modo diretto o tramite terze parti, ci sono:</p>
              <ul>
                <li><strong>Dati di contatto:</strong> nome, email, telefono, azienda — forniti volontariamente tramite il modulo di richiesta preventivo.</li>
                <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate, orari di accesso — raccolti automaticamente tramite cookie e strumenti di analisi.</li>
                <li><strong>File caricati:</strong> documenti, immagini o altri file allegati alle richieste di preventivo.</li>
              </ul>
            </section>

            <section>
              <h2>3. Finalità del Trattamento</h2>
              <p>I dati personali sono trattati per le seguenti finalità:</p>
              <ul>
                <li>Rispondere alle richieste di preventivo e fornire i servizi richiesti.</li>
                <li>Comunicazioni relative ai servizi offerti.</li>
                <li>Analisi statistiche anonime sull&apos;utilizzo del sito (Google Analytics).</li>
                <li>Adempimento di obblighi legali e fiscali.</li>
              </ul>
            </section>

            <section>
              <h2>4. Base Giuridica del Trattamento</h2>
              <p>
                Il trattamento dei dati si basa su: il consenso dell&apos;utente (art. 6.1.a GDPR),
                l&apos;esecuzione di un contratto o misure precontrattuali (art. 6.1.b GDPR),
                e l&apos;adempimento di obblighi legali (art. 6.1.c GDPR).
              </p>
              <p>
                La presente informativa è resa ai sensi dell&apos;art. 13 del Regolamento (UE) 2016/679 (GDPR)
                e degli artt. 12 e 13 del D.lgs. 30 giugno 2003, n. 196 (Codice in materia di protezione
                dei dati personali), come modificato dal D.lgs. 10 agosto 2018, n. 101.
              </p>
            </section>

            <section>
              <h2>5. Modalità di Trattamento</h2>
              <p>
                I dati sono trattati con strumenti informatici e/o telematici, con logiche
                strettamente connesse alle finalità indicate, e con l&apos;adozione di adeguate
                misure di sicurezza per prevenire accessi non autorizzati, perdita o
                distruzione dei dati.
              </p>
            </section>

            <section>
              <h2>6. Conservazione dei Dati</h2>
              <p>
                I dati personali sono conservati per il tempo necessario a soddisfare le
                finalità per cui sono stati raccolti, e comunque non oltre i termini previsti
                dalla normativa vigente. I dati relativi alle richieste di preventivo sono
                conservati per un massimo di 24 mesi dalla raccolta.
              </p>
            </section>

            <section>
              <h2>7. Comunicazione e Diffusione dei Dati</h2>
              <p>
                I dati personali non saranno diffusi. Potranno essere comunicati a:
              </p>
              <ul>
                <li>Fornitori di servizi tecnici (hosting, database, email) necessari al funzionamento del sito.</li>
                <li>Autorità competenti, se richiesto dalla legge.</li>
              </ul>
              <p>I principali servizi di terze parti utilizzati sono:</p>
              <ul>
                <li><strong>Supabase</strong> — Database e storage (server EU).</li>
                <li><strong>Google Analytics</strong> — Analisi del traffico web (con anonimizzazione IP).</li>
                <li><strong>Vercel</strong> — Hosting dell&apos;applicazione.</li>
              </ul>
            </section>

            <section>
              <h2>8. Diritti dell&apos;Interessato</h2>
              <p>
                Ai sensi degli articoli 15-22 del GDPR, l&apos;utente ha il diritto di:
              </p>
              <ul>
                <li>Accedere ai propri dati personali.</li>
                <li>Richiederne la rettifica o la cancellazione.</li>
                <li>Limitarne il trattamento.</li>
                <li>Opporsi al trattamento.</li>
                <li>Richiedere la portabilità dei dati.</li>
                <li>Revocare il consenso in qualsiasi momento, senza che la liceità del trattamento basato sul consenso prima della revoca ne sia pregiudicata.</li>
                <li>Proporre reclamo all&apos;Autorità Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>).</li>
              </ul>
              <p>
                Per esercitare i tuoi diritti, scrivi a: <a href={`mailto:${email}`}>{email}</a>.
                La revoca del consenso è agevole quanto la sua prestazione.
              </p>
            </section>

            <section>
              <h2>9. Trasferimento Dati Extra-UE</h2>
              <p>
                Alcuni servizi di terze parti (es. Google Analytics) possono comportare il
                trasferimento di dati verso paesi extra-UE. In tal caso, il trasferimento
                avviene nel rispetto delle garanzie previste dal GDPR (clausole contrattuali
                standard, decisioni di adeguatezza).
              </p>
            </section>

            <section>
              <h2>10. Modifiche alla presente Informativa</h2>
              <p>
                Il Titolare si riserva il diritto di apportare modifiche alla presente
                informativa in qualsiasi momento. Gli utenti sono invitati a consultare
                periodicamente questa pagina.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer settings={settings} />
    </>
  );
}

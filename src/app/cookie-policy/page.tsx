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
  title: 'Cookie Policy',
  description: 'Informativa sui cookie ai sensi della normativa italiana ed europea.',
};

export default async function CookiePolicyPage() {
  const settings = await getSiteSettings();
  const siteName = settings?.site_name || TITOLARE.nome;
  const email = settings?.contact_email || TITOLARE.email;
  const address = settings?.address || TITOLARE.indirizzo;
  const phone = settings?.phone || TITOLARE.telefono;

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
            Cookie Policy
          </h1>
          <p className="font-mono text-[9px] md:text-[11px] text-[#555] mb-6 md:mb-10">
            Ultimo aggiornamento: Febbraio 2026
          </p>

          <div className="prose-owltech prose-owltech-sm space-y-6 md:space-y-8">
            <section>
              <h2>1. Cosa sono i Cookie</h2>
              <p>
                I cookie sono piccoli file di testo che vengono salvati sul tuo dispositivo
                quando visiti un sito web. Vengono utilizzati per migliorare l&apos;esperienza
                di navigazione, ricordare le preferenze dell&apos;utente e raccogliere informazioni
                statistiche sull&apos;utilizzo del sito.
              </p>
            </section>

            <section>
              <h2>2. Tipologie di Cookie Utilizzati</h2>

              <h3>2.1 Cookie Tecnici (necessari)</h3>
              <p>
                Questi cookie sono essenziali per il funzionamento del sito e non possono
                essere disattivati. Includono:
              </p>
              <ul>
                <li><strong>Cookie di sessione:</strong> necessari per la navigazione e l&apos;utilizzo delle funzionalità del sito.</li>
                <li><strong>Cookie di autenticazione:</strong> utilizzati per l&apos;accesso all&apos;area amministrativa (<code>admin_token</code>).</li>
                <li><strong>Preferenza consenso:</strong> la scelta dell&apos;utente riguardo ai cookie analitici viene memorizzata in localStorage (<code>cookie_consent</code>) per evitare di ripetere il banner ad ogni visita.</li>
              </ul>

              <h3>2.2 Cookie Analitici (Google Analytics)</h3>
              <p>
                Utilizziamo Google Analytics (ID: G-2LKVJMSYR9) per raccogliere informazioni
                statistiche sull&apos;utilizzo del sito in forma aggregata e anonima. Questi cookie
                vengono installati solo previo consenso dell&apos;utente.
              </p>
              <ul>
                <li><strong>_ga:</strong> utilizzato per distinguere gli utenti. Durata: 2 anni.</li>
                <li><strong>_ga_*:</strong> utilizzato per mantenere lo stato della sessione. Durata: 2 anni.</li>
              </ul>
              <p>
                Google Analytics opera con anonimizzazione dell&apos;indirizzo IP. Per maggiori
                informazioni sulla privacy di Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.
              </p>
            </section>

            <section>
              <h2>3. Gestione dei Cookie</h2>
              <p>
                Al primo accesso al sito viene mostrato un banner per il consenso ai cookie.
                L&apos;utente può:
              </p>
              <ul>
                <li><strong>Accettare tutti i cookie</strong> — cliccando su &quot;Accetta&quot;.</li>
                <li><strong>Rifiutare i cookie analitici</strong> — cliccando su &quot;Rifiuta&quot;. In questo caso verranno installati solo i cookie tecnici necessari.</li>
              </ul>
              <p>
                Puoi modificare le tue preferenze in qualsiasi momento cliccando su &quot;Gestisci cookie&quot;
                nel footer del sito: il banner riapparirà e potrai accettare o rifiutare nuovamente i cookie analitici.
                La revoca è agevole quanto la prestazione del consenso.
              </p>
              <p>
                È inoltre possibile gestire i cookie tramite le impostazioni del proprio browser:
              </p>
              <ul>
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
                <li><a href="https://support.microsoft.com/it-it/windows/eliminare-e-gestire-i-cookie-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              </ul>
            </section>

            <section>
              <h2>4. Base Giuridica</h2>
              <p>
                I cookie tecnici sono installati sulla base del legittimo interesse del titolare
                (art. 6.1.f GDPR). I cookie analitici sono installati previo consenso
                dell&apos;utente (art. 6.1.a GDPR), in conformità con il Provvedimento del Garante
                Privacy n. 231 del 10 giugno 2021 (&quot;Linee guida cookie e altri strumenti di
                tracciamento&quot;) e con il D.lgs. 30 giugno 2003, n. 196 (Codice privacy), come
                modificato dal D.lgs. 10 agosto 2018, n. 101.
              </p>
            </section>

            <section>
              <h2>5. Titolare e Contatti</h2>
              <p>
                Il Titolare del trattamento è <strong>{siteName}</strong>, persona fisica residente in Italia
                — {address}. Per contatti: <a href={`mailto:${email}`}>{email}</a>, Tel. <a href={`tel:${phone}`}>{phone}</a>.
              </p>
            </section>

            <section>
              <h2>6. Diritti dell&apos;Utente</h2>
              <p>
                L&apos;utente può esercitare i diritti previsti dagli articoli 15-22 del GDPR
                (accesso, rettifica, cancellazione, limitazione, opposizione, portabilità)
                scrivendo a: <a href={`mailto:${email}`}>{email}</a>.
              </p>
              <p>
                Puoi revocare il consenso ai cookie analitici in qualsiasi momento cliccando su
                &quot;Gestisci cookie&quot; nel footer del sito. La revoca è agevole quanto la prestazione del consenso.
              </p>
              <p>
                Per proporre reclamo: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">Garante per la Protezione dei Dati Personali</a>.
              </p>
            </section>

            <section>
              <h2>7. Aggiornamenti</h2>
              <p>
                La presente Cookie Policy può essere aggiornata periodicamente. Si consiglia
                di consultare questa pagina regolarmente.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer settings={settings} />
    </>
  );
}

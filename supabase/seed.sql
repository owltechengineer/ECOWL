-- ============================================================
-- OWLTECH — Seed Data (Allineato alla presentazione aziendale)
-- Esegui questo file nel SQL Editor di Supabase DOPO schema.sql
-- ============================================================

-- Pulisci eventuali dati precedenti (in ordine per FK)
TRUNCATE prodotti, progetti, servizi, blog_posts, preventivi, hero, site_settings CASCADE;

-- ============================================================
-- 1. HERO
-- ============================================================
INSERT INTO hero (headline, subtitle, cta_text, cta_link, cta_secondary_text, cta_secondary_link, is_active)
VALUES (
  'Siamo diversi, ma seri.',
  'Partner tech per lo sviluppo verticale integrato end-to-end di progetti e concept innovativi. Trasformiamo le idee in prodotti finiti — riducendo tempi, rischi e complessità.',
  'Scopri i servizi',
  '/#servizi',
  'Vedi i progetti',
  '/#progetti',
  TRUE
);

-- ============================================================
-- 2. SERVIZI
-- ============================================================
INSERT INTO servizi (title, description, icon, cover_image, slug, order_index, is_active) VALUES
(
  'Post-Production & Quality Finishing',
  'Finiture, perfezionamento e validazione tecnica. Completamento del ciclo produttivo attraverso finiture estetiche, processi di correzione, montaggi, controllo qualità e validazioni. Pensato sia per prodotti tecnici che estetici, inclusi orologi, microcomponenti e parti per automazioni.',
  'Sparkles',
  '/images/servizi/post-production.jpg',
  'post-production-quality-finishing',
  0,
  TRUE
),
(
  'Product Development & R&D',
  'Dall''idea al prodotto funzionante. Supportiamo aziende e professionisti nello sviluppo di nuovi prodotti meccanici, orologieri, robotici, di microprecisione e di design. Seguiamo l''intero processo: analisi, progettazione, simulazioni, prototipazione e validazione. Integriamo anche componenti software e automazioni digitali quando richiesto.',
  'FlaskConical',
  '/images/servizi/product-development.jpg',
  'product-development-rd',
  1,
  TRUE
),
(
  'Prototyping, Manufacturing & Soft-Automation',
  'Dal modello al pezzo reale, e oltre. Realizziamo prototipi funzionali, piccole serie e componenti finiti grazie a una combinazione di stampa 3D, lavorazioni CNC, microproduzione e assemblaggi. Integrata a questo servizio c''è anche la possibilità di sviluppare software, automazioni digitali e piccoli sistemi logici per testare il prodotto o automatizzare fasi del processo.',
  'Cog',
  '/images/servizi/prototyping-manufacturing.jpg',
  'prototyping-manufacturing-soft-automation',
  2,
  TRUE
),
(
  'Reverse Engineering & Digitalization',
  'Dal reale al digitale, con precisione e replicabilità. Digitalizziamo e ricostruiamo componenti meccanici, microcomponenti, prodotti complessi e parti non più reperibili. Siamo specializzati nel reverse engineering per meccanica, orologeria, robotica, automazioni e design, con ricostruzione accurata e pronta alla produzione o al miglioramento.',
  'ScanLine',
  '/images/servizi/reverse-engineering.jpg',
  'reverse-engineering-digitalization',
  3,
  TRUE
);

-- ============================================================
-- 3. PROGETTI
-- ============================================================
INSERT INTO progetti (title, slug, description, content, cover_image, tags, client_name, year, link_live, is_featured, is_active, order_index) VALUES
(
  'Dispositivo IoT per Monitoraggio Ambientale — End-to-End',
  'dispositivo-iot-monitoraggio-ambientale',
  'Sviluppo end-to-end di un dispositivo IoT compatto per il monitoraggio ambientale in contesti industriali. Dalla consulenza iniziale al prodotto finito certificato IP65, passando per progettazione, prototipazione e produzione.',
  '## Il Progetto

Una startup cleantech ci ha affidato lo sviluppo completo di un dispositivo hardware per il monitoraggio in tempo reale di temperatura, umidità, particolato e VOC in ambienti industriali. Il cliente aveva il concept e l''elettronica di base, ma nessuna capacità interna per trasformarlo in un prodotto finito.

### Il ciclo di sviluppo OWLTECH

#### Fase 1 — Consulenza e valutazione
Abbiamo analizzato il concept iniziale, valutato la fattibilità tecnica e definito le specifiche del prodotto: IP65, alimentazione a batteria con autonomia di 12 mesi, comunicazione LoRaWAN, dimensioni compatte.

#### Fase 2 — Modello concettuale
Creazione di modelli 3D esplorativi per validare forma, ingombri e integrazione dei componenti elettronici. Test di ergonomia e proporzioni con stampe 3D rapide.

#### Fase 3 — Modello tecnico
Progettazione CAD parametrica del case in policarbonato rinforzato con guarnizioni in silicone. Simulazioni FEA per resistenza agli urti e alle vibrazioni. Analisi termica per la dissipazione.

#### Fase 4 — Produzione, test e sperimentazione
Produzione dei primi 50 pezzi tramite stampa 3D SLS per il beta testing. Test IP65 in laboratorio, test di campo per 3 mesi. Iterazione del design basata sui feedback. Produzione finale della serie da 200 unità in materiale definitivo.

### Risultato
Prodotto certificato IP65, autonomia di 14 mesi (superando il target), costo unitario ridotto del 30% rispetto alla stima iniziale grazie all''ottimizzazione DFM. La startup ha lanciato il prodotto con successo, acquisendo i primi 15 clienti industriali.',
  NULL,
  ARRAY['IoT', 'sviluppo-prodotto', 'end-to-end', 'startup', 'prototipazione'],
  'GreenSense Tech (Startup)',
  2025,
  NULL,
  TRUE,
  TRUE,
  0
),
(
  'Restauro e Riproduzione Calibro Orologiero Vintage',
  'restauro-riproduzione-calibro-orologiero',
  'Reverse engineering completo di un calibro meccanico anni ''60 non più in produzione. Scansione 3D, modellazione CAD, produzione CNC dei componenti mancanti e validazione funzionale — il nostro ciclo end-to-end applicato alla microprecisione orologiera.',
  '## Il Progetto

Un collezionista privato ci ha affidato il restauro di un movimento orologiero degli anni ''60 con componenti danneggiati e non più reperibili. Un progetto che richiedeva la combinazione di reverse engineering, progettazione, produzione e finitura — esattamente il tipo di sfida che il nostro approccio integrato è pensato per risolvere.

### Il ciclo di sviluppo OWLTECH

#### Fase 1 — Consulenza e valutazione
Analisi dello stato del movimento, identificazione dei componenti danneggiati, definizione del piano di intervento. Valutazione: 7 componenti da ricostruire, tolleranze nell''ordine dei centesimi di millimetro.

#### Fase 2 — Modello concettuale (Reverse Engineering)
Scansione 3D ad alta risoluzione dell''intero movimento. Ricostruzione digitale della cinematica per comprendere il funzionamento originale e identificare le specifiche di ogni componente.

#### Fase 3 — Modello tecnico
Modellazione CAD parametrica di ogni componente in SolidWorks. Simulazione cinematica del treno di ingranaggi per verificare il funzionamento virtuale prima della produzione.

#### Fase 4 — Produzione, test e finitura
Produzione CNC in acciaio e ottone con tolleranze centesimali. Post-produzione con finiture a specchio e satinatura selettiva. Assemblaggio, regolazione della marcia e test funzionali completi.

### Risultato
Movimento completamente funzionante, fedele all''originale, con miglioramenti nella resistenza dei materiali. Tutto il processo documentato e archiviato digitalmente per future riproduzioni.',
  NULL,
  ARRAY['orologeria', 'reverse-engineering', 'CNC', 'microprecisione', 'end-to-end'],
  'Collezione Privata',
  2025,
  NULL,
  TRUE,
  TRUE,
  1
),
(
  'Braccio Robotico 6 Assi per Assemblaggio Microcomponenti',
  'braccio-robotico-assemblaggio-microcomponenti',
  'Sviluppo completo di un braccio robotico a 6 assi per operazioni di assemblaggio di microcomponenti elettronici. Un progetto R&D end-to-end che dimostra come una startup possa accedere a capacità ingegneristiche avanzate senza infrastrutture interne.',
  '## Il Progetto

Una startup nel settore dell''elettronica di precisione necessitava di un sistema robotico personalizzato per l''assemblaggio di microcomponenti su PCB. Le soluzioni commerciali non raggiungevano la precisione richiesta. La startup non disponeva di spazi, macchinari né personale per sviluppare il sistema internamente.

### Perché un partner end-to-end

Questo progetto è l''esempio perfetto del valore che OWLTECH porta: il cliente aveva l''idea e il bisogno, noi abbiamo fornito le competenze ingegneristiche, i macchinari, il software e l''area di lavoro per trasformare il concept in un prodotto operativo.

### Il ciclo di sviluppo

#### Consulenza
Studio del workflow di assemblaggio, definizione requisiti: precisione < 10 micron, ciclo < 2 secondi, integrazione con visione artificiale esistente.

#### Sviluppo & R&D
Progettazione meccanica modulare in alluminio aeronautico e fibra di carbonio. Sviluppo del controller custom con feedback ad anello chiuso.

#### Prototipazione
Stampa 3D dei componenti strutturali per test cinematici. Tre iterazioni del design dei giunti prima della versione finale.

#### Produzione & Soft-Automation
Lavorazioni CNC 5 assi per giunti e parti di precisione. Sviluppo del software di controllo con interfaccia operatore, logging e diagnostica remota.

#### Test e validazione
Testing intensivo in condizioni operative reali. Calibrazione e ottimizzazione dei parametri di movimento.

### Risultato
Precisione di 8 micron, tempo ciclo di 1.7 secondi. Sistema integrato con successo nella linea di produzione. Il cliente ha ridotto i costi di assemblaggio del 60%.',
  NULL,
  ARRAY['robotica', 'automazione', 'R&D', 'microprecisione', 'startup', 'end-to-end'],
  'MicroTech Solutions (Startup)',
  2025,
  NULL,
  TRUE,
  TRUE,
  2
),
(
  'Linea di Componenti CNC per Attuatori Industriali',
  'linea-componenti-cnc-attuatori-industriali',
  'Produzione di 200+ componenti meccanici di precisione per una PMI del settore automazione. Dall''analisi DFM alla consegna con certificazione di qualità — il ciclo completo senza che il cliente debba gestire nulla internamente.',
  '## Il Progetto

Una PMI leader nel settore dell''automazione industriale ci ha commissionato la produzione di una linea completa di componenti per un nuovo modello di attuatore lineare. L''azienda non disponeva della capacità produttiva interna per tolleranze IT6 e necessitava di un partner affidabile per l''intero ciclo.

### Il valore del modello OWLTECH per le PMI

Per questa PMI, esternalizzare a OWLTECH ha significato:
- **Nessun investimento** in macchinari CNC 5 assi
- **Nessun personale** dedicato alla produzione di precisione
- **Nessuna gestione** di materie prime e fornitori
- **Tempi certi** con un singolo interlocutore end-to-end

### Processo

1. **Analisi DFM** — Ottimizzazione dei disegni per la manifattura, riduzione costi senza compromettere le performance
2. **Setup produttivo** — Programmazione CAM con approccio LEAN, attrezzature dedicate
3. **Produzione CNC** — Tornio e fresa 5 assi. Materiali: acciaio inox 316L e alluminio 7075
4. **Controllo qualità** — Misurazione CMM su ogni lotto, report dimensionali completi, KPI di processo monitorati
5. **Post-produzione** — Anodizzazione, passivazione e confezionamento per integrazione diretta

### Metriche e risultato
- Consegna completa in **6 settimane**
- Tasso di scarto: **< 0.3%**
- Zero rilavorazioni richieste dal cliente
- Piano di business continuity attivato per garantire forniture successive',
  NULL,
  ARRAY['CNC', 'automazione', 'PMI', 'produzione', 'LEAN', 'controllo-qualità'],
  'AutoTech Industries (PMI)',
  2024,
  NULL,
  TRUE,
  TRUE,
  3
),
(
  'Digitalizzazione Catalogo per Produttore Orologiero',
  'digitalizzazione-catalogo-produttore-orologiero',
  'Scansione 3D e ricostruzione CAD di 150 microcomponenti meccanici per un produttore orologiero svizzero. Creazione di una libreria digitale completa, pronta per la produzione e per il miglioramento continuo.',
  '## Il Progetto

Un produttore orologiero svizzero necessitava di digitalizzare il proprio catalogo storico di microcomponenti. Molti esistevano solo come campioni fisici, senza documentazione tecnica. Il rischio: perdere la capacità di riprodurli.

### Perché OWLTECH

Il cliente avrebbe potuto acquistare scanner 3D e software, assumere tecnici e allestire un laboratorio. Oppure affidarsi a noi — che abbiamo già tutto questo, strutturato e operativo.

Rendiamo semplice un processo che internamente richiederebbe spazi, macchinari, personale, tempo e risorse.

### Processo end-to-end

1. **Catalogazione** — Inventario e classificazione di 150 componenti
2. **Scansione 3D** — Scanner a luce strutturata per pezzi standard, micro-CT per i più piccoli (da 0.3mm)
3. **Ricostruzione CAD** — Modellazione parametrica SolidWorks con quote funzionali
4. **Validazione** — Confronto dimensionale scan vs. CAD con report di deviazione per ogni pezzo
5. **Libreria digitale** — Database organizzato con metadata, materiali, specifiche e file pronti alla produzione

### Risultato
Libreria digitale completa di 150 componenti. Il cliente può ora riordinare qualsiasi pezzo senza dipendere da campioni fisici, con tempi di approvvigionamento ridotti dell''80%.',
  NULL,
  ARRAY['reverse-engineering', 'scansione-3D', 'orologeria', 'digitalizzazione', 'CAD'],
  'Swiss Precision AG (Microimpresa)',
  2024,
  NULL,
  FALSE,
  TRUE,
  4
),
(
  'Stazione QC Automatizzata con Visione Artificiale',
  'stazione-qc-automatizzata-visione-artificiale',
  'Progettazione e sviluppo end-to-end di una stazione di controllo qualità automatizzata per l''ispezione di microcomponenti in linea di produzione. Hardware, software AI, integrazione e validazione.',
  '## Il Progetto

Un produttore di componenti orologieri eseguiva il controllo qualità visivo manualmente, con operatori al microscopio. Il processo era lento, soggettivo e non scalabile. Ci hanno chiesto una soluzione end-to-end: dall''analisi del problema alla stazione operativa.

### Il nostro approccio end-to-end

Questo progetto ha coinvolto tutte le aree del nostro piano operativo:
- **Hardware** — Progettazione e produzione della stazione meccanica
- **Software** — Algoritmi di visione con deep learning
- **Area di lavoro** — Test e validazione nel nostro laboratorio
- **Materiali** — Selezione e approvvigionamento di telecamere, illuminazione e movimentazione

### Ciclo di sviluppo

#### Consulenza
Analisi della difettologia tipica, definizione dei criteri di accettazione, studio del throughput richiesto (500+ pezzi/ora).

#### Sviluppo
Progettazione hardware: stazione con illuminazione controllata, telecamere industriali 5MP, movimentazione lineare. Software: rete neurale convoluzionale addestrata su dataset di 10.000+ immagini.

#### Prototipazione
Stampa 3D della struttura per test di illuminazione e posizionamento telecamere. Tre iterazioni del layout ottico.

#### Produzione e integrazione
Produzione CNC della stazione definitiva in alluminio. Integrazione con il MES aziendale per tracciabilità. Deploy e formazione operatori.

### Metriche KPI
- Throughput: **600 pezzi/ora** (vs. 500 target)
- Falsi positivi: **< 2%**
- Falsi negativi: **< 0.5%**
- ROI: **8 mesi**',
  NULL,
  ARRAY['automazione', 'quality-control', 'AI', 'visione-artificiale', 'end-to-end', 'LEAN'],
  'Horologix Manufacturing (PMI)',
  2025,
  NULL,
  TRUE,
  TRUE,
  5
),
(
  'Cassa Orologio Custom in Titanio Grado 5 — Concept to Product',
  'cassa-orologio-custom-titanio-concept-to-product',
  'Sviluppo prodotto completo per un brand orologiero indipendente: dalla concept art alla cassa finita in titanio Grado 5. Il nostro ciclo end-to-end applicato al design di alta gamma.',
  '## Il Progetto

Un brand orologiero indipendente — un innovatore con una visione chiara ma senza capacità manifatturiere — ci ha commissionato lo sviluppo della cassa per il loro primo modello. Partivano da sketch su carta.

### Il problema che risolviamo

Per produrre una cassa in titanio Grado 5 servono:
- **Spazi** — Un laboratorio con CNC 5 assi e strumenti di finitura
- **Macchinari** — Fresa, tornio, sabbiatrice, lucidatrice
- **Personale** — Ingegneri meccanici, CAD designer, operatori CNC, finitore
- **Tempo** — Mesi di trial & error senza un processo strutturato
- **Risorse** — Investimento minimo a 6 cifre

Con OWLTECH, il brand ha avuto tutto questo con un singolo partner, costi prevedibili e timeline certe.

### Ciclo di sviluppo

#### Consulenza e valutazione
Analisi degli sketch, definizione specifiche: impermeabilità 10 ATM, integrazione ETA 2824-2, finiture mixed satinato/lucido.

#### Modello concettuale
Design industriale 3D, studio ergonomico, rendering fotorealistici per validazione estetica con il cliente.

#### Modello tecnico
Modellazione CAD parametrica, simulazione FEA per impermeabilità e resistenza urti, tavole tecniche complete.

#### Produzione, test e finitura
Prototipo in resina SLA per test vestibilità. Produzione CNC 5 assi in titanio Grado 5. Post-produzione: sabbiatura selettiva, satinatura, lucidatura a specchio dei biselli. Test impermeabilità e montaggio movimento.

### Risultato
Cassa pronta per la produzione in serie limitata. Il brand ha lanciato il modello con successo, vendendo la prima tiratura di 50 pezzi in 48 ore. Piano di business continuity attivato per la seconda produzione.',
  NULL,
  ARRAY['orologeria', 'titanio', 'CNC', 'design', 'product-development', 'innovatore', 'end-to-end'],
  'Meridian Watch Co. (Innovatore)',
  2025,
  NULL,
  TRUE,
  TRUE,
  6
);

-- ============================================================
-- 4. PRODOTTI (Shop)
-- ============================================================
INSERT INTO prodotti (title, slug, description, content, price, currency, category, tags, is_active, is_featured, order_index) VALUES
(
  'Consulenza Tecnica & Valutazione Progetto',
  'consulenza-tecnica-valutazione-progetto',
  'Il punto di partenza del nostro ciclo di sviluppo. Una consulenza strutturata per valutare il tuo progetto, definire le specifiche e pianificare il percorso dal concept al prodotto finito.',
  '## Il primo passo del ciclo OWLTECH

Ogni progetto inizia con una consulenza dalla quale si ottiene una valutazione chiara e completa. Non vendiamo soluzioni generiche: analizziamo il tuo caso specifico.

## Cosa include

- **Analisi del concept** — Valutazione tecnica dell''idea, identificazione criticità e opportunità
- **Studio di fattibilità** — Materiali, processi produttivi, tolleranze raggiungibili
- **Stima costi e tempi** — Budget realistico per ogni fase del ciclo di sviluppo
- **Roadmap progettuale** — Piano dettagliato: dalla consulenza alla produzione
- **Report scritto** — Documento di valutazione completo e condivisibile

## Per chi è pensato
PMI, microimprese, startup e innovatori che hanno un''idea o un concept e vogliono capire come trasformarlo in un prodotto reale — senza rischi nascosti.

## Output
Un documento che ti permette di decidere consapevolmente se e come procedere. Nessun impegno successivo obbligatorio.

## Durata
1-2 settimane dalla kickoff call',
  350.00,
  'EUR',
  'Consulenza',
  ARRAY['consulenza', 'valutazione', 'fattibilità', 'roadmap'],
  TRUE,
  TRUE,
  0
),
(
  'Pacchetto Sviluppo Prodotto — Concept to Prototype',
  'pacchetto-sviluppo-prodotto-concept-to-prototype',
  'Il nostro pacchetto end-to-end: dall''idea al prototipo funzionante. Include consulenza, modello concettuale, modello tecnico, prototipazione e prima validazione. Tutto il ciclo di sviluppo in un unico servizio.',
  '## Il ciclo completo in un pacchetto

Seguiamo l''intero percorso di sviluppo, così come descritto nel nostro ciclo:

### Fase 1 — Consulenza e valutazione
Studio di fattibilità, definizione specifiche, analisi dei requisiti e pianificazione.

### Fase 2 — Modello concettuale
Modellazione 3D esplorativa, test di forma e proporzioni, rendering per validazione estetica. Stampa 3D rapida per feedback fisico.

### Fase 3 — Modello tecnico
CAD parametrico definitivo con quote funzionali, tolleranze e materiali. Simulazioni FEA/CFD se necessario. Tavole tecniche per la produzione.

### Fase 4 — Prototipo
Realizzazione del prototipo fisico: stampa 3D per test di forma, CNC per test funzionali nel materiale finale.

### Fase 5 — Test e validazione
Test del prototipo contro le specifiche. Report con risultati e raccomandazioni per la produzione in serie.

## Per chi è pensato
Inventori, startup, PMI e innovatori che vogliono trasformare un concept in un prodotto tangibile e validato — senza dover gestire spazi, macchinari e personale.

## Tempi
4-8 settimane a seconda della complessità.

*Preventivo dettagliato dopo la consulenza iniziale.*',
  2500.00,
  'EUR',
  'Sviluppo Prodotto',
  ARRAY['R&D', 'sviluppo-prodotto', 'prototipazione', 'end-to-end'],
  TRUE,
  TRUE,
  1
),
(
  'Prototipo Funzionale — Stampa 3D Professionale',
  'prototipo-funzionale-stampa-3d',
  'Realizzazione di prototipi funzionali in stampa 3D professionale. Resina ad alta risoluzione o tecnopolimeri tecnici. Ideale per il modello concettuale e per la validazione preliminare del design.',
  '## Dal modello al pezzo fisico

La prototipazione rapida è una fase fondamentale del nostro ciclo di sviluppo. Permette di validare forma, assemblaggio e funzionamento prima di investire nella produzione definitiva.

## Cosa include

- Analisi del file 3D e ottimizzazione per la stampa
- Stampa in resina (SLA/DLP) o FDM con tecnopolimeri
- Post-processing: rimozione supporti, levigatura, finitura
- Fino a 2 iterazioni incluse
- Report fotografico del risultato

## Materiali disponibili
- **Resina Standard** — Dettaglio elevato, finitura liscia
- **Resina Engineering** — Resistenza meccanica e termica
- **Nylon PA12** — Parti funzionali e resistenti
- **PETG Carbon Fiber** — Rigidità e leggerezza

## Tempi di consegna
3-7 giorni lavorativi

## Parte del ciclo
Questo servizio copre la fase di prototipazione del nostro ciclo. Può essere acquistato singolarmente o come parte del pacchetto completo.',
  280.00,
  'EUR',
  'Prototipazione',
  ARRAY['stampa-3D', 'prototipazione', 'SLA', 'FDM'],
  TRUE,
  TRUE,
  2
),
(
  'Componente CNC su Misura — Produzione di Precisione',
  'componente-cnc-su-misura',
  'Lavorazione CNC di componenti meccanici su disegno. Tornitura e fresatura multi-asse in acciaio, alluminio, titanio, ottone. Tolleranze fino a IT6. Singolo pezzo o piccole serie con controllo qualità certificato.',
  '## Dalla progettazione al pezzo finito

La nostra capacità produttiva CNC è il cuore della fase di produzione del ciclo OWLTECH. Lavoriamo con un approccio LEAN per garantire efficienza e qualità.

## Cosa include

- Analisi DFM (Design for Manufacturing) del disegno
- Programmazione CAM ottimizzata
- Lavorazione CNC 3/4/5 assi
- Controllo dimensionale con report CMM
- Finitura a specifica (grezzo, satinato, lucido, anodizzato)

## Materiali
- Acciaio Inox 304 / 316L
- Alluminio 6061 / 7075
- Titanio Grado 2 / Grado 5
- Ottone CW614N
- Altri materiali su richiesta

## Metriche di qualità
- Tolleranze fino a IT6
- Controllo CMM su ogni lotto
- Tracciabilità completa dei materiali
- Report dimensionali inclusi

## Tempi di consegna
7-15 giorni lavorativi (singolo pezzo). Piccole serie: da concordare.

*Il prezzo è un punto di partenza. Il costo finale dipende da complessità, materiale e quantità.*',
  350.00,
  'EUR',
  'Produzione',
  ARRAY['CNC', 'fresatura', 'tornitura', 'meccanica', 'LEAN'],
  TRUE,
  TRUE,
  3
),
(
  'Servizio Scansione 3D & Reverse Engineering',
  'servizio-scansione-3d-reverse-engineering',
  'Dal reale al digitale. Servizio professionale di scansione 3D e ricostruzione CAD per componenti meccanici, microcomponenti e prodotti di design. Il primo passo per digitalizzare ciò che esiste solo come pezzo fisico.',
  '## Digitalizziamo il tuo prodotto

Il reverse engineering è fondamentale per le aziende che vogliono modernizzare il proprio catalogo, riprodurre componenti obsoleti o migliorare prodotti esistenti.

## Cosa include

- Scansione 3D ad alta risoluzione (accuratezza fino a 5 micron)
- Ricostruzione modello CAD parametrico (SolidWorks / STEP / IGES)
- Report dimensionale con deviazioni
- Fino a 3 revisioni incluse
- Consegna file in formato nativo + STEP + STL

## Tecnologie
- **Scanner a luce strutturata** — Per componenti da 5mm a 500mm
- **Micro-CT** — Per microcomponenti e geometrie interne
- **CMM** — Per validazione dimensionale di precisione

## Per chi è pensato
Produttori, PMI, designer e chiunque necessiti di digitalizzare un componente fisico per riproduzione, miglioramento o archiviazione.

## Tempi di consegna
5-10 giorni lavorativi a seconda della complessità',
  450.00,
  'EUR',
  'Reverse Engineering',
  ARRAY['scansione-3D', 'reverse-engineering', 'CAD', 'digitalizzazione'],
  TRUE,
  TRUE,
  4
),
(
  'Servizio Post-Produzione & Quality Finishing',
  'servizio-post-produzione-quality-finishing',
  'Finiture professionali per componenti meccanici e di design. Sabbiatura, satinatura, lucidatura, anodizzazione, PVD e controllo qualità certificato. L''ultima fase del ciclo, quella che fa la differenza.',
  '## La finitura che completa il prodotto

La post-produzione è la fase finale del ciclo di sviluppo: quella che trasforma un componente lavorato in un prodotto finito di qualità. Ogni finitura è scelta e controllata per garantire prestazioni ed estetica.

## Cosa include

- Analisi dello stato del componente
- Proposta di trattamento e finitura ottimale
- Esecuzione del trattamento scelto
- Controllo qualità visivo e dimensionale
- Documentazione fotografica prima/dopo

## Trattamenti disponibili
- **Sabbiatura** — Finitura uniforme opaca
- **Satinatura** — Effetto brushed direzionale
- **Lucidatura a specchio** — Mirror finish
- **Anodizzazione** — Protezione e colorazione alluminio
- **PVD Coating** — Rivestimenti resistenti (TiN, DLC, CrN)
- **Passivazione** — Protezione acciaio inox

## Tempi di consegna
3-10 giorni lavorativi a seconda del trattamento',
  180.00,
  'EUR',
  'Finiture',
  ARRAY['finitura', 'post-produzione', 'anodizzazione', 'PVD', 'quality-finishing'],
  TRUE,
  FALSE,
  5
),
(
  'Modulo Soft-Automation & Testing Custom',
  'modulo-soft-automation-testing-custom',
  'Sviluppo di moduli software e automazioni digitali per testing, controllo processo e sistemi logici. Firmware, interfacce operatore e integrazione con hardware esistente. La componente digitale del nostro ciclo.',
  '## Automazione accessibile

Non serve un impianto da milioni di euro. La soft-automation è la nostra risposta per PMI e startup che vogliono automatizzare processi specifici con soluzioni mirate e costi contenuti.

## Cosa include

- Analisi del processo da automatizzare
- Progettazione architettura software/firmware
- Sviluppo e testing
- Interfaccia operatore (se richiesta)
- Documentazione tecnica e manuale d''uso
- 30 giorni di supporto post-consegna

## Tecnologie
- **Firmware** — C/C++ per microcontrollori (STM32, ESP32, Arduino)
- **PLC & automazione** — Logica di controllo per attuatori e sensori
- **Interfacce** — Web-based o desktop per monitoraggio e controllo
- **Integrazione** — API, MQTT, Modbus, Serial

## Applicazioni tipiche
- Banchi di test automatizzati
- Monitoraggio processo in tempo reale
- Sorting e classificazione con visione
- Controllo qualità automatizzato

## Tempi
2-6 settimane. *Preventivo dettagliato dopo analisi dei requisiti.*',
  1200.00,
  'EUR',
  'Automazione',
  ARRAY['automazione', 'firmware', 'software', 'IoT', 'testing'],
  TRUE,
  FALSE,
  6
);

-- ============================================================
-- 5. BLOG POSTS
-- ============================================================
INSERT INTO blog_posts (title, slug, excerpt, content, author, tags, is_published, published_at, read_time) VALUES
(
  'Perché le PMI Non Dovrebbero Gestire l''Innovazione Hardware Internamente',
  'perche-pmi-non-gestire-innovazione-hardware-internamente',
  'In un mercato dove l''innovazione hardware è complessa e costosa, esternalizzare lo sviluppo prodotto a un partner specializzato riduce rischi, tempi e costi. Ecco perché il modello end-to-end funziona.',
  '## Il problema reale

L''innovazione hardware è fondamentale per competere, ma gestirla internamente richiede:

- **Spazi** dedicati alla produzione e ai test
- **Macchinari** costosi e complessi da mantenere
- **Personale** altamente specializzato
- **Tempo** per costruire competenze e processi
- **Risorse** finanziarie significative

Per una PMI, una microimpresa o una startup, questo investimento è spesso insostenibile — o semplicemente non ha senso rispetto al core business.

### Il modello alternativo: il partner end-to-end

Un partner tech specializzato nello sviluppo verticale integrato offre tutte queste capacità come servizio. Il cliente si concentra sulla propria visione di prodotto, il partner gestisce l''intero ciclo di sviluppo.

### I vantaggi concreti

#### Riduzione dei tempi
Un partner strutturato ha già macchinari, software, spazi e competenze operative. Non deve costruire nulla da zero. Un progetto che internamente richiederebbe 6-12 mesi può essere completato in 4-8 settimane.

#### Riduzione dei rischi
Processi validati, controllo qualità integrato, metriche KPI monitorate. Il rischio di errori costosi si abbassa drasticamente.

#### Costi prevedibili
Nessun investimento in conto capitale. Il costo del progetto è noto e definito fin dalla consulenza iniziale.

#### Flessibilità
Oggi hai bisogno di un prototipo, domani di una piccola serie, dopodomani di reverse engineering. Con un partner end-to-end, accedi a tutte queste competenze senza vincoli.

### Per chi funziona questo modello

- **PMI** che vogliono innovare senza appesantire la struttura
- **Microimprese** che non possono permettersi un reparto R&D
- **Startup** che devono validare il prodotto prima di investire in infrastrutture
- **Innovatori** che hanno l''idea ma non i mezzi per realizzarla

### Il nostro approccio

In OWLTECH siamo strutturati per essere parte integrante dei processi aziendali dei nostri clienti. Non siamo un fornitore occasionale: siamo il referente privilegiato per l''innovazione hardware.',
  'Team OWLTECH',
  ARRAY['PMI', 'startup', 'innovazione', 'end-to-end', 'outsourcing'],
  TRUE,
  '2025-12-01T10:00:00Z',
  7
),
(
  'Il Ciclo di Sviluppo Prodotto: Dalla Consulenza al Prodotto Finito',
  'ciclo-sviluppo-prodotto-consulenza-prodotto-finito',
  'Sviluppare un prodotto hardware non è un salto nel vuoto. È un processo strutturato in fasi chiare. Ecco come il ciclo OWLTECH trasforma un concept in un prodotto reale, passo dopo passo.',
  '## Un processo, non un miracolo

Molti clienti arrivano da noi con un''idea brillante e la domanda: "quanto costa e quanto ci vuole?". La risposta è: dipende. Ma il processo per arrivarci è sempre strutturato e trasparente.

### Il Ciclo di Sviluppo OWLTECH

#### Fase 1 — Consulenza e Valutazione
**Durata**: 1-2 settimane

Il ciclo parte sempre da qui. Analizziamo il concept, valutiamo la fattibilità, definiamo le specifiche e pianifichiamo il percorso. L''output è un documento chiaro che permette al cliente di decidere consapevolmente.

Cosa analizziamo:
- Requisiti funzionali e prestazionali
- Vincoli dimensionali, di peso e ambientali
- Materiali candidati e processi produttivi
- Budget e tempi disponibili
- Rischi e mitigazioni

#### Fase 2 — Modello Concettuale
**Durata**: 1-3 settimane

Traduciamo le specifiche in forme concrete. Modelli 3D esplorativi, rendering, stampe 3D rapide per toccare con mano. Il cliente valida l''estetica, le proporzioni e gli ingombri.

#### Fase 3 — Modello Tecnico
**Durata**: 2-4 settimane

Il cuore ingegneristico. CAD parametrico definitivo, simulazioni FEA/CFD, tavole tecniche complete. Ogni quota, raccordo e tolleranza ha una ragione. Il modello è pronto per la produzione.

#### Fase 4 — Produzione, Test e Sperimentazione
**Durata**: 2-6 settimane

Il momento della verità. Produzione del prototipo (o della prima serie), test contro le specifiche, iterazioni se necessario. Alla fine di questa fase, il cliente ha in mano un prodotto validato.

### I processi che supportano il ciclo

Dietro ogni fase ci sono processi interni strutturati:
- **Metriche KPI** per monitorare qualità e tempi
- **Gestione costi operativi** per mantenere il budget
- **Controllo qualità** integrato in ogni step
- **Manutenzione** continua di macchinari e software
- **Business continuity** per garantire la capacità produttiva
- **Gestione progetti e timeline** con milestones chiare

### Il risultato

Al termine del ciclo hai:
- Un prodotto validato e documentato
- File CAD pronti per la produzione in serie
- Report completo con tutte le decisioni tecniche
- La sicurezza di andare in produzione senza sorprese',
  'Team OWLTECH',
  ARRAY['sviluppo-prodotto', 'ciclo', 'processo', 'consulenza', 'metodologia'],
  TRUE,
  '2025-11-15T09:00:00Z',
  9
),
(
  'Metodo LEAN Applicato alla Prototipazione e Produzione',
  'metodo-lean-prototipazione-produzione',
  'Come applichiamo i principi LEAN nella nostra operatività quotidiana per ridurre sprechi, tempi morti e costi — offrendo ai clienti un servizio più efficiente e prezzi più competitivi.',
  '## Produrre meglio, non di più

Il metodo LEAN non è una buzzword per noi. È il modo in cui organizziamo ogni aspetto della nostra operatività: dal piano di produzione alla gestione dei materiali, dalla manutenzione dei macchinari al controllo qualità.

### I principi LEAN nel nostro contesto

#### 1. Eliminare gli sprechi
Ogni operazione che non aggiunge valore al prodotto finale è uno spreco. Nella prototipazione e produzione, questo significa:
- Setup macchinario ottimizzati per ridurre i tempi di fermo
- Percorsi utensile CAM ottimizzati per ridurre il tempo ciclo
- Gestione materiali just-in-time per ridurre gli stock

#### 2. Flusso continuo
Il pezzo si muove attraverso le fasi senza soste inutili:
Progettazione → Programmazione → Produzione → Controllo → Finitura → Consegna

Ogni fase è cronometrata e monitorata. Se c''è un collo di bottiglia, lo identifichiamo e lo risolviamo.

#### 3. Qualità alla fonte
Non controlliamo la qualità alla fine: la costruiamo in ogni fase. L''operatore CNC verifica il primo pezzo. Il software CAM simula il percorso prima di tagliare. Il controllo dimensionale è integrato nel processo, non aggiunto dopo.

#### 4. Miglioramento continuo (Kaizen)
Ogni progetto ci insegna qualcosa. Documentiamo le lessons learned, aggiorniamo i processi, ottimizziamo gli approcci. Il progetto N+1 è sempre più efficiente del progetto N.

### Come questo impatta il cliente

- **Tempi di consegna più brevi** — Meno sprechi = più velocità
- **Costi più competitivi** — Efficienza operativa = prezzi migliori
- **Qualità più consistente** — Processi standard = meno variabilità
- **Affidabilità** — Manutenzione preventiva = nessuna sorpresa

### Il nostro piano operativo

Il LEAN è il binario su cui corriamo. Ma i treni che ci corrono sopra sono:
- **Macchinari** — CNC 5 assi, stampanti 3D professionali, scanner, CMM
- **Software** — SolidWorks, Mastercam, GOM Inspect, ERP interno
- **Area di lavoro** — Laboratorio organizzato per flusso e sicurezza
- **Materiali** — Fornitori selezionati e qualificati',
  'Team OWLTECH',
  ARRAY['LEAN', 'produzione', 'efficienza', 'metodologia', 'operatività'],
  TRUE,
  '2025-10-20T08:30:00Z',
  8
),
(
  'Stampa 3D vs CNC: Quale Scegliere per il Tuo Prototipo?',
  'stampa-3d-vs-cnc-quale-scegliere-prototipo',
  'Due tecnologie complementari, non in competizione. Guida pratica alla scelta tra stampa 3D e CNC nella prototipazione, basata su criteri reali di progetto.',
  '## Non è una gara: sono strumenti diversi

La domanda "meglio la stampa 3D o il CNC?" è come chiedere "meglio il martello o il cacciavite?". Dipende sempre dal progetto — e dal punto del ciclo di sviluppo in cui ti trovi.

### Quando scegliere la Stampa 3D

| Criterio | Stampa 3D |
|----------|-----------|
| **Geometrie complesse** | Eccellente — cavità interne, lattice, forme organiche |
| **Velocità** | Poche ore per prototipi semplici |
| **Costo unitario** | Basso per pezzi singoli |
| **Materiali** | Resine, nylon, PETG, metalli (DMLS) |
| **Finitura** | Buona con post-processing |
| **Tolleranze** | ±0.1mm (SLA), ±0.2mm (FDM) |
| **Nel ciclo** | Modello concettuale, validazione rapida |

### Quando scegliere il CNC

| Criterio | CNC |
|----------|-----|
| **Materiali finali** | Eccellente — lavora il materiale definitivo |
| **Tolleranze** | Fino a ±0.01mm |
| **Finitura superficiale** | Eccellente — dal grezzo al mirror finish |
| **Ripetibilità** | Perfetta per serie |
| **Resistenza** | Materiale pieno, no stratificazione |
| **Nel ciclo** | Modello tecnico, produzione finale |

### Il percorso tipico nel nostro ciclo

1. **Modello concettuale** → Stampa 3D (forma, ingombri, proporzioni)
2. **Modello tecnico** → Stampa 3D engineering o CNC in materiale simil-finale
3. **Prototipo funzionale** → CNC nel materiale definitivo
4. **Produzione** → CNC ottimizzato con approccio LEAN

### Il nostro vantaggio

Avendo entrambe le tecnologie in-house, possiamo scegliere l''approccio migliore per ogni fase senza vincoli. Il cliente non deve cercare fornitori diversi per stampa 3D e CNC: gestiamo tutto noi, end-to-end.',
  'Team OWLTECH',
  ARRAY['stampa-3D', 'CNC', 'prototipazione', 'guida', 'tecnologie'],
  TRUE,
  '2025-09-05T08:30:00Z',
  5
),
(
  'Reverse Engineering: Quando e Perché è Indispensabile',
  'reverse-engineering-quando-perche-indispensabile',
  'Il reverse engineering non è copiare. È digitalizzare, documentare e migliorare ciò che esiste. Per PMI e microimprese, è spesso il primo passo per modernizzare il catalogo prodotti.',
  '## Non è copiare: è capire e preservare

Il reverse engineering è un processo tecnico fondamentale per:

- **Documentare** componenti privi di disegni tecnici
- **Riprodurre** parti obsolete o fuori produzione
- **Migliorare** prodotti esistenti con nuovi materiali o geometrie
- **Digitalizzare** cataloghi fisici per la produzione moderna

### Quando serve

#### Ricambi non più disponibili
Un macchinario costoso ha un componente rotto, il produttore originale non lo produce più. Il reverse engineering permette di ricostruirlo dal pezzo fisico — e di avere il modello digitale per il futuro.

#### Passaggio al digitale
Molte PMI e microimprese hanno cataloghi che esistono solo come campioni fisici o disegni cartacei. La digitalizzazione 3D crea una libreria CAD moderna e pronta per la produzione.

#### Miglioramento prodotto
Partendo da un componente esistente, è possibile ottimizzarne geometria, materiale o processo produttivo mantenendo la compatibilità.

### Le nostre tecnologie

- **Scanner a luce strutturata** — Componenti da 5mm a 500mm
- **Micro-CT** — Microcomponenti e geometrie interne
- **CMM** — Validazione dimensionale di precisione
- **Software** — GOM Inspect, SolidWorks, Geomagic

### Come si inserisce nel ciclo

Il reverse engineering è spesso la fase "zero" del nostro ciclo: digitalizziamo l''esistente, poi lo miglioriamo e lo riproduciamo con i nostri processi produttivi. End-to-end.',
  'Team OWLTECH',
  ARRAY['reverse-engineering', 'scansione-3D', 'digitalizzazione', 'PMI'],
  TRUE,
  '2025-08-12T11:00:00Z',
  7
),
(
  'Controllo Qualità e Metriche KPI nella Produzione di Precisione',
  'controllo-qualita-metriche-kpi-produzione-precisione',
  'La qualità non è un controllo finale: è un processo integrato. Come gestiamo KPI, metrologia e business continuity per garantire risultati consistenti ai nostri clienti.',
  '## La qualità è un processo, non un controllo

Nel nostro piano operativo, il controllo qualità non è l''ultimo step prima della consegna. È integrato in ogni fase del ciclo di sviluppo, supportato da metriche KPI chiare e processi documentati.

### I nostri processi interni di qualità

#### Metriche KPI
Monitoriamo costantemente:
- Tasso di scarto per materiale e processo
- Tempi ciclo effettivi vs. pianificati
- Deviazioni dimensionali per lotto
- Lead time dalla conferma ordine alla consegna
- Customer satisfaction rate

#### Controllo dimensionale
- **Livello 1** — Calibri digitali e micrometri (prototipi, verifiche rapide)
- **Livello 2** — CMM 3D (serie con tolleranze strette)
- **Livello 3** — Scansione 3D comparativa (geometrie complesse)
- **Livello 4** — Visione artificiale (grandi volumi, difetti superficiali)

#### Gestione costi operativi
Ogni progetto ha un budget definito e monitorato. L''approccio LEAN ci permette di identificare e eliminare sprechi in tempo reale.

#### Manutenzione e gestione macchinari
Manutenzione preventiva programmata. Nessun fermo macchina imprevisto che rallenti le consegne dei clienti.

#### Business Continuity
Piani attivi per garantire la continuità produttiva anche in caso di imprevisti. Fornitori alternativi qualificati, scorte strategiche di materiali critici.

#### Gestione progetti e timeline
Ogni progetto ha milestones chiare, comunicate al cliente. Aggiornamenti regolari sullo stato di avanzamento.

### Cosa significa per il cliente

- Risultati **consistenti e prevedibili**
- Documentazione **completa e trasparente**
- Problemi identificati e risolti **prima** che impattino la consegna
- Un partner che tratta il tuo progetto con lo **stesso rigore** di un processo interno',
  'Team OWLTECH',
  ARRAY['controllo-qualità', 'KPI', 'LEAN', 'metrologia', 'business-continuity'],
  TRUE,
  '2025-07-01T09:30:00Z',
  6
);

-- ============================================================
-- 6. PREVENTIVI (Esempi / Demo)
-- ============================================================
INSERT INTO preventivi (nome, email, telefono, azienda, servizi_selezionati, budget, messaggio, stato) VALUES
(
  'Marco Bianchi',
  'marco.bianchi@example.com',
  '+39 333 1234567',
  'Bianchi Meccanica Srl',
  ARRAY['Reverse Engineering & Digitalization', 'Prototyping, Manufacturing & Soft-Automation'],
  '5.000 - 10.000 €',
  'Buongiorno, siamo una PMI nel settore meccanico e avremmo bisogno di digitalizzare una serie di componenti per i quali non abbiamo più i disegni tecnici. Si tratta di circa 30 pezzi di dimensioni variabili (da 5mm a 80mm). Vorremmo ottenere i modelli CAD per poterli riprodurre in CNC. Non abbiamo le attrezzature per farlo internamente. È possibile avere un preventivo dettagliato?',
  'nuovo'
),
(
  'Laura Ferri',
  'l.ferri@techstartup.it',
  '+39 02 9876543',
  'TechStartup Innovation',
  ARRAY['Product Development & R&D', 'Prototyping, Manufacturing & Soft-Automation'],
  '10.000 - 25.000 €',
  'Siamo una startup e stiamo sviluppando un dispositivo IoT per il monitoraggio ambientale. Abbiamo il concept e l''elettronica di base, ma non abbiamo né gli spazi né le competenze per la progettazione meccanica del case e la prototipazione. Il dispositivo deve essere IP65, contenere una PCB di 60x40mm. Cerchiamo un partner end-to-end che ci segua dalla consulenza al prototipo finito.',
  'in_lavorazione'
),
(
  'Andreas Müller',
  'a.mueller@swisswatch.ch',
  '+41 76 123 4567',
  'Swiss Heritage Watches',
  ARRAY['Post-Production & Quality Finishing', 'Reverse Engineering & Digitalization'],
  '25.000+ €',
  'We are a microenterprise specializing in vintage watch restoration. We need to reverse-engineer and reproduce a series of components for calibers no longer in production. We require both digital models and physical reproductions with quality finishing. We don''t have the machinery or personnel for this level of precision internally. Can you handle components down to 0.3mm?',
  'in_lavorazione'
),
(
  'Giuseppe Rossi',
  'g.rossi@rossiautomazioni.it',
  '+39 345 6789012',
  'Rossi Automazioni Srl',
  ARRAY['Prototyping, Manufacturing & Soft-Automation'],
  '2.000 - 5.000 €',
  'Siamo una PMI e ci servirebbe un piccolo sistema automatizzato per il test funzionale dei nostri attuatori lineari. Attualmente il test è manuale e richiede 5 minuti per pezzo. Vorremmo automatizzare con un banco di test con report automatico. Budget contenuto, cerchiamo una soluzione pratica e un partner che capisca le nostre esigenze.',
  'completato'
),
(
  'Elena Conti',
  'elena.conti@designstudio.com',
  '+39 331 2345678',
  'Studio Conti Design',
  ARRAY['Product Development & R&D', 'Post-Production & Quality Finishing'],
  '5.000 - 10.000 €',
  'Sono un''innovatrice indipendente e sto progettando una lampada di design con componenti in ottone lavorato. Ho il concept 3D ma non ho accesso a CNC, finiture professionali né competenze di ingegnerizzazione. Cerco un partner che mi segua dall''idea al prototipo finito con finitura finale. Qualcuno che capisca sia il lato tecnico che quello estetico.',
  'nuovo'
),
(
  'Fabio Colombo',
  'f.colombo@colomboinnovation.it',
  '+39 348 9012345',
  'Colombo Innovation Lab',
  ARRAY['Product Development & R&D', 'Prototyping, Manufacturing & Soft-Automation', 'Post-Production & Quality Finishing'],
  '10.000 - 25.000 €',
  'Siamo una microimpresa e abbiamo sviluppato un concept per un dispositivo medicale di prima classe. Abbiamo bisogno dell''intero ciclo: dalla valutazione tecnica alla produzione del primo lotto di prototipi certificati. Non abbiamo spazi, macchinari né personale per gestire lo sviluppo internamente. Vorremmo capire se potete seguire il progetto end-to-end.',
  'nuovo'
);

-- ============================================================
-- 7. SITE SETTINGS
-- ============================================================
INSERT INTO site_settings (site_name, logo_url, contact_email, phone, address, social_links, seo_title, seo_description)
VALUES (
  'OWLTECH',
  '/logo.svg',
  'info@owltech.it',
  '+39 02 1234 5678',
  'Milano, Italia',
  '{
    "instagram": "https://instagram.com/owltech.it",
    "linkedin": "https://linkedin.com/company/owltech",
    "github": "https://github.com/owltech"
  }'::jsonb,
  'OWLTECH — Partner Tech End-to-End per Sviluppo Prodotto e Prototipazione',
  'Partner tech per lo sviluppo verticale integrato end-to-end. Trasformiamo concept innovativi in prodotti finiti. Ingegneria di precisione, prototipazione, produzione e reverse engineering per PMI, startup e innovatori.'
);

-- ============================================================
-- OWLTECH — SEED CONTENUTI (Progetti, Prodotti, Blog)
-- Esegui DOPO seed_owltech.sql nel SQL Editor di Supabase
-- ============================================================

-- ============================================================
-- PROGETTI (8)
-- ============================================================
INSERT INTO progetti (title, slug, description, content, tags, year, is_featured, is_active, order_index) VALUES

(
  'Micro-Robot Modulare Educativo',
  'micro-robot-modulare-educativo',
  'Progettazione e realizzazione di un micro-robot modulare con telaio in resina tecnica, micro-motori DC e ingranaggi miniaturizzati.',
  'Progetto completo di micro-robot educativo con focus su leggerezza, modularità e facile assemblaggio. Il telaio è stampato in resina tecnica ad alta resistenza, equipaggiato con micro-motori DC, ingranaggi miniaturizzati e alloggiamento sensori IR. Pensato per l''apprendimento della robotica e l''integrazione di componenti meccanici ed elettronici su scala ridotta.',
  ARRAY['micro-robotica', 'stampa 3D', 'educazione', 'prototipazione'],
  2025, true, true, 0
),

(
  'Micro-Trasmissione a Ingranaggi di Precisione',
  'micro-trasmissione-ingranaggi-precisione',
  'Sistema meccanico con ingranaggi a modulo ridotto, alloggiamenti CNC in alluminio e tolleranze strette per ridurre il backlash.',
  'Sistema di trasmissione miniaturizzato con ingranaggi a modulo ridotto, progettato per attuatori compatti e robotica leggera. Gli alloggiamenti sono realizzati in alluminio tramite lavorazione CNC con tolleranze strette, garantendo minimo backlash e massima efficienza nella trasmissione del moto.',
  ARRAY['ingranaggi', 'CNC', 'precisione', 'robotica'],
  2025, false, true, 1
),

(
  'Riduttore Epicicloidale Miniaturizzato',
  'riduttore-epicicloidale-miniaturizzato',
  'Riduttore compatto per micro-motori con corpo in alluminio CNC e satelliti in resina tecnica o nylon.',
  'Riduttore epicicloidale progettato per applicazioni in droni, robotica e meccatronica compatta. Corpo in alluminio CNC, satelliti in resina tecnica o nylon con test di carico e durata. Rapporto di riduzione ottimizzato per coppia e velocità in spazi ridotti.',
  ARRAY['riduttore', 'epicicloidale', 'droni', 'meccatronica'],
  2025, true, true, 2
),

(
  'Sistema Lineare Micro-Asse X/Y',
  'sistema-lineare-micro-asse-xy',
  'Mini sistema di scorrimento con guide lineari compatte, carrello alleggerito e accoppiamenti calibrati.',
  'Sistema lineare miniaturizzato con guide compatte e carrello alleggerito per applicazioni laser mini, pick-and-place e ricerca. Accoppiamenti calibrati per garantire precisione di posizionamento e ripetibilità. Design modulare per integrazione in sistemi multi-asse.',
  ARRAY['asse lineare', 'automazione', 'laser', 'pick-and-place'],
  2025, false, true, 3
),

(
  'Guscio Tecnico per Elettronica Embedded',
  'guscio-tecnico-elettronica-embedded',
  'Progettazione e stampa 3D di case per PCB custom con alloggiamenti dissipatori e sistemi di fissaggio integrati.',
  'Case tecnici per elettronica embedded progettati su misura. Ogni guscio include alloggiamenti per dissipatori termici, sistemi di fissaggio integrati e aperture per connettori. Focus su ergonomia, dissipazione termica e protezione dei componenti. Realizzabili in resina tecnica o nylon tramite stampa 3D professionale.',
  ARRAY['elettronica', 'case PCB', 'stampa 3D', 'design'],
  2024, false, true, 4
),

(
  'Reverse Engineering Componente Fuori Produzione',
  'reverse-engineering-componente-fuori-produzione',
  'Digitalizzazione e ricostruzione CAD di un supporto meccanico industriale con ottimizzazione peso e miglioramento punti critici.',
  'Progetto di reverse engineering completo: dalla digitalizzazione alla ricostruzione CAD di un supporto meccanico industriale non più in produzione. Ottimizzazione del peso e miglioramento dei punti critici strutturali. Output finale: file pronto per produzione CNC o stampa 3D, con documentazione tecnica.',
  ARRAY['reverse engineering', 'CAD', 'ottimizzazione', 'industria'],
  2024, true, true, 5
),

(
  'Micro-Pinza Robotica',
  'micro-pinza-robotica',
  'Pinza compatta con meccanismo a cremagliera, struttura alleggerita, disponibile in versione stampata e CNC.',
  'Micro-pinza robotica con meccanismo a cremagliera per apertura e chiusura controllata. Struttura alleggerita disponibile in due versioni: stampa 3D per prototipazione rapida e CNC per applicazioni definitive. Applicazione in robotica educativa, da banco e automazione leggera.',
  ARRAY['pinza robotica', 'cremagliera', 'robotica', 'CNC'],
  2025, false, true, 6
),

(
  'Micro-Drone Frame Rinforzato',
  'micro-drone-frame-rinforzato',
  'Telaio per micro-drone con struttura alleggerita, studio vibrazioni e alloggiamento motori e flight controller.',
  'Telaio per micro-drone progettato con studio avanzato del rapporto rigidità/peso. Struttura alleggerita tramite ottimizzazione topologica, con analisi delle vibrazioni e alloggiamenti dedicati per motori e flight controller. Focus su prestazioni aerodinamiche e facilità di assemblaggio.',
  ARRAY['drone', 'telaio', 'alleggerimento', 'vibrazioni'],
  2025, true, true, 7
);

-- ============================================================
-- PRODOTTI SHOP (8)
-- ============================================================
INSERT INTO prodotti (title, slug, description, content, price, category, tags, is_active, is_featured, order_index) VALUES

(
  'Kit Micro Ingranaggi Tecnici',
  'kit-micro-ingranaggi-tecnici',
  'Set di ingranaggi miniaturizzati a modulo piccolo in diverse combinazioni, realizzati in polimero tecnico.',
  'Kit completo di micro-ingranaggi tecnici con modulo ridotto, disponibili in diverse combinazioni di denti e rapporti. Realizzati in polimero tecnico ad alta resistenza all''usura. Ideali per progetti di micro-robotica, meccatronica educativa e prototipazione di trasmissioni compatte.',
  29.90, 'Componenti',
  ARRAY['ingranaggi', 'micro', 'kit', 'polimero'],
  true, true, 0
),

(
  'Supporto Micro-Motore Universale',
  'supporto-micro-motore-universale',
  'Staffa regolabile per motori DC o stepper compatti con forature standard, disponibile in versione stampata e CNC.',
  'Supporto universale per micro-motori DC e stepper compatti. Staffa regolabile con forature standard per montaggio rapido. Disponibile in versione stampa 3D (prototipazione) e versione CNC alluminio (definitiva). Compatibile con i motori più comuni sul mercato.',
  14.90, 'Componenti',
  ARRAY['supporto', 'motore', 'universale', 'staffa'],
  true, false, 1
),

(
  'Micro Riduttore 3:1 / 5:1',
  'micro-riduttore-3-1-5-1',
  'Riduttore compatto pronto all''uso con corpo tecnico, albero in acciaio e coppia migliorata.',
  'Micro-riduttore epicicloidale disponibile nei rapporti 3:1 e 5:1. Corpo in materiale tecnico ad alta resistenza, albero di uscita in acciaio temprato. Coppia migliorata rispetto a soluzioni standard grazie a geometrie ottimizzate. Pronto per integrazione in progetti robotici e di automazione.',
  49.90, 'Meccanica',
  ARRAY['riduttore', 'epicicloidale', 'compatto', 'coppia'],
  true, true, 2
),

(
  'Case Universale per PCB 50x50 / 70x70',
  'case-universale-pcb',
  'Contenitore modulare con fori ventilazione, supporti integrati e personalizzabile per PCB standard.',
  'Case modulare universale per schede PCB nei formati 50x50mm e 70x70mm. Dotato di fori di ventilazione, supporti interni integrati per il fissaggio della scheda e predisposizione per connettori. Completamente personalizzabile su richiesta. Stampa 3D in materiale tecnico.',
  19.90, 'Elettronica',
  ARRAY['case', 'PCB', 'modulare', 'elettronica'],
  true, false, 3
),

(
  'Micro-Asse Lineare Compatto',
  'micro-asse-lineare-compatto',
  'Sistema lineare a corsa ridotta con base fissabile, pensato per progetti robotici e di automazione.',
  'Micro-asse lineare con corsa ridotta, ideale per integrazione in sistemi robotici compatti. Base fissabile con fori di montaggio standard. Scorrimento fluido grazie a guide calibrate. Perfetto per esperimenti, prototipi e piccoli sistemi di posizionamento.',
  39.90, 'Automazione',
  ARRAY['asse lineare', 'compatto', 'robotica', 'posizionamento'],
  true, false, 4
),

(
  'Staffe CNC di Precisione',
  'staffe-cnc-precisione',
  'Staffe universali in alluminio fresato con tolleranze strette, utilizzabili in micro-automazione.',
  'Set di staffe universali realizzate in alluminio fresato CNC con tolleranze strette. Progettate per applicazioni di micro-automazione, fissaggio componenti e strutture meccaniche di precisione. Superfici rifinite e fori calibrati per montaggio rapido.',
  34.90, 'Meccanica',
  ARRAY['staffe', 'CNC', 'alluminio', 'precisione'],
  true, false, 5
),

(
  'Kit Pinza Robotica DIY',
  'kit-pinza-robotica-diy',
  'Kit montabile completo con componenti stampati, viteria inclusa e istruzioni CAD.',
  'Kit completo per assemblare una micro-pinza robotica. Include tutti i componenti stampati in 3D, viteria di montaggio e istruzioni con file CAD scaricabili. Perfetto per makers, studenti e appassionati di robotica. Meccanismo a cremagliera per apertura/chiusura controllata.',
  24.90, 'Kit',
  ARRAY['pinza', 'robotica', 'DIY', 'kit', 'educazione'],
  true, true, 6
),

(
  'Micro-Part on Demand',
  'micro-part-on-demand',
  'Servizio custom: carica il tuo file, ricevi un preventivo rapido e il micro-componente personalizzato prodotto su misura.',
  'Servizio di produzione micro-componenti personalizzati on-demand. Carica il tuo file CAD (STEP, STL, 3MF), ricevi un preventivo rapido e il componente realizzato su misura tramite stampa 3D tecnica o lavorazione CNC. Ideale per prototipi singoli, piccole serie e componenti speciali non reperibili sul mercato.',
  0, 'Servizio',
  ARRAY['custom', 'on-demand', 'personalizzato', 'produzione'],
  true, true, 7
);

-- ============================================================
-- BLOG POSTS (10) — tutti in bozza, pubblica dall'admin
-- ============================================================
INSERT INTO blog_posts (title, slug, excerpt, content, author, tags, is_published, published_at) VALUES

(
  'Micro-robotica: materiali ideali per componenti sotto i 50 mm',
  'micro-robotica-materiali-ideali-componenti-sotto-50mm',
  'Confronto tecnico tra resine, nylon, alluminio e ABS per la realizzazione di componenti micro-robotici ad alte prestazioni.',
  'La scelta del materiale è fondamentale quando si progettano componenti sotto i 50 mm. In questo articolo confrontiamo i materiali più utilizzati nella micro-robotica moderna.

Resine tecniche: offrono la migliore risoluzione superficiale e precisione dimensionale. Ideali per prototipi estetici e componenti con geometrie complesse. Limite principale: fragilità sotto carichi dinamici ripetuti.

Nylon (PA12/PA6): eccellente resistenza meccanica e flessibilità. Perfetto per ingranaggi, cerniere e parti soggette a usura. Buona stampabilità sia in FDM che SLS.

Alluminio (6061/7075): il riferimento per componenti definitivi. Lavorazione CNC con tolleranze strette. Peso contenuto e resistenza elevata. Costo più alto ma qualità superiore.

ABS: buon compromesso tra costo e prestazioni. Adatto per prototipi funzionali e case protettivi. Meno preciso delle resine ma più resistente agli urti.

La scelta dipende sempre dall''applicazione finale: prototipo rapido, test funzionale o produzione definitiva. Noi consigliamo un approccio iterativo: partire da stampa 3D per validare, poi passare a CNC per la versione finale.',
  'Team OWLTECH',
  ARRAY['materiali', 'micro-robotica', 'stampa 3D', 'CNC'],
  false, NULL
),

(
  'Tolleranze nella micro-fresatura: cosa è realmente ottenibile?',
  'tolleranze-micro-fresatura-cosa-ottenibile',
  'Approfondimento sui limiti fisici, utensili e strategie per ottenere tolleranze strette nella fresatura di micro-componenti.',
  'Quando parliamo di micro-fresatura, le aspettative sulle tolleranze devono essere realistiche. Ecco cosa è realmente ottenibile con le tecnologie attuali.

Con utensili da 0.5-1mm di diametro, le tolleranze raggiungibili sono nell''ordine di ±0.02-0.05 mm su macchine CNC di buona qualità. Per scendere sotto i ±0.01 mm servono macchine ad alta precisione e condizioni controllate.

I fattori che influenzano la tolleranza finale includono: rigidità della macchina, qualità degli utensili, strategia di lavorazione, fissaggio del pezzo e temperatura ambiente. Anche il materiale gioca un ruolo: l''alluminio è più prevedibile dell''acciaio, mentre i polimeri possono deformarsi sotto l''utensile.

Un errore comune è specificare tolleranze troppo strette dove non necessario, aumentando i costi senza benefici reali. Il nostro approccio: definire le tolleranze critiche solo dove il funzionamento lo richiede, e lasciare tolleranze standard altrove.',
  'Team OWLTECH',
  ARRAY['fresatura', 'tolleranze', 'CNC', 'precisione'],
  false, NULL
),

(
  'Progettare ingranaggi miniaturizzati senza errori',
  'progettare-ingranaggi-miniaturizzati-senza-errori',
  'Guida pratica su backlash, modulo, resistenza e scelta dei materiali per ingranaggi a scala ridotta.',
  'Gli ingranaggi miniaturizzati richiedono un approccio progettuale diverso rispetto a quelli tradizionali. Ecco i punti chiave per evitare errori comuni.

Modulo: per ingranaggi sotto i 20mm di diametro, si lavora tipicamente con moduli da 0.3 a 0.8. Moduli più piccoli richiedono tolleranze di produzione più strette e materiali con buona resistenza all''usura.

Backlash: il gioco tra i denti è critico nelle micro-trasmissioni. Un backlash eccessivo causa imprecisione nel posizionamento, mentre un backlash troppo ridotto genera attrito e usura prematura. Il target ottimale è 0.03-0.08 mm per ingranaggi con modulo 0.5.

Materiali: per prototipi rapidi, le resine tecniche e il nylon PA12 offrono buoni risultati. Per produzione definitiva, l''alluminio anodizzato o l''acciaio bonificato garantiscono durata nel tempo.

Resistenza: non sottovalutare le forze in gioco anche su scala ridotta. Un calcolo di verifica sulla resistenza a flessione del dente è sempre consigliato, soprattutto per applicazioni con carichi ciclici.',
  'Team OWLTECH',
  ARRAY['ingranaggi', 'progettazione', 'micro-meccanica', 'backlash'],
  false, NULL
),

(
  'Stampa 3D vs CNC per micro-componenti: quando scegliere cosa?',
  'stampa-3d-vs-cnc-micro-componenti',
  'Analisi tecnica comparativa tra stampa 3D e lavorazione CNC per la produzione di componenti miniaturizzati.',
  'Stampa 3D e CNC sono tecnologie complementari, non concorrenti. La scelta dipende da fase del progetto, quantità, materiale e tolleranze richieste.

Stampa 3D — vantaggi: geometrie complesse senza costi aggiuntivi, iterazione rapida, costo per pezzo indipendente dalla complessità. Limiti: tolleranze meno strette (±0.1-0.2mm), finitura superficiale inferiore, gamma materiali limitata.

CNC — vantaggi: tolleranze strette (±0.02-0.05mm), finitura eccellente, ampia gamma di materiali (alluminio, acciaio, ottone, titanio). Limiti: costo setup, geometrie interne complesse difficili o impossibili, tempi più lunghi.

La nostra regola pratica: stampa 3D per le prime 1-3 iterazioni di prototipo, poi CNC per la versione definitiva. Per piccole serie (10-50 pezzi), valutare caso per caso in base a tolleranze e materiale richiesto.',
  'Team OWLTECH',
  ARRAY['stampa 3D', 'CNC', 'confronto', 'produzione'],
  false, NULL
),

(
  'Reverse engineering di piccoli componenti: workflow completo',
  'reverse-engineering-piccoli-componenti-workflow',
  'Dalla scansione al file CAM: il processo completo per digitalizzare e ricostruire micro-componenti.',
  'Il reverse engineering di componenti piccoli richiede un workflow preciso. Ecco il nostro processo collaudato.

Fase 1 — Acquisizione: misurazione con calibro digitale, micrometro e, quando necessario, scansione 3D o fotogrammetria. Per componenti sotto i 30mm, le misurazioni manuali sono spesso più precise della scansione.

Fase 2 — Modellazione CAD: ricostruzione parametrica del componente basata sulle misurazioni. Non si tratta di copiare una mesh, ma di ricreare un modello ingegneristico con quote, tolleranze e vincoli corretti.

Fase 3 — Ottimizzazione: è il momento di migliorare il design originale. Riduzione peso, rinforzo punti critici, semplificazione per la produzione, aggiornamento materiali.

Fase 4 — Validazione: stampa 3D del prototipo per verifica dimensionale e funzionale. Test di accoppiamento con le parti esistenti.

Fase 5 — Produzione: generazione file CAM per CNC o preparazione file per stampa 3D definitiva. Documentazione tecnica completa.',
  'Team OWLTECH',
  ARRAY['reverse engineering', 'workflow', 'CAD', 'digitalizzazione'],
  false, NULL
),

(
  'Micro-attuatori e micro-trasmissioni: principi meccanici',
  'micro-attuatori-micro-trasmissioni-principi-meccanici',
  'Applicazioni in robotica e automazione leggera: come funzionano i sistemi di trasmissione miniaturizzati.',
  'I micro-attuatori e le micro-trasmissioni sono il cuore dei sistemi robotici compatti. Comprendere i principi meccanici è fondamentale per progettarli correttamente.

Tipi di micro-attuatori: motori DC con riduttore, servo miniaturizzati, attuatori piezoelettrici, shape memory alloys (SMA). Ogni tipo ha vantaggi specifici in termini di forza, velocità, precisione e consumo.

Trasmissioni: i sistemi più comuni nella micro-meccanica includono riduttori epicicloidali (compattezza e coppia), cremagliere (movimento lineare da rotativo), viti senza fine (alto rapporto di riduzione, irreversibilità), e cinghie/pulegge (trasmissione a distanza).

Criteri di scelta: la selezione dipende da coppia richiesta, velocità, precisione di posizionamento, spazio disponibile e budget. Un errore frequente è sovradimensionare l''attuatore invece di ottimizzare la trasmissione.',
  'Team OWLTECH',
  ARRAY['attuatori', 'trasmissioni', 'robotica', 'meccanica'],
  false, NULL
),

(
  'Riduzione peso nei sistemi robotici compatti',
  'riduzione-peso-sistemi-robotici-compatti',
  'Ottimizzazione topologica e tecniche di alleggerimento per componenti meccanici miniaturizzati.',
  'In robotica compatta, ogni grammo conta. La riduzione del peso migliora velocità, autonomia energetica e prestazioni dinamiche.

Ottimizzazione topologica: software come nTopology o Altair Inspire possono ridurre il peso di un componente del 30-60% mantenendo la resistenza strutturale. Il risultato sono geometrie organiche, spesso realizzabili solo tramite stampa 3D.

Tecniche pratiche: svuotamento interno con pattern lattice, riduzione spessori dove le sollecitazioni sono basse, sostituzione materiale (acciaio → alluminio → polimero tecnico), eliminazione di features non funzionali.

Attenzione: l''alleggerimento deve sempre essere validato con analisi FEM o test fisici. Alleggerire senza verificare porta a cedimenti strutturali. Il nostro approccio è iterativo: alleggerimento progressivo con validazione ad ogni step.',
  'Team OWLTECH',
  ARRAY['alleggerimento', 'robotica', 'ottimizzazione', 'FEM'],
  false, NULL
),

(
  'Problemi comuni negli assemblaggi miniaturizzati',
  'problemi-comuni-assemblaggi-miniaturizzati',
  'Accoppiamenti, vibrazioni e deformazioni: come evitare i problemi più frequenti nella micro-meccanica.',
  'Gli assemblaggi miniaturizzati presentano sfide uniche che non si incontrano nella meccanica tradizionale.

Accoppiamenti: con tolleranze ridotte, la differenza tra un accoppiamento con gioco e uno in interferenza è di pochi centesimi di mm. Servono misurazioni precise e, spesso, adesivi strutturali per garantire il fissaggio.

Vibrazioni: componenti leggeri sono più sensibili alle vibrazioni. La frequenza di risonanza si alza con la riduzione delle masse, e può coincidere con le frequenze operative dei motori. Soluzione: smorzatori integrati e studio modale.

Deformazioni termiche: in spazi ridotti, anche piccole variazioni di temperatura causano dilatazioni significative rispetto alle tolleranze. Materiali con basso coefficiente di dilatazione (Invar, ceramica) possono essere necessari.

Assemblaggio: la manipolazione di componenti sotto i 10mm richiede pinzette di precisione, spesso microscopio o lenti di ingrandimento, e procedure standardizzate per evitare danni.',
  'Team OWLTECH',
  ARRAY['assemblaggio', 'vibrazioni', 'micro-meccanica', 'problemi'],
  false, NULL
),

(
  'Micro-meccanica per startup hardware',
  'micro-meccanica-per-startup-hardware',
  'Come passare dal prototipo al prodotto: guida pratica per startup che sviluppano hardware miniaturizzato.',
  'Le startup hardware che lavorano con componenti miniaturizzati affrontano sfide specifiche nel passaggio da prototipo a prodotto.

Fase prototipo: usare stampa 3D per iterare velocemente. Non investire in stampi o lavorazioni CNC finché il design non è validato. Costo tipico: 50-500€ per iterazione.

Fase pre-serie: una volta validato il design, realizzare 10-50 pezzi per test approfonditi. Qui si inizia a ottimizzare per la produzione: semplificare geometrie, standardizzare componenti, documentare le procedure di assemblaggio.

Fase produzione: scegliere il processo produttivo in base ai volumi. Sotto i 100 pezzi/anno: stampa 3D o CNC. 100-1000: micro-stampaggio o CNC ottimizzato. Sopra 1000: valutare stampi a iniezione miniaturizzati.

Errori da evitare: saltare la fase di pre-serie, sottovalutare i costi di assemblaggio, non prevedere tolleranze realistiche per il processo scelto. Il nostro consiglio: affidarsi a un partner tecnico che conosca l''intero ciclo, dal CAD alla produzione.',
  'Team OWLTECH',
  ARRAY['startup', 'hardware', 'produzione', 'prototipazione'],
  false, NULL
),

(
  'Il futuro della micro-robotica personalizzata',
  'futuro-micro-robotica-personalizzata',
  'Trend, custom manufacturing e produzione on-demand: dove sta andando il settore della micro-robotica.',
  'La micro-robotica personalizzata è uno dei settori in più rapida crescita. Ecco i trend che stanno ridefinendo il mercato.

Custom manufacturing: la produzione su misura sta diventando accessibile anche per piccoli volumi grazie a stampa 3D professionale e micro-CNC a controllo numerico. Non serve più ordinare migliaia di pezzi per giustificare i costi di setup.

Produzione on-demand: piattaforme digitali permettono di caricare un file CAD e ricevere il componente finito in pochi giorni. Questo modello sta democratizzando l''accesso alla micro-meccanica di precisione.

Materiali avanzati: resine caricate fibra di carbonio, nylon rinforzato vetro, ceramiche tecniche stampabili. I materiali disponibili per la micro-produzione si moltiplicano ogni anno.

AI e generative design: algoritmi di ottimizzazione topologica guidati dall''intelligenza artificiale stanno generando geometrie impossibili da concepire manualmente, con rapporti resistenza/peso senza precedenti.

Il futuro è chiaro: componenti sempre più piccoli, più precisi, più personalizzati, prodotti più velocemente e a costi più accessibili. Chi saprà combinare competenze meccaniche tradizionali con tecnologie digitali avrà un vantaggio competitivo enorme.',
  'Team OWLTECH',
  ARRAY['futuro', 'micro-robotica', 'trend', 'on-demand'],
  false, NULL
);

Benvenuto/a in G-Planet, una piattaforma di distribuzione e gestione di videogiochi.

Il nome “G-Planet” deriva da “G” come in “G-Rank” (il grado più alto dei cacciatori in Monster Hunter, simbolo di abilità e competenza), e “Planet” per indicare un pianeta interamente dedicato ai videogiocatori.

COS'È G-PLANET?

G-Planet è un client multipiattaforma disponibile per Windows, macOS, Linux, Android e iOS, che consente agli utenti di:
    -Acquistare, scaricare e aggiornare automaticamente videogiochi e software.
    -Accedere a una libreria personale di giochi.
    -Utilizzare funzionalità social, come scrivere e leggere recensioni.

COME SI USA

Per prima cosa scarica l’intera repository da GitHub. I file principali che ci interessano sono: CapStoneBackEnd.sln e La cartella CapStoneFrontEnd.

Apri il file CapStoneBackEnd.sln da Visual Studio e Vai su Strumenti > Gestione pacchetti NuGet > Console di gestione pacchetti e inserisci il comando: "dotnet restore". 
Ora hai i pacchetti di dipendenze necessari per il funzionamento dell'API. 

Apri il file appsettings.json e configura la stringa di connessione. Sostituisci i seguenti campi con i tuoi dati locali: 

"Server=NOME_DEL_TUO_PC;User Id=TUO_USERNAME_SQL;Password=LA_TUA_PASSWORD_SQL;"

Torna alla console di gestione pacchetti e lancia:
Add-Migration Initial
Update-Database

(Assicurati che SQL Server sia attivo e correttamente configurato).

Ora puoi avviare l’API cliccando sull’icona del triangolo verde con scritto "https" accanto. Lascia l'API attiva mentre utilizzi l'app.

FRONTEND (UI)

1. Vai nella cartella CapStoneFrontEnd, poi in G-Planet.

2. Apri quest’ultima cartella con Visual Studio Code.

3. Apri il terminale con: Terminal > New Terminal

4. Installa le dipendenze del progetto con: 
    -npm install

5. Avvia il progetto con: npm run dev, sempre nel terminale

Verrà mostrato un link (es. http://localhost:3000) cliccabile con Ctrl + Click: questo aprirà l'app nel browser sulla home.
Da qui puoi creare un account e iniziare a esplorare le funzionalità dell'applicazione.

⚠️ ACCOUNT AMMINISTRATORE

L’account che registri di default sarà un utente normale.
Questo non ti permetterà l'uso di funzionalità da amministratore.
Per assegnare il ruolo di amministratore agli account che creerai:

1. Apri il backend in Visual Studio.

2. Vai nella cartella Controllers > apri AccountController.cs.

3. Alla riga 83, modifica questa istruzione:
    await _userManager.AddToRoleAsync(user, "User");
    in:
    await _userManager.AddToRoleAsync(user, "Admin");

4. Riavvia l’API.

Per tornare alla modalità utente normale, ripristina "User" come nel codice originale.

FUNZIONALITÀ

Nel sito avrai diverse pagine, le principali sono: 

1. Home, dove si aprirà il sito inizialmente e mostrerà dei caroselli con le ultime uscite e determinate categorie di giochi.

2. La pagina della lista di tutti i giochi acquistabili (filtrabili per categorie, barra di ricerca e prezzo).

3. La pagina di dettaglio di ogni gioco (con relatici commenti), ed è possibile aggiungerlo alla lista desideri o il carrello.

4. Lista desideri dove potrai inserire i giochi che ti interessano.

5. Carrello dove potrai procedere all'acquisto dei giochi inseriti.

6. Libreria dove potrai visualizzare i giochi acquistati.

7. Profilo dove potrai visualizzare e modificare i dettagli del tuo profilo (avatar, nome, email, tel, etc.).

8. Gestione dell'app, dove si trovano tutte le funzionalità admin tra cui: 
    -Aggiunta, modifica ed eliminazione di un gioco.
    -Aggiunta ed eliminazione di una categoria.
    -Aggiunta e modifica di una compagnia.


Inizialmente senza account si potrà accedere solo al negozio che comprende Home, Lista giochi, e pagina dettaglio dei giochi.
Senza account non si potrà interagire con nulla quindi la prima cosa da fare è registrarsi e accedere.
Da qui tutte le funzionalità:

Nella Home page sarà possibile scorrere i giochi nel carosello e cliccarci per andare alla pagina dettagli del gioco selezionato.

Nell'intero contesto del negozio sarà presente sempre una navbar secondaria da cui si potrà:

1. Tornare alla Home.

2. Filtrare per categorie i giochi rimandando alla lista dei giochi con la categoria scelta.

3. Cercare un gioco nella barra di ricerca rimandando sempre alla lista giochi.


Nella pagina di lista giochi si potrà applicare un filtro ulteriore alla categoria e alla barra di ricerca e cioè la fascia di prezzo, tramite un barra a scorrimento sarà possibile selezionare il prezzo massimo.

Inoltre la lista sarà possibile ordinarla in base ad una filtro:

2. A-Z/Z-A ordine alfatbetico crescente o decrescente.

3. Data di uscita crescente o decrescente.

4. Prezzo più alto o prezzo più basso.


Nella pagina dettagli invece si potrà interagire solo tramite un account (altrimenti solo visualizzabile).
Qui è possibile visualizzare tutti i dettagli del gioco es. descrizione, prezzo, categorie, etc. e delle interazioni che sono il fulcro dell'app:

1. Aggiungere al carrello il gioco o aggiungerlo alla libreria direttamente nel caso sia Free to play.

2. Aggiungere alla lista desideri il gioco per memorizzarlo per quando lo si vorrà acquistare.

3. Visualizzare, aggiungere, modificare o eliminare le recensioni.

Le recensioni potranno essere sempre letti, ma l'aggiunta di esse potrà essere fatta solo se si possiede il gioco, inoltre si potrà modificare o eliminare solo le proprie recensioni (ad eccezione dell'admin che potrà gestirlie tutte).


La lista desideri invece offre la possibilità di visualizzare tutti i giohi aggiunti come anche rimuoverli. Da qui si potrà anche aggiungere al carrello (o direttamente alla libreria nel caso sia free to play) il gioco che si vuole acquistare.

Il carrello, come la lista desideri, permette la visualizzazione e rimozione, dal carrello, dei giochi presenti, sarà ovviamente presente un pulsante che indicherà il prezzo totale dei giochi aggiunti e darà la possibilità di procedere all'acquisto aggiungendo tutti i giochi alla libreria.

Dalla libreria si potranno visualizzare tutti i giochi acquistati e accedere ai loro dettagli, potrai accedere alla loro pagina di dettaglio anche da qui.

La pagina profilo è l'ultima pagina accessibile dagli utenti per visualizzare i propri dati, quest'ultimi si potranno anche modificare, in particolare:

1. Immagine profilo.

2. Nome dell'account.

3. Nome Vero.

4. Cognome.

5. Telefono.

6. Email.

Oltre questo nella pagina del profilo saranno visualizzabili dati come il numero di giochi acquistati e quali.

Per ultima la pagina di gestione, visualizzabile solo con un account admin, le funzionalità sono:

1. Aggiunta, modifica ed eliminazione di un gioco.

2. Aggiunta ed eliminazione di una categoria.

3. Aggiunta e modifica di una compagnia.

CONCLUSIONE

Ora sei pronto/a per usare G-Planet! Per qualsiasi problema o contributo, sentiti libero di aprire una issue su GitHub.
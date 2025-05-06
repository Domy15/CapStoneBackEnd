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

4. Installa le dipendenze del progetto con: npm install

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

CONCLUSIONE

Ora sei pronto/a per usare G-Planet! Per qualsiasi problema o contributo, sentiti libero di aprire una issue su GitHub.
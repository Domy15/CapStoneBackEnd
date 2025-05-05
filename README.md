Benvenuto/a nel mio progetto che è stonzialmente una piattaforma di distribuzione e gestione per videogiochi.

G-Planet è il nome dell'app, derivato da "G" come "G-Rank" di monster hunter il grado dei cacciatori più alto che sta ad indicare la competenza di chi gioca sulla mia piattaforma, "Planet" è facilmente intuibile e sta per "pianeta" ovviamente, indicando un pianeta di videogiocatori.

G-Planet è un client multipiattaforma (disponibile per Windows, macOS, Linux, Android e iOS) che consente agli utenti di:

-Acquistare, scaricare e aggiornare automaticamente videogiochi e software.
-Accedere a una libreria personale di giochi.
-Usare funzionalità social come le recensioni.

COME SI USA

Per prima cosa scaricare l'intera repository dal mio github dove all'interno si troveranno vari file, quelli che ci interessano sono il file "CapStoneBackEnd.sln" e la cartella "CapStoneFrontEnd".

Apri il file .sln da Visual Studio e cliccare in alto nell'opzione "strumenti" > "Gestione pacchetti nuget" > "Console di gestione pacchetti" e inserire il comando: "dotnet restore". 
Ora hai i pacchetti di dipendenze necessari per il funzionamento dell'API. 

Bisogna assicurarsi che in "application.json" la "ConnectionStrings" sia esatta, Per farlo bisogna cambiare la prima parte dove c'è scritto "Server=" sostituire il nome "DESKTOP-J1ROP3V" con quello del proprio pc e in "User Id=" e "Password=" sostituire con le proprie credenziali di SQL. 

Ora sempre nella console di comando delle gestione pacchetti eseguire: "Add-Migration Initial" e poi "Update-Database" (Devi assicurarti di avere SQL configurato e attivo). Ora hai il database dove poter salvare i dati con anche qualche dato iniziale. Se tutto è andato bene potrai avviare l'API cliccando in alto sull'icona del trangolo verde con scritto "https" vicino (assicurarsi che sia sempre attivo mentre si utilizza l'app).

Passiamo al front-end, la cartella che ci interessa è "CapStoneFrontEnd", al suo interno ci sarà un'altra cartella "G-Planet", aprila con Visual Studio Code.
In alto nella navigazione di Visual Studio Code cliccare su "terminal" > "new terminal", questo aprirà una console di comandi, qui dovremmo scaricare le dipendeze del pacchetto con il comando: "npm i".

Ora dovresti avere tutto quello che ti serve per poter utilizzare l'app. Per avviarla nella console di comandi dove hai scaricato le dipende digitare il comando: "pnpm run dev", uscirà un link che sarà il domini in locale della pagina cliccateci tenendo premuto "ctrl" ed ecco che dovrebbe aprirsi il browser con la pagina attiva nella home. Da lì potrete crearvi un account e navigare tra le funzioni dell'app.

!ATTENZIONE: l'account che andrete a registrare sarà un account di un normale utente, quindi le funzionalità dell'admin non saranno disponibili. Per fare in modo che l'account che andiate a creare si admin dovrete tornare al back-end su Visual Studio, andare nella cartella "controller" e cliccare su "AccountController.cs" e a riga 83 dove c'è scitto "await _userManager.AddToRoleAsync(user, "User");" cambiare "User" con "Admin" e riavviare l'API.
Così vi assicurerete che i prossimi account che andrete a creare siano amministratori e non utenti.
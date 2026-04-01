# 🦉 Owly — Trova il tuo libro!

![GitHub deployments](https://img.shields.io/github/deployments/DM-Square/owly-app/github-pages?label=GitHub%20Pages&logo=github)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.x-6E9F18?logo=vitest&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?logo=javascript&logoColor=black)
![SCSS](https://img.shields.io/badge/SCSS-style-CC6699?logo=sass&logoColor=white)
![Open Library](https://img.shields.io/badge/API-Open%20Library-blue?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyek0xMSAxN0g5VjdoMnYxMHptNCAwaC0yVjdoMnYxMHoiLz48L3N2Zz4=)
![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)

Owly è un'applicazione web che ti aiuta a scoprire libri in base al genere che preferisci. Basta inserire un genere nella barra di ricerca e Owly penserà al resto!

---

## ✨ Funzionalità

- 🔍 Ricerca libri per genere tramite un'interfaccia semplice e intuitiva
- 📖 Visualizzazione dei dettagli di ogni libro (copertina, descrizione, autori)
- ↩️ Navigazione "Indietro" per tornare alla lista dei risultati senza ricaricare
- ⚡ Feedback visivo durante il caricamento e gestione degli errori inline
- 📱 Design responsive ottimizzato per mobile e desktop
- 🖼️ Ottimizzazione automatica delle immagini in fase di build

---

## 🛠️ Stack tecnologico

| Tecnologia | Ruolo |
|---|---|
| **JavaScript (ESM)** | Logica applicativa |
| **SCSS** | Styling modulare |
| **Vite** | Bundler e dev server |
| **Vitest** | Testing |
| **Sharp** | Ottimizzazione immagini |
| **gh-pages** | Deploy su GitHub Pages |
| **Open Library API** | Sorgente dati per libri e copertine |

---

## 🏗️ Architettura

Il progetto segue un'architettura **event-driven** basata su un `EventEmitter` custom. I moduli comunicano tra loro tramite eventi, mantenendo una separazione netta tra logica di fetch, stato e rendering.

```
src/js/
├── main.js          # Entry point: DOM, listener, observer degli eventi
├── api.js           # Chiamate a Open Library API
└── eventEmitter.js  # Bus degli eventi custom
src/scss/
└── style.scss       # Stili globali (importato da main.js)
```

**Flusso principale:**

```
Input utente
    → fetchBooksBySubject()             [api.js]
    → emitter.emit("loadingStart")
    → emitter.emit("booksLoaded")       [main.js aggiorna il DOM]
    → click su un libro
    → fetchBookDetails()                [api.js]
    → emitter.emit("bookDetailsLoaded") [main.js mostra i dettagli]
```

---

## 🌐 API utilizzata

Owly si appoggia alla **[Open Library API](https://openlibrary.org/developers/api)**, gratuita e senza necessità di autenticazione.

| Endpoint | Utilizzo |
|---|---|
| `/subjects/{genere}.json` | Recupero libri per genere |
| `/works/{id}.json` | Dettagli di un singolo libro |
| `covers.openlibrary.org/b/id/{id}-M.jpg` | Copertine dei libri |

---

## 🚀 Installazione e avvio

### Prerequisiti

- [Node.js](https://nodejs.org/) (versione LTS consigliata)
- npm

### Setup

```bash
# Clona il repository
git clone https://github.com/DM-Square/owly-app.git
cd owly-app

# Installa le dipendenze
npm install
```

### Comandi disponibili

```bash
# Avvia il server di sviluppo
npm run dev

# Esegui i test
npm test

# Build di produzione (include ottimizzazione immagini)
npm run build

# Anteprima della build
npm run preview

# Deploy su GitHub Pages
npm run deploy
```

---

## 📁 Struttura del progetto

```
owly-app/
├── public/              # Asset statici (favicon, immagini logo)
├── scripts/
│   └── optimize-images.js  # Ottimizzazione immagini con Sharp
├── src/
│   ├── js/
│   │   ├── main.js         # Entry point: DOM cache, eventi, rendering
│   │   ├── api.js          # Fetch verso Open Library API
│   │   └── eventEmitter.js # Event bus custom
│   └── scss/
│       └── style.scss      # Stili dell'applicazione
├── index.html           # HTML principale
├── vite.config.js       # Configurazione Vite
└── vitest.config.js     # Configurazione Vitest
```

---

## 🌐 Demo

L'app è disponibile su GitHub Pages:
👉 [https://dm-square.github.io/owly-app](https://dm-square.github.io/owly-app)

---

## 📄 Licenza

© 2026 Owly — Tutti i diritti riservati.

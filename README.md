# 🦉 Owly — Trova il tuo libro!

![GitHub deployments](https://img.shields.io/github/deployments/DM-Square/owly-app/github-pages?label=GitHub%20Pages&logo=github)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.x-6E9F18?logo=vitest&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ESM-F7DF1E?logo=javascript&logoColor=black)
![SCSS](https://img.shields.io/badge/SCSS-style-CC6699?logo=sass&logoColor=white)
![Open Library](https://img.shields.io/badge/API-Open%20Library-blue?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyek0xMSAxN0g5VjdoMnYxMHptNCAwaC0yVjdoMnYxMHoiLz48L3N2Zz4=)
![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)
[![Live Demo](https://img.shields.io/badge/🦉%20Live%20Demo-Prova%20Owly-success?style=for-the-badge)](https://dm-square.github.io/Owly)

Owly è un'applicazione web che ti aiuta a scoprire libri in base al genere che preferisci. Basta inserire un genere nella barra di ricerca e Owly penserà al resto!

---

## 📋 Indice

- [✨ Funzionalità](#-funzionalità)
- [🛠️ Stack tecnologico](#️-stack-tecnologico)
- [🏗️ Architettura](#️-architettura)
- [🌐 API utilizzata](#-api-utilizzata)
- [🚀 Installazione e avvio](#-installazione-e-avvio)
- [📁 Struttura del progetto](#-struttura-del-progetto)
- [🧪 Testing](#-testing)
- [💻 Demo](#-demo)
- [📄 Licenza](#-licenza)

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

| Tecnologia           | Ruolo                               |
| -------------------- | ----------------------------------- |
| **JavaScript (ESM)** | Logica applicativa                  |
| **SCSS**             | Styling modulare                    |
| **Vite**             | Bundler e dev server                |
| **Vitest**           | Testing                             |
| **Sharp**            | Ottimizzazione immagini             |
| **gh-pages**         | Deploy su GitHub Pages              |
| **Open Library API** | Sorgente dati per libri e copertine |

---

## 🏗️ Architettura

Il progetto segue un'architettura **event-driven** basata su un `EventEmitter` custom. I moduli comunicano tra loro tramite eventi, mantenendo una separazione netta tra logica di fetch, stato e rendering.

```
src/js/
├── api.js                  # API pura: fetch dati, nessuna dipendenza
├── eventEmitter.js         # Singleton + Observer pattern
├── searchController.js     # Orchestrazione ricerca + async/await
├── stateManager.js         # Gestione stato app (SRP)
├── UIRenderer.js           # Rendering UI + fieldMapper
├── main.js                 # Entry point: orchestrator centrale (Facade)
└── __tests__/
    ├── api.test.js         # 4 test API pure functions
    ├── eventEmitter.test.js # 4 test Singleton + Observer
    ├── stateManager.test.js # 3 test state management
    └── UIRenderer.test.js   # 4 test rendering (edge cases)
```

**Flusso dati:**

```
Input utente (SearchController)
    ↓
fetchBooksBySubject() [API pura, restituisce dati]
    ↓
searchController emette "booksLoaded"
    ↓
main.js ascolta e coordina (setCurrentBooks, renderBooks, ecc.)
```

### Design Patterns:

- **Singleton**: EventEmitter (istanza única globale)
- **Observer**: Event-driven communication tra moduli
- **MVC**: Model (StateManager) → View (UIRenderer) ← Controller (SearchController)
- **Facade**: main.js orchestra la complessità
- **Module**: ESM modules con scope privato

---

## 🌐 API utilizzata

Owly si appoggia alla **[Open Library API](https://openlibrary.org/developers/api)**, gratuita e senza necessità di autenticazione.

| Endpoint                                 | Utilizzo                     |
| ---------------------------------------- | ---------------------------- |
| `/subjects/{genere}.json`                | Recupero libri per genere    |
| `/works/{id}.json`                       | Dettagli di un singolo libro |
| `covers.openlibrary.org/b/id/{id}-M.jpg` | Copertine dei libri          |

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
├── public/                          # Asset statici
├── scripts/
│   └── optimize-images.js           # Ottimizzazione immagini
├── src/
│   ├── js/
│   │   ├── __tests__/               # Test suite (15 test totali)
│   │   │   ├── api.test.js          # Test API pure functions
│   │   │   ├── eventEmitter.test.js # Test Singleton + Observer
│   │   │   ├── stateManager.test.js # Test state management
│   │   │   └── UIRenderer.test.js   # Test rendering
│   │   ├── api.js                   # API pura (DIP)
│   │   ├── eventEmitter.js          # Singleton pattern
│   │   ├── searchController.js      # Orchestrazione ricerca (SRP)
│   │   ├── stateManager.js          # Gestione stato (SRP)
│   │   ├── UIRenderer.js            # Rendering UI (SRP + OCP)
│   │   └── main.js                  # Entry point + orchestrator
│   └── scss/
│       ├── _mixins.scss             # Mixin CSS riutilizzabili
│       ├── _variables.scss          # Variabili di design
│       └── style.scss               # Stili principali
├── index.html                       # HTML principale
├── vite.config.js                   # Configurazione Vite
├── vitest.config.js                 # Configurazione Vitest
└── package.json                     # Dipendenze e script
```

### Statistiche codice:

- **JS modulare**: 399 linee (6 moduli)
- **Test**: 15 test automatizzati (Vitest)
- **SCSS**: Modulare con variabili e mixin

---

## 🧪 Testing

Il progetto include **15 test automatizzati** con **Vitest**:

```bash
npm test        # Esegui tutti i test
npm test:ui     # Interfaccia visuale Vitest
```

### Copertura test:

- **API** (4 test): Funzioni pure, errori, cache
- **EventEmitter** (4 test): Singleton, Observer pattern
- **StateManager** (3 test): Gestione e preservazione dello stato
- **UIRenderer** (4 test): Rendering con edge cases (dati mancanti)

---

## 💻 Demo

L'app è disponibile su GitHub Pages:
👉🏻 [https://dm-square.github.io/Owly](https://dm-square.github.io/Owly)

---

## 📄 Licenza

© 2026 Owly — Tutti i diritti riservati.

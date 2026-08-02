# Beispielprojekt: Express-API + Jest-Tests

Dies ist ein vollständiges, lauffähiges Mini-Projekt, das die Konzepte aus Modul 4 kombiniert.

## Installation

```bash
npm install
```

## Server starten

```bash
npm start
```

Der Server läuft danach unter `http://localhost:3000`. Verfügbare Routen:

- `GET /buecher` – alle Bücher abrufen
- `GET /buecher/:id` – ein Buch abrufen
- `POST /buecher` – ein neues Buch erstellen (Body: `{ "titel": "..." }`)
- `PUT /buecher/:id` – ein Buch aktualisieren
- `DELETE /buecher/:id` – ein Buch löschen

## Tests ausführen

```bash
npm test
```

Führt die Jest-Tests aus `mathe.test.js` aus, die die reinen Hilfsfunktionen aus `mathe.js` prüfen.

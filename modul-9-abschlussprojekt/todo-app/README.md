# Abschlussprojekt: Todo-API mit Authentifizierung

Ein vollständiges, lauffähiges Mini-Projekt, das die Konzepte aus Modul 4 (Express, Jest), Modul 6 (Auth, JWT, bcrypt) und Modul 7 (Supertest) zu einer echten Anwendung kombiniert.

## Architektur

```
todo-app/
├── server.js       <- Express-App: definiert alle Routen
├── auth.js         <- Passwort-Hashing, JWT-Erstellung, Auth-Middleware
├── store.js        <- reine, testbare Datenlogik (In-Memory statt echter DB)
├── store.test.js    <- Jest-Unit-Tests für store.js
└── server.test.js   <- Supertest-Integrationstests für die komplette API
```

Bewusst ohne echte Datenbank: `store.js` kapselt die Datenzugriffe hinter einfachen Funktionen. In einem echten Projekt würdest du nur diese Datei durch Mongoose-Aufrufe (siehe Modul 4.4) ersetzen – `server.js` und `auth.js` blieben unverändert.

## Installation

```bash
npm install
```

## Server starten

```bash
npm start
```

Der Server läuft danach unter `http://localhost:3000`.

## API-Übersicht

| Methode | Route | Auth nötig? | Beschreibung |
|---|---|---|---|
| `POST` | `/auth/register` | Nein | Neuen Nutzer anlegen (Body: `{ "email", "passwort" }`) |
| `POST` | `/auth/login` | Nein | Einloggen, gibt ein JWT zurück (Body: `{ "email", "passwort" }`) |
| `GET` | `/todos` | Ja | Alle eigenen Todos abrufen |
| `POST` | `/todos` | Ja | Neues Todo erstellen (Body: `{ "titel" }`) |
| `PUT` | `/todos/:id` | Ja | Eigenes Todo aktualisieren (Body: `{ "titel"?, "erledigt"? }`) |
| `DELETE` | `/todos/:id` | Ja | Eigenes Todo löschen |

Geschützte Routen erwarten den Header `Authorization: Bearer <token>` mit dem Token aus `/auth/login`.

### Beispiel-Ablauf mit curl

```bash
# 1. Registrieren
curl -X POST localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"anna@test.de","passwort":"geheim123"}'

# 2. Einloggen -> Token erhalten
curl -X POST localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"anna@test.de","passwort":"geheim123"}'

# 3. Todo erstellen (TOKEN aus Schritt 2 einsetzen)
curl -X POST localhost:3000/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"titel":"Kurs abschließen"}'
```

## Tests ausführen

```bash
npm test
```

Führt sowohl die reinen Unit-Tests (`store.test.js`) als auch die Supertest-Integrationstests der kompletten API (`server.test.js`) aus – letztere prüfen unter anderem, dass Nutzer **nicht** auf fremde Todos zugreifen können.

## Weiterführende Ideen

Wer dieses Projekt weiter ausbauen möchte: Anbindung an eine echte MongoDB statt `store.js` (Modul 4.4), Deployment auf Render/Vercel (Modul 8), ein einfaches HTML/CSS-Frontend mit `fetch` (Modul 3.2), oder eine TypeScript-Portierung (Modul 7.1).

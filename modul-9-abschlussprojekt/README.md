# Modul 9: Abschlussprojekt – Todo-API mit Authentifizierung

⬅️ [Zurück zu Modul 8](../modul-8-deployment/README.md) | 🏠 [Kursübersicht](../README.md) | 📖 [Glossar](../GLOSSAR.md)

Herzlichen Glückwunsch – du hast alle Lernmodule durchlaufen! Dieses letzte Modul enthält kein neues Theorie-Kapitel mehr, sondern **ein vollständiges, lauffähiges Projekt**, das die wichtigsten Konzepte des gesamten Kurses zu einer echten Full-Stack-Anwendung zusammenführt.

## 🎯 Lernziele

Nach diesem Modul kannst du:

- ein mehrschichtiges Node.js-Projekt lesen und nachvollziehen (Routen, Middleware, Datenlogik sauber getrennt)
- ein reales Beispiel für Registrierung, Login und tokenbasierten Routenschutz einordnen
- den Unterschied zwischen Unit-Tests (`store.test.js`) und Integrationstests (`server.test.js`) an echtem Code erkennen
- das Projekt eigenständig erweitern und dabei alle Kurs-Module (1–8) sinnvoll einsetzen

## Das Projekt: Eine Todo-API mit Nutzerkonten

Das vollständige Projekt liegt unter [`todo-app/`](./todo-app/). Es ist eine kleine, aber vollständige REST-API, bei der sich Nutzer:innen registrieren, einloggen und danach **nur ihre eigenen** Todos verwalten können – nicht die von anderen.

### Welche Module stecken drin?

| Datei | Baut auf | Was passiert dort |
|---|---|---|
| `server.js` | Modul 4.3 (Express) | Definiert alle Routen, verbindet Auth-Middleware mit den Todo-Endpunkten |
| `auth.js` | Modul 6.1–6.3 (Sicherheit) | Passwort-Hashing mit `bcryptjs`, JWT-Erstellung/-Prüfung, Auth-Middleware |
| `store.js` | Modul 4.2 (testbarer Code) | Reine Funktionen ohne Seiteneffekte – bewusst ohne echte Datenbank, um das Projekt sofort lauffähig zu halten (siehe Modul 4.4 für den Umstieg auf MongoDB) |
| `store.test.js` | Modul 4.2 (Jest) | Unit-Tests für die reine Datenlogik |
| `server.test.js` | Modul 7.3 (Supertest) | Integrationstests, die die komplette API über echte HTTP-Requests prüfen |

So siehst du an einem einzigen, überschaubaren Projekt, wie Frontend-fernes Backend-Wissen (Express), Sicherheit (Auth) und Testing ineinandergreifen – genau der Stoff aus Modul 4, 6 und 7.

### Loslegen

```bash
cd todo-app
npm install
npm test    # alle 14 Tests sollten grün sein
npm start   # Server läuft danach auf http://localhost:3000
```

Die vollständige Endpunkt-Übersicht und Beispiel-Requests findest du in [`todo-app/README.md`](./todo-app/README.md).

## 🎯 Erweiterungsaufgaben

Anders als in den vorigen Modulen gibt es hier keine Lösung zum Aufklappen – das Abschlussprojekt ist als **offene Übung** gedacht. Wähle eine oder mehrere der folgenden Erweiterungen, um dein Wissen aus dem ganzen Kurs anzuwenden:

**Einsteiger-freundlich:**
- Ergänze eine Route `GET /todos/:id`, die ein einzelnes Todo zurückgibt (404, falls es nicht existiert oder einem anderen Nutzer gehört).
- Füge dem Todo-Objekt ein Feld `erstelltAm` (Datum) hinzu und gib die Todos standardmäßig nach diesem Feld sortiert zurück.

**Mittlere Schwierigkeit:**
- Baue Input-Validierung aus (siehe Modul 6.4): Lehne z. B. zu kurze Passwörter (< 8 Zeichen) oder ungültige E-Mail-Formate bereits bei der Registrierung ab.
- Ergänze `express-rate-limit` auf der Login-Route, um Brute-Force-Versuche zu bremsen (Modul 6.4).
- Schreibe ein einfaches HTML/CSS/JS-Frontend (ohne Framework), das die API über `fetch` anspricht – Login-Formular, Todo-Liste, Checkbox zum Erledigt-Markieren (Module 2 & 3).

**Fortgeschritten:**
- Ersetze `store.js` durch eine echte MongoDB-Anbindung mit Mongoose (Modul 4.4), ohne `server.js` oder `auth.js` zu verändern.
- Portiere das Projekt nach TypeScript (Modul 7.1): Definiere Interfaces für `User` und `Todo`, typisiere Request/Response.
- Deploye die API auf Render oder Railway (Modul 8.2) und richte `JWT_SECRET` als Umgebungsvariable auf der Plattform ein statt lokal im Code.

## 🎓 Herzlichen Glückwunsch!

Du hast den kompletten Kurs durchlaufen – von `let` und `const` bis zu einer eigenen, authentifizierten REST-API mit Tests. Schau bei Unklarheiten jederzeit im [Glossar](../GLOSSAR.md) nach oder wiederhole ein Modul mit Hilfe seines Cheat-Sheets.

⬅️ [Zurück zu Modul 8](../modul-8-deployment/README.md) | 🏠 [Zurück zur Kursübersicht](../README.md) | 📖 [Glossar](../GLOSSAR.md)

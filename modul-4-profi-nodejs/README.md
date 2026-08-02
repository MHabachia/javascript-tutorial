# Modul 4: Professionalisierung & Backend (Profi / Node.js)

⬅️ [Zurück zu Modul 3](../modul-3-fortgeschritten/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 5](../modul-5-werkzeuge-workflow/README.md)

In diesem Modul verlässt du den Browser und lernst, wie du mit Node.js eigene Server, Tests und Datenbank-Anbindungen baust. Alle vollständigen, lauffähigen Projekte findest du im Ordner [`beispiele/`](./beispiele/).

## 🎯 Lernziele

Nach diesem Modul kannst du:
- ein Node.js-Projekt mit `npm` aufsetzen und Pakete/Skripte über `package.json` verwalten
- eigenen Code mit Jest testen, inklusive Fehlerfällen und asynchronem Code
- eine eigene REST-API mit Express.js bauen (Routen, Middleware, Fehlerbehandlung)
- eine Anwendung an MongoDB anbinden und CRUD-Operationen mit Mongoose durchführen

## Inhalt

- [4.1 Node.js & NPM Basics](#41-nodejs--npm-basics)
- [4.2 Testing mit Jest](#42-testing-jest)
- [4.3 Eigene APIs bauen (Express.js)](#43-eigene-apis-bauen-expressjs)
- [4.4 Datenbank-Anbindung (MongoDB/Mongoose)](#44-datenbank-anbindung-mongodbmongoose)

---

## 4.1 Node.js & NPM Basics

### Theorie

**Node.js** ist eine Laufzeitumgebung, die es erlaubt, JavaScript **außerhalb** des Browsers auszuführen – z. B. auf einem Server. Stell dir Node.js wie einen Motor vor, den man aus dem Auto (Browser) ausbaut und in ein Boot (Server) einbaut: gleicher Motor (JavaScript-Engine, "V8"), aber ein völlig neuer Einsatzort ohne DOM, dafür mit Zugriff auf das Dateisystem, Netzwerk usw.

**NPM** (Node Package Manager) ist der Werkzeugkasten-Verleih: Statt jedes Werkzeug (jede Funktionalität) selbst zu bauen, lädst du fertige **Pakete** (Libraries) herunter, die andere Entwickler bereits geschrieben haben. Jedes Paket hat eine **Version** (nach dem Schema `MAJOR.MINOR.PATCH`, "Semantic Versioning"), und das Zeichen `^` vor einer Version (z. B. `^4.19.2`) bedeutet "diese Version oder neuere Minor/Patch-Updates, aber keine neue Major-Version".

Die zentrale Datei jedes Node-Projekts ist die **`package.json`** – sozusagen der Ausweis deines Projekts: Name, Version, Abhängigkeiten (Dependencies) und Skripte (z. B. "wie starte ich die App?"). Die **`package-lock.json`** hält die exakten, tatsächlich installierten Versionen fest, damit jeder im Team dieselben Paketversionen nutzt.

Das **Module-System** erlaubt es, Code auf mehrere Dateien aufzuteilen und gezielt zu importieren/exportieren. Moderne Syntax dafür: `import`/`export` (ES-Module, aktiviert über `"type": "module"` in der `package.json`). Die ältere Node.js-Syntax `require()`/`module.exports` (CommonJS) triffst du in vielen älteren Projekten und Tutorials noch häufig an.

### Code-Beispiele

```javascript
// mathe.js - eine Datei, die Funktionen exportiert (ES-Module-Syntax)
export function addiere(a, b) {
  return a + b;
}

export function subtrahiere(a, b) {
  return a - b;
}

export const PI = 3.14159;

// Ein "default export" - pro Datei nur EINER erlaubt
export default function hauptFunktion() {
  console.log("Ich bin der Standard-Export dieser Datei.");
}
```

```javascript
// haupt.js - importiert Funktionen aus einer anderen Datei
import hauptFunktion, { addiere, subtrahiere, PI } from "./mathe.js";

console.log(addiere(5, 3));      // 8
console.log(subtrahiere(5, 3));  // 2
console.log(PI);                 // 3.14159
hauptFunktion();                 // "Ich bin der Standard-Export dieser Datei."
```

```javascript
// Zum Vergleich: die ältere CommonJS-Syntax (require/module.exports)
// mathe.cjs
function addiere(a, b) {
  return a + b;
}
module.exports = { addiere };

// haupt.cjs
const { addiere } = require("./mathe.cjs");
console.log(addiere(2, 3)); // 5
```

```javascript
// Node.js eingebaute Module nutzen (kein npm install nötig)
import fs from "node:fs/promises";
import path from "node:path";

async function schreibeUndLeseDatei() {
  const dateipfad = path.join(process.cwd(), "beispiel.txt");

  await fs.writeFile(dateipfad, "Hallo aus Node.js!");
  const inhalt = await fs.readFile(dateipfad, "utf-8");
  console.log(inhalt); // "Hallo aus Node.js!"

  await fs.unlink(dateipfad); // Datei wieder löschen (Aufräumen)
}

schreibeUndLeseDatei();
```

```json
// Beispiel für eine typische package.json
{
  "name": "mein-erstes-projekt",
  "version": "1.0.0",
  "description": "Ein Beispielprojekt für den JavaScript-Kurs",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.19.2"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  }
}
```

**Wichtige NPM-Befehle:**

```bash
npm init -y                  # erstellt eine neue package.json mit Standardwerten
npm install express          # installiert ein Paket und trägt es in dependencies ein
npm install --save-dev jest  # installiert ein Paket nur für die Entwicklung (devDependencies)
npm start                    # führt das "start"-Skript aus package.json aus
npm run test                 # führt das "test"-Skript aus package.json aus
npm list                     # zeigt installierte Pakete an
npm outdated                 # zeigt, welche Pakete veraltete Versionen haben
```

### ⚠️ Häufiger Fehler

Wird `"type": "module"` in der `package.json` gesetzt, aber trotzdem die alte `require()`-Syntax verwendet (oder umgekehrt: `import`/`export` ohne `"type": "module"`), wirft Node.js einen `SyntaxError`. Beide Modul-Systeme lassen sich nicht einfach mischen – entscheide dich pro Projekt für eines (meistens: moderne ES-Module).

### 🎯 Übungsaufgabe

Erstelle zwei Dateien: `stringHelfer.js` mit einer exportierten Funktion `grossBuchstaben(text)`, die den Text in Großbuchstaben zurückgibt, und `app.js`, die diese Funktion importiert und mit einem Beispieltext aufruft. Ergänze `stringHelfer.js` um eine zweite Funktion `kleinBuchstaben(text)` und exportiere beide.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
// stringHelfer.js
export function grossBuchstaben(text) {
  return text.toUpperCase();
}

export function kleinBuchstaben(text) {
  return text.toLowerCase();
}
```

```javascript
// app.js
import { grossBuchstaben, kleinBuchstaben } from "./stringHelfer.js";

console.log(grossBuchstaben("hallo welt")); // "HALLO WELT"
console.log(kleinBuchstaben("HALLO WELT")); // "hallo welt"
```

</details>

---

## 4.2 Testing (Jest)

### Theorie

**Tests** sind Code, der anderen Code automatisch überprüft – wie ein TÜV-Prüfer, der dein Auto (deine Funktion) regelmäßig auf Herz und Nieren checkt, statt zu hoffen, dass schon nichts kaputtgehen wird.

**Jest** ist eines der beliebtesten Test-Frameworks für JavaScript. Die Grundbausteine:

- **`describe()`**: Gruppiert zusammengehörige Tests.
- **`test()`** bzw. **`it()`**: Definiert einen einzelnen Testfall.
- **`expect()`**: Formuliert eine Erwartung, kombiniert mit einem **Matcher** wie `.toBe()` (exakte Gleichheit, für primitive Werte), `.toEqual()` (inhaltliche Gleichheit, für Objekte/Arrays), `.toThrow()` (Fehler-Prüfung), `.toContain()`, `.toBeGreaterThan()`.
- **`beforeEach()` / `afterEach()`**: Code, der vor bzw. nach **jedem** Test in einem `describe`-Block läuft – nützlich, um wiederholten Setup-Code (z. B. Testdaten zurücksetzen) zu vermeiden.

**Testbarer Code** zeichnet sich dadurch aus, dass Funktionen möglichst **pure** sind: gleiche Eingabe → immer gleiche Ausgabe, keine versteckten Seiteneffekte (z. B. kein Zugriff auf globale Variablen). Das macht sie leicht isoliert testbar. Man unterscheidet außerdem grob zwischen **Unit-Tests** (testen eine einzelne Funktion isoliert) und **Integrationstests** (testen das Zusammenspiel mehrerer Teile, z. B. eine ganze API-Route inklusive Datenbank).

### Code-Beispiele

```javascript
// sum.js - die zu testende Funktion (testbarer, "purer" Code)
export function summiere(a, b) {
  return a + b;
}
```

```javascript
// sum.test.js - die Testdatei
import { summiere } from "./sum.js";

describe("summiere()", () => {
  test("addiert zwei positive Zahlen korrekt", () => {
    expect(summiere(2, 3)).toBe(5);
  });

  test("funktioniert auch mit negativen Zahlen", () => {
    expect(summiere(-5, 5)).toBe(0);
  });

  test("addiert 0 korrekt", () => {
    expect(summiere(10, 0)).toBe(10);
  });
});
```

```javascript
// Beispiel für das Testen von Fehlerfällen und Arrays
export function teile(a, b) {
  if (b === 0) {
    throw new Error("Division durch 0 ist nicht erlaubt");
  }
  return a / b;
}

export function findeGeradeZahlen(zahlen) {
  return zahlen.filter(zahl => zahl % 2 === 0);
}
```

```javascript
import { teile, findeGeradeZahlen } from "./mathe.js";

describe("teile()", () => {
  test("teilt zwei Zahlen korrekt", () => {
    expect(teile(10, 2)).toBe(5);
  });

  test("wirft einen Fehler bei Division durch 0", () => {
    expect(() => teile(10, 0)).toThrow("Division durch 0 ist nicht erlaubt");
  });
});

describe("findeGeradeZahlen()", () => {
  test("filtert nur gerade Zahlen heraus", () => {
    expect(findeGeradeZahlen([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
  });

  test("gibt ein leeres Array zurück, wenn keine geraden Zahlen vorhanden sind", () => {
    expect(findeGeradeZahlen([1, 3, 5])).toEqual([]);
  });
});
```

```javascript
// beforeEach: wiederholten Setup-Code vermeiden
class Einkaufswagen {
  constructor() {
    this.artikel = [];
  }
  hinzufuegen(artikel) {
    this.artikel.push(artikel);
  }
  gesamtpreis() {
    return this.artikel.reduce((summe, a) => summe + a.preis, 0);
  }
}

describe("Einkaufswagen", () => {
  let wagen; // wird vor jedem Test neu erstellt

  beforeEach(() => {
    wagen = new Einkaufswagen();
  });

  test("ist anfangs leer", () => {
    expect(wagen.artikel).toEqual([]);
    expect(wagen.gesamtpreis()).toBe(0);
  });

  test("berechnet den Gesamtpreis korrekt", () => {
    wagen.hinzufuegen({ name: "Buch", preis: 15 });
    wagen.hinzufuegen({ name: "Stift", preis: 2 });
    expect(wagen.gesamtpreis()).toBe(17);
  });
});
```

```javascript
// Asynchronen Code testen
async function ladeBenutzername(id) {
  // simuliert einen API-Aufruf
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Benutzer_${id}`), 100);
  });
}

describe("ladeBenutzername()", () => {
  test("lädt den korrekten Benutzernamen", async () => {
    const name = await ladeBenutzername(42);
    expect(name).toBe("Benutzer_42");
  });
});
```

Ein vollständiges, lauffähiges Beispielprojekt mit Jest findest du unter [`beispiele/mein-erstes-projekt/`](./beispiele/mein-erstes-projekt/).

### ⚠️ Häufiger Fehler

`.toBe()` vergleicht mit `===` (strikte Referenzgleichheit bei Objekten/Arrays), `.toEqual()` vergleicht den **Inhalt**. `expect([1,2,3]).toBe([1,2,3])` schlägt fehl, obwohl die Arrays "gleich aussehen" – es sind zwei unterschiedliche Objekte im Speicher. Für Arrays und Objekte fast immer `.toEqual()` verwenden, `.toBe()` nur für primitive Werte (String, Number, Boolean).

### 🎯 Übungsaufgabe

Schreibe eine Funktion `istPalindrom(text)`, die prüft, ob ein Text vorwärts und rückwärts gelesen gleich ist (z. B. "anna"). Schreibe danach mindestens drei Jest-Tests dafür: einen für ein Palindrom, einen für ein Nicht-Palindrom, und einen der Groß-/Kleinschreibung sowie Leerzeichen berücksichtigt.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
// palindrom.js
export function istPalindrom(text) {
  const bereinigt = text.toLowerCase().replaceAll(" ", "");
  const umgedreht = bereinigt.split("").reverse().join("");
  return bereinigt === umgedreht;
}
```

```javascript
// palindrom.test.js
import { istPalindrom } from "./palindrom.js";

describe("istPalindrom()", () => {
  test("erkennt ein Palindrom", () => {
    expect(istPalindrom("anna")).toBe(true);
  });

  test("erkennt ein Nicht-Palindrom", () => {
    expect(istPalindrom("hallo")).toBe(false);
  });

  test("ignoriert Leerzeichen und Groß-/Kleinschreibung", () => {
    expect(istPalindrom("O tto")).toBe(true);
  });
});
```

</details>

---

## 4.3 Eigene APIs bauen (Express.js)

### Theorie

**Express.js** ist das populärste Web-Framework für Node.js. Es nimmt dir viel Grundarbeit ab, um einen HTTP-Server zu bauen – wie ein Baukastensystem für Server statt Ziegelstein für Ziegelstein selbst zu mauern.

Zentrale Konzepte:

- **App-Instanz**: `const app = express();` – dein Server-Objekt.
- **Route**: Eine Kombination aus HTTP-Methode und URL-Pfad, die eine bestimmte Funktion auslöst, z. B. `app.get("/benutzer", handlerFunktion)`.
- **Middleware**: Funktionen, die zwischen eingehender Anfrage und Antwort geschaltet werden (z. B. `express.json()`, um den Request-Body automatisch zu parsen). Middleware wird der Reihe nach ausgeführt und ruft `next()` auf, um zur nächsten Station weiterzugeben.
- **`req` (Request)** und **`res` (Response)**: Das Anfrage- bzw. Antwortobjekt jeder Route.
- **Route-Parameter** (`:id`) und **Query-Parameter** (`?sortierung=preis`) erlauben dynamische URLs.
- **Fehlerbehandlung**: Eine spezielle Middleware mit **vier** Parametern (`err, req, res, next`) fängt Fehler zentral ab, statt sie in jeder Route einzeln zu behandeln.

### Code-Beispiele

```javascript
// server.js - eine minimale Express-API
import express from "express";

const app = express();
app.use(express.json()); // Middleware: erlaubt das Lesen von JSON im Request-Body

// In-Memory "Datenbank" (nur zu Demonstrationszwecken)
let buecher = [
  { id: 1, titel: "Der Weg zum Meister" },
  { id: 2, titel: "JavaScript für Einsteiger" }
];

// GET: alle Bücher abrufen
app.get("/buecher", (req, res) => {
  res.json(buecher);
});

// GET: ein einzelnes Buch per ID abrufen (Route-Parameter :id)
app.get("/buecher/:id", (req, res) => {
  const buch = buecher.find(b => b.id === Number(req.params.id));

  if (!buch) {
    return res.status(404).json({ fehler: "Buch nicht gefunden" });
  }
  res.json(buch);
});

// POST: ein neues Buch erstellen
app.post("/buecher", (req, res) => {
  const neuesBuch = {
    id: buecher.length + 1,
    titel: req.body.titel
  };
  buecher.push(neuesBuch);
  res.status(201).json(neuesBuch);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
```

```javascript
// Middleware-Beispiel: einfaches Logging jeder Anfrage
import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // gibt die Kontrolle an die nächste Middleware/Route weiter
});

app.get("/", (req, res) => {
  res.send("Willkommen auf der API!");
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
```

```javascript
// Query-Parameter und Filterung
import express from "express";

const app = express();

const produkte = [
  { id: 1, name: "Laptop", kategorie: "Elektronik", preis: 999 },
  { id: 2, name: "Stuhl", kategorie: "Möbel", preis: 89 },
  { id: 3, name: "Handy", kategorie: "Elektronik", preis: 599 }
];

// Aufruf z.B.: GET /produkte?kategorie=Elektronik
app.get("/produkte", (req, res) => {
  const { kategorie } = req.query;

  const ergebnis = kategorie
    ? produkte.filter(p => p.kategorie === kategorie)
    : produkte;

  res.json(ergebnis);
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
```

```javascript
// Zentrale Fehlerbehandlung mit einer speziellen Error-Middleware
import express from "express";

const app = express();
app.use(express.json());

app.get("/riskante-route", (req, res, next) => {
  try {
    throw new Error("Etwas ist schiefgelaufen!");
  } catch (fehler) {
    next(fehler); // gibt den Fehler an die Error-Middleware weiter
  }
});

// Error-Middleware erkennt man an den VIER Parametern
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ fehler: "Interner Serverfehler", details: err.message });
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
```

Ein vollständiges, lauffähiges Express-Beispielprojekt (inkl. `PUT` und `DELETE`) findest du unter [`beispiele/mein-erstes-projekt/`](./beispiele/mein-erstes-projekt/).

### ⚠️ Häufiger Fehler

Wird `next()` in einer Middleware vergessen, "hängt" die Anfrage – der Browser wartet endlos auf eine Antwort, weil die Kette nie zur eigentlichen Route weitergeleitet wird. Jede Middleware muss entweder eine Antwort senden (`res.json(...)`, `res.send(...)`) **oder** `next()` aufrufen (nie beides gleichzeitig für dieselbe Anfrage).

### 🎯 Übungsaufgabe

Erweitere die Bücher-API oben um zwei Routen: `PUT /buecher/:id` zum Aktualisieren des Titels eines Buchs und `DELETE /buecher/:id` zum Löschen eines Buchs.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
import express from "express";

const app = express();
app.use(express.json());

let buecher = [
  { id: 1, titel: "Der Weg zum Meister" },
  { id: 2, titel: "JavaScript für Einsteiger" }
];

// PUT: ein bestehendes Buch aktualisieren
app.put("/buecher/:id", (req, res) => {
  const buch = buecher.find(b => b.id === Number(req.params.id));

  if (!buch) {
    return res.status(404).json({ fehler: "Buch nicht gefunden" });
  }

  buch.titel = req.body.titel;
  res.json(buch);
});

// DELETE: ein Buch löschen
app.delete("/buecher/:id", (req, res) => {
  const existiert = buecher.some(b => b.id === Number(req.params.id));

  if (!existiert) {
    return res.status(404).json({ fehler: "Buch nicht gefunden" });
  }

  buecher = buecher.filter(b => b.id !== Number(req.params.id));
  res.status(204).send(); // 204 = No Content, erfolgreich ohne Rückgabe
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
```

</details>

---

## 4.4 Datenbank-Anbindung (MongoDB/Mongoose)

### Theorie

Eine Datenbank speichert Daten dauerhaft (persistent) – im Gegensatz zu einem Array in deinem Server-Code, das bei jedem Neustart verloren geht. **MongoDB** ist eine NoSQL-Datenbank, die Daten als flexible, JSON-ähnliche Dokumente speichert (statt starrer Tabellen wie bei SQL-Datenbanken).

**Mongoose** ist eine Library, die die Verbindung zu MongoDB in Node.js vereinfacht. Zentrale Konzepte:

- **Schema**: Definiert die Struktur eines Dokuments (welche Felder, welche Typen, Validierungsregeln).
- **Model**: Ein "Bauplan", der auf Basis eines Schemas erstellt wird und mit dem du CRUD-Operationen durchführst.
- **CRUD**: **C**reate (erstellen), **R**ead (lesen), **U**pdate (aktualisieren), **D**elete (löschen) – die vier Grundoperationen jeder Datenanbindung.
- **Validierung**: Mongoose kann bereits vor dem Speichern prüfen, ob Daten den Regeln des Schemas entsprechen (z. B. `required`, `min`, `enum`).

Als Alternative zu MongoDB gibt es **relationale (SQL-)Datenbanken** wie **PostgreSQL**, bei denen Daten in festen Tabellen mit Beziehungen zueinander gespeichert werden (z. B. über Fremdschlüssel). Ein beliebtes Werkzeug dafür in Node.js ist **Prisma** oder **Sequelize** als ORM (Object-Relational Mapping) – das Grundprinzip von CRUD-Operationen bleibt aber sehr ähnlich zu Mongoose.

### Code-Beispiele

```javascript
// db.js - Verbindung zu MongoDB herstellen
import mongoose from "mongoose";

async function verbindeMitDatenbank() {
  try {
    await mongoose.connect("mongodb://localhost:27017/meineApp");
    console.log("Erfolgreich mit MongoDB verbunden");
  } catch (fehler) {
    console.error("Verbindungsfehler:", fehler.message);
  }
}

verbindeMitDatenbank();
```

```javascript
// buchModel.js - Schema mit Validierung und Model definieren
import mongoose from "mongoose";

const buchSchema = new mongoose.Schema({
  titel: { type: String, required: true, minlength: 1 },
  autor: { type: String, required: true },
  erschienen: { type: Number, min: 1450 },
  genre: {
    type: String,
    enum: ["Roman", "Sachbuch", "Fantasy", "Krimi"], // nur diese Werte erlaubt
    default: "Roman"
  },
  erstelltAm: { type: Date, default: Date.now }
});

const Buch = mongoose.model("Buch", buchSchema);

export default Buch;
```

```javascript
// crud-beispiele.js - grundlegende CRUD-Operationen mit Mongoose
import mongoose from "mongoose";
import Buch from "./buchModel.js";

async function fuehreCrudOperationenAus() {
  await mongoose.connect("mongodb://localhost:27017/meineApp");

  // CREATE: neues Dokument erstellen
  const neuesBuch = await Buch.create({
    titel: "Node.js im Griff",
    autor: "Erika Musterfrau",
    erschienen: 2023
  });
  console.log("Erstellt:", neuesBuch);

  // READ: alle Bücher lesen
  const alleBuecher = await Buch.find();
  console.log("Alle Bücher:", alleBuecher);

  // READ: ein Buch per Filter finden
  const gefundenesBuch = await Buch.findOne({ titel: "Node.js im Griff" });
  console.log("Gefunden:", gefundenesBuch);

  // READ: mit Bedingungen filtern und sortieren
  const buecherNach2020 = await Buch.find({ erschienen: { $gte: 2020 } }).sort({ erschienen: -1 });
  console.log("Bücher ab 2020:", buecherNach2020);

  // UPDATE: ein Dokument aktualisieren
  await Buch.updateOne(
    { titel: "Node.js im Griff" },
    { erschienen: 2024 }
  );

  // DELETE: ein Dokument löschen
  await Buch.deleteOne({ titel: "Node.js im Griff" });

  await mongoose.disconnect();
}

fuehreCrudOperationenAus();
```

```javascript
// Kombination: vollständige Express-API, die Mongoose zum Speichern nutzt
import express from "express";
import Buch from "./buchModel.js";

const app = express();
app.use(express.json());

// CREATE
app.post("/buecher", async (req, res) => {
  try {
    const neuesBuch = await Buch.create({
      titel: req.body.titel,
      autor: req.body.autor
    });
    res.status(201).json(neuesBuch);
  } catch (fehler) {
    // z.B. Validierungsfehler, wenn "titel" fehlt
    res.status(400).json({ fehler: fehler.message });
  }
});

// READ (alle)
app.get("/buecher", async (req, res) => {
  const buecher = await Buch.find();
  res.json(buecher);
});

// READ (eins per ID)
app.get("/buecher/:id", async (req, res) => {
  const buch = await Buch.findById(req.params.id);
  if (!buch) {
    return res.status(404).json({ fehler: "Buch nicht gefunden" });
  }
  res.json(buch);
});

// UPDATE
app.put("/buecher/:id", async (req, res) => {
  const aktualisiertesBuch = await Buch.findByIdAndUpdate(
    req.params.id,
    { titel: req.body.titel },
    { new: true, runValidators: true } // gibt das aktualisierte Dokument zurück
  );
  if (!aktualisiertesBuch) {
    return res.status(404).json({ fehler: "Buch nicht gefunden" });
  }
  res.json(aktualisiertesBuch);
});

// DELETE
app.delete("/buecher/:id", async (req, res) => {
  const gelöschtesBuch = await Buch.findByIdAndDelete(req.params.id);
  if (!gelöschtesBuch) {
    return res.status(404).json({ fehler: "Buch nicht gefunden" });
  }
  res.status(204).send();
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
```

> 💡 **Hinweis:** Für dieses Beispiel brauchst du eine laufende MongoDB-Instanz (lokal installiert oder z. B. über einen kostenlosen [MongoDB Atlas](https://www.mongodb.com/atlas)-Cluster in der Cloud).

### ⚠️ Häufiger Fehler

Wird `await` bei einer Mongoose-Operation (z. B. `Buch.find()`) vergessen, erhältst du statt der Daten ein noch nicht aufgelöstes Promise/`Query`-Objekt zurück – ein sehr häufiger Fehler, der zu verwirrenden `undefined`-Werten oder leeren Antworten führt. Denk außerdem daran, jede `async`-Route-Funktion in Express mit `try`/`catch` abzusichern, damit ein Datenbankfehler nicht den ganzen Server zum Absturz bringt.

### 🎯 Übungsaufgabe

Erstelle ein Mongoose-Schema `Aufgabe` mit den Feldern `titel` (String, required), `erledigt` (Boolean, Standard `false`) und `faelligAm` (Date). Schreibe eine `async`-Funktion, die eine neue Aufgabe erstellt und danach alle unerledigten Aufgaben ausgibt (`erledigt: false`). Baue zusätzlich eine kleine Express-Route `PATCH /aufgaben/:id/erledigt`, die eine Aufgabe als erledigt markiert.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
import mongoose from "mongoose";
import express from "express";

const aufgabeSchema = new mongoose.Schema({
  titel: { type: String, required: true },
  erledigt: { type: Boolean, default: false },
  faelligAm: { type: Date }
});

const Aufgabe = mongoose.model("Aufgabe", aufgabeSchema);

async function verwalteAufgaben() {
  await mongoose.connect("mongodb://localhost:27017/meineApp");

  await Aufgabe.create({
    titel: "JavaScript-Kurs abschließen",
    faelligAm: new Date("2026-12-31")
  });

  const offeneAufgaben = await Aufgabe.find({ erledigt: false });
  console.log("Offene Aufgaben:", offeneAufgaben);
}

verwalteAufgaben();

// Express-Route zum Erledigt-Markieren
const app = express();

app.patch("/aufgaben/:id/erledigt", async (req, res) => {
  const aufgabe = await Aufgabe.findByIdAndUpdate(
    req.params.id,
    { erledigt: true },
    { new: true }
  );
  if (!aufgabe) {
    return res.status(404).json({ fehler: "Aufgabe nicht gefunden" });
  }
  res.json(aufgabe);
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
```

</details>

---

## 📋 Zusammenfassung & Cheat-Sheet

| Thema | Syntax / Beispiel | Kurzbeschreibung |
|---|---|---|
| Projekt anlegen | `npm init -y` | Erstellt eine `package.json` mit Standardwerten |
| Paket installieren | `npm install express` | Trägt das Paket in `dependencies` ein |
| Nur für Entwicklung | `npm install --save-dev jest` | Trägt das Paket in `devDependencies` ein |
| Skript ausführen | `npm start` / `npm test` | Führt das jeweilige Skript aus `package.json` aus |
| Exportieren | `export function f() {}` | ES-Module-Syntax (moderner Standard) |
| Importieren | `import { f } from "./datei.js"` | Zugriff auf exportierte Funktionen |
| Test definieren | `test("...", () => { expect(x).toBe(y); })` | Ein einzelner Testfall in Jest |
| Tests gruppieren | `describe("...", () => {})` | Fasst zusammengehörige Tests zusammen |
| Vor jedem Test | `beforeEach(() => {})` | Wiederholten Setup-Code vermeiden |
| Route definieren | `app.get("/pfad", (req, res) => {})` | Express-Route für GET-Anfragen |
| Middleware nutzen | `app.use(express.json())` | Verarbeitet z. B. JSON-Request-Bodies |
| Route-Parameter | `req.params.id` | Wert aus der URL, z. B. `/buecher/:id` |
| Schema definieren | `new mongoose.Schema({...})` | Struktur & Validierung eines Dokuments |
| Dokument erstellen | `await Modell.create({...})` | CREATE-Operation mit Mongoose |
| Dokumente lesen | `await Modell.find({...})` | READ-Operation mit Filterbedingung |

---

## 🎓 Herzlichen Glückwunsch!

Du hast die vier Kern-Module durchlaufen – von `let` und `const` bis zu einer eigenen, datenbankgestützten REST-API. Wirf jetzt einen Blick in den Ordner [`beispiele/mein-erstes-projekt/`](./beispiele/mein-erstes-projekt/), um ein vollständiges, lauffähiges Projekt zu sehen, das Express und Jest kombiniert. Der Kurs geht danach mit Praxis-Werkzeugen, Sicherheit, TypeScript und Deployment weiter – bis zum großen Abschlussprojekt in Modul 9.

⬅️ [Zurück zu Modul 3](../modul-3-fortgeschritten/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 5: Werkzeuge & Workflow](../modul-5-werkzeuge-workflow/README.md)

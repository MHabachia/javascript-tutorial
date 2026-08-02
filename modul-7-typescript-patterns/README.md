# Modul 7: TypeScript & fortgeschrittene Patterns (Profi+)

⬅️ [Zurück zu Modul 6](../modul-6-sicherheit-auth/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 8](../modul-8-deployment/README.md)

In diesem Modul lernst du, wie du mit **TypeScript** robusteren, selbstdokumentierenden Code schreibst und wie bewährte **Design Patterns** dir helfen, wiederkehrende Probleme elegant zu lösen. Außerdem vertiefst du deine Testing-Skills mit `supertest` und Mocking, damit deine Express-APIs zuverlässig geprüft sind, bevor sie in Produktion gehen.

## 🎯 Lernziele

Nach diesem Modul kannst du:
- Ein TypeScript-Projekt aufsetzen und `.ts`-Dateien mit `tsc` kompilieren
- Basistypen, Interfaces, Union-Types und einfache Generics einsetzen
- Erklären, was ein Design Pattern ist und wann sich der Einsatz lohnt
- Module-, Singleton-, Factory- und Observer-Pattern in JavaScript umsetzen
- Express-Routen mit `supertest` testen, ohne einen echten Server zu starten
- Funktionen und ganze Module mit `jest.fn()` und `jest.mock()` mocken
- Den Unterschied zwischen Unit- und Integrationstests einordnen
- DOM-Code mit jsdom und Testing Library testen, ohne einen echten Browser zu starten

## Inhalt

- [7.1 TypeScript-Einstieg](#71-typescript-einstieg)
- [7.2 Design Patterns in JavaScript](#72-design-patterns-in-javascript)
- [7.3 Testing-Vertiefung: Supertest & Mocking](#73-testing-vertiefung-supertest--mocking)
- [7.4 Frontend-Testing (DOM-Code ohne Browser testen)](#74-frontend-testing-dom-code-ohne-browser-testen)

---

## 7.1 TypeScript-Einstieg

### Theorie

Stell dir vor, du schreibst eine wichtige E-Mail. JavaScript ist wie ein Texteditor ohne Rechtschreibprüfung: Du merkst einen Tippfehler erst, wenn der Empfänger sich darüber wundert – also zur Laufzeit, oft beim Kunden. **TypeScript** ist die Rechtschreibprüfung, die Fehler schon während des Schreibens rot unterringelt, lange bevor du auf "Senden" drückst. Genau das macht TypeScript mit deinem Code: Es prüft schon beim Programmieren, ob Datentypen zusammenpassen, und meldet sich, bevor der Fehler den Browser oder Server erreicht.

Wichtig zu verstehen: TypeScript ist eine **Obermenge (Superset)** von JavaScript. Jeder gültige JavaScript-Code ist automatisch auch gültiger TypeScript-Code – du lernst also keine komplett neue Sprache, sondern erweiterst JavaScript um ein **Typsystem**. Geschrieben wird TypeScript in `.ts`-Dateien, die vom **Compiler** `tsc` in normales, browser- und node-lauffähiges JavaScript **transpiliert** werden. Der Browser oder Node.js versteht kein TypeScript direkt – erst nach dem Kompilieren entsteht ausführbarer JavaScript-Code.

Um loszulegen, installierst du TypeScript als Entwicklungsabhängigkeit und erzeugst eine Konfigurationsdatei:

```bash
npm install --save-dev typescript
npx tsc --init
```

Der zweite Befehl legt eine `tsconfig.json` an, in der du festlegst, wie kompiliert werden soll (z. B. welche JavaScript-Version als Ziel dient oder wie streng die Typprüfung ist). Danach kompilierst du mit `npx tsc` alle `.ts`-Dateien im Projekt zu `.js`-Dateien.

TypeScript bringt eine Reihe von **Basistypen** mit, die du an Variablen, Parametern und Rückgabewerten annotierst. Der Typ `any` schaltet die Typprüfung für eine Stelle komplett aus – er ist praktisch, um schnell zu migrieren, sollte aber sparsam eingesetzt werden, da er genau das Sicherheitsnetz entfernt, wegen dem du TypeScript überhaupt nutzt. Für Objektformen definierst du `interface`s oder `type`-Aliasse; beide beschreiben, welche Eigenschaften ein Objekt haben muss und welche optional (`?`) sind. **Union-Types** erlauben es, dass ein Wert einer von mehreren Typen sein darf. Und **Generics** machen Funktionen und Typen wiederverwendbar, ohne die Typsicherheit zu verlieren – ähnlich wie eine Schublade, die du für Socken, Werkzeug oder Kabel nutzen kannst, ohne dass sie ihre Form ändert, aber du trotzdem immer weißt, was gerade drinsteckt.

Ein großer Komfortfaktor ist die **Type Inference** (Typinferenz): TypeScript errät in vielen Fällen den Typ selbst, ohne dass du ihn explizit hinschreiben musst – zum Beispiel weiß der Compiler bei `const alter = 30;` automatisch, dass `alter` vom Typ `number` ist.

### Code-Beispiele

```typescript
// Basistypen annotieren
let name: string = "Anna";
let alter: number = 29;
let istAktiv: boolean = true;
let hobbies: string[] = ["Klettern", "Lesen"];
let bewertungen: Array<number> = [4, 5, 3];

console.log(`${name} ist ${alter} Jahre alt.`);
// "Anna ist 29 Jahre alt."
```

```typescript
// any vermeiden: ohne Typprüfung sind Fehler erst zur Laufzeit sichtbar
let unsicher: any = "Text";
unsicher = 42; // kein Fehler, aber gefährlich – TypeScript prüft hier nichts mehr

// Besser: ein konkreter Typ oder ein Union-Type
let sicher: string | number = "Text";
sicher = 42; // erlaubt, weil number Teil des Union-Types ist
// sicher = true; // Fehler: boolean ist nicht im Union-Type enthalten
```

```typescript
// Funktionstypen: Parameter- und Rückgabetyp annotieren
function addieren(a: number, b: number): number {
  return a + b;
}

console.log(addieren(3, 4)); // 7
// addieren("3", 4); // Compiler-Fehler: string ist nicht number
```

```typescript
// interface für Objektformen, optionale Eigenschaft mit ?
interface Nutzer {
  id: number;
  name: string;
  email?: string; // optional
}

function begruessen(nutzer: Nutzer): string {
  return `Hallo, ${nutzer.name}!`;
}

const nutzer1: Nutzer = { id: 1, name: "Max" };
console.log(begruessen(nutzer1)); // "Hallo, Max!"

// type-Alias als Alternative zu interface (für Objekte oft austauschbar,
// type kann zusätzlich auch Union-Types und Primitive benennen)
type ID = number | string;
```

```typescript
// Generics: eine Funktion, die für beliebige Array-Typen funktioniert
function ersteElement<T>(arr: T[]): T {
  return arr[0];
}

console.log(ersteElement<number>([10, 20, 30])); // 10
console.log(ersteElement<string>(["a", "b", "c"])); // "a"
// Dank Type Inference muss der Typ hier gar nicht angegeben werden:
console.log(ersteElement([true, false])); // true
```

### ⚠️ Häufiger Fehler

Viele Einsteiger nutzen `any` als Notlösung, sobald der Compiler meckert, statt den eigentlichen Typ herauszufinden. Damit verliert TypeScript an genau der Stelle seine gesamte Schutzwirkung, und Fehler tauchen wieder erst zur Laufzeit auf – der eigentliche Vorteil von TypeScript geht verloren. Nutze `any` nur bewusst und möglichst selten, im Zweifel lieber einen präzisen Union-Type oder `unknown` mit anschließender Typprüfung.

### 🎯 Übungsaufgabe

Definiere ein `interface Produkt` mit `id: number`, `name: string`, `preis: number` und einer optionalen Eigenschaft `rabatt?: number`. Schreibe danach eine Funktion `endpreis(produkt: Produkt): number`, die den Preis abzüglich Rabatt (falls vorhanden) zurückgibt.

<details>
<summary>💡 Lösung anzeigen</summary>

```typescript
interface Produkt {
  id: number;
  name: string;
  preis: number;
  rabatt?: number;
}

function endpreis(produkt: Produkt): number {
  if (produkt.rabatt) {
    return produkt.preis - produkt.rabatt;
  }
  return produkt.preis;
}

const buch: Produkt = { id: 1, name: "TypeScript-Buch", preis: 30, rabatt: 5 };
console.log(endpreis(buch)); // 25
```

</details>

---

## 7.2 Design Patterns in JavaScript

### Theorie

Ein **Design Pattern** (Entwurfsmuster) ist keine fertige Code-Bibliothek, sondern eine bewährte, wiederverwendbare Lösungsvorlage für ein wiederkehrendes Strukturproblem. Stell dir einen Architekten vor, der nicht bei jedem Haus das Konzept einer Treppe neu erfindet, sondern auf bewährte Bauplan-Vorlagen zurückgreift, die sich in tausenden Gebäuden bewährt haben. Genauso musst du in der Softwareentwicklung nicht jedes Mal das Rad neu erfinden – Design Patterns geben dir eine gemeinsame Sprache und geprüfte Lösungsansätze für Probleme, die in der Praxis ständig wiederkehren.

Das **Module Pattern** kapselt zusammengehörige Daten und Funktionen und verbirgt Implementierungsdetails vor der Außenwelt – nur ausgewählte Dinge werden "exportiert". Früher wurde das in JavaScript oft mit **Closures** (aus Modul 2) nachgebaut: Eine Funktion gibt ein Objekt mit ausgewählten Methoden zurück, während interne Variablen durch den Funktionsscope verborgen bleiben. Heute übernehmen ES-Module (`import`/`export`) diese Aufgabe meist von Haus aus, das Grundprinzip – gezielt kapseln statt alles global zu machen – bleibt aber dasselbe.

Das **Singleton Pattern** stellt sicher, dass von einer Klasse zur Laufzeit garantiert nur genau eine Instanz existiert, auf die alle Programmteile zugreifen. Das ist sinnvoll für Dinge, die es im ganzen System nur einmal geben soll, etwa eine gemeinsame Datenbankverbindung oder ein zentrales Konfigurationsobjekt – so wie es in einem Unternehmen nur eine offizielle Kasse gibt, nicht für jede Abteilung eine eigene.

Das **Factory Pattern** verlagert die Objekterzeugung in eine eigene Funktion, die abhängig von der Eingabe unterschiedliche, aber verwandte Objekte erzeugt. Statt überall im Code verstreute `if`-Abfragen mit `new` zu haben, fragst du die "Fabrik" nach einem passenden Objekt und musst dich um die Entscheidungslogik nicht mehr selbst kümmern.

Das **Observer Pattern** beschreibt eine Beziehung, bei der ein Objekt (das **Subject**) mehrere "Abonnenten" (**Observer**) über Änderungen informiert, ohne diese im Detail zu kennen. Das kennst du bereits: Ein Newsletter-Verteiler informiert alle Abonnenten über ein neues Update, ohne zu wissen, was jeder Einzelne damit macht. Genau dieses Prinzip steckt hinter den Event-Listenern aus Modul 2.4 (`addEventListener`) – der Button "kennt" seine Klick-Handler nicht im Detail, er benachrichtigt sie nur, wenn das Ereignis eintritt.

### Code-Beispiele

```javascript
// Module Pattern klassisch mit Closures: interner Zustand ist gekapselt
function erstelleZaehler() {
  let zaehlerstand = 0; // privat, von außen nicht direkt erreichbar

  return {
    erhoehen() {
      zaehlerstand++;
      return zaehlerstand;
    },
    aktuellerStand() {
      return zaehlerstand;
    },
  };
}

const zaehler = erstelleZaehler();
zaehler.erhoehen();
zaehler.erhoehen();
console.log(zaehler.aktuellerStand()); // 2
// console.log(zaehler.zaehlerstand); // undefined – nicht erreichbar
```

```javascript
// Singleton Pattern: garantiert genau eine Instanz
class Konfiguration {
  static #instanz;

  constructor() {
    if (Konfiguration.#instanz) {
      return Konfiguration.#instanz;
    }
    this.einstellungen = { sprache: "de", theme: "dunkel" };
    Konfiguration.#instanz = this;
  }
}

const konfigA = new Konfiguration();
const konfigB = new Konfiguration();
console.log(konfigA === konfigB); // true – beide zeigen auf dieselbe Instanz
```

```javascript
// Factory Pattern: eine Funktion entscheidet, welches Objekt erzeugt wird
function erstelleBenutzer(typ, name) {
  if (typ === "admin") {
    return { name, rechte: ["lesen", "schreiben", "loeschen"] };
  }
  if (typ === "gast") {
    return { name, rechte: ["lesen"] };
  }
  return { name, rechte: [] };
}

const admin = erstelleBenutzer("admin", "Sara");
console.log(admin); // { name: "Sara", rechte: ["lesen", "schreiben", "loeschen"] }
```

```javascript
// Observer Pattern: ein Subject benachrichtigt mehrere Abonnenten
class Newsletter {
  #abonnenten = [];

  abonnieren(callback) {
    this.#abonnenten.push(callback);
  }

  veroeffentlichen(neuigkeit) {
    this.#abonnenten.forEach((callback) => callback(neuigkeit));
  }
}

const newsletter = new Newsletter();
newsletter.abonnieren((n) => console.log(`Leser 1 liest: ${n}`));
newsletter.abonnieren((n) => console.log(`Leser 2 liest: ${n}`));

newsletter.veroeffentlichen("Modul 7 ist online!");
// "Leser 1 liest: Modul 7 ist online!"
// "Leser 2 liest: Modul 7 ist online!"
```

```javascript
// Vergleich: dasselbe Prinzip kennst du bereits von DOM-Events (Modul 2.4)
const button = document.querySelector("#speichern");
button.addEventListener("click", () => console.log("Beobachter 1 reagiert"));
button.addEventListener("click", () => console.log("Beobachter 2 reagiert"));
// Der Button ist hier das Subject, die Callbacks sind die Observer
```

### ⚠️ Häufiger Fehler

Ein Pattern zu erzwingen, obwohl das Problem es gar nicht braucht, ist ein klassischer Anfängerfehler. Ein Singleton für jede kleine Hilfsfunktion oder eine Factory für ein einziges, immer gleiches Objekt fügt nur unnötige Komplexität hinzu. Design Patterns lösen konkrete, wiederkehrende Probleme – setze sie ein, wenn das Problem tatsächlich vorliegt, nicht, weil es "professioneller" aussieht.

### 🎯 Übungsaufgabe

Implementiere eine Klasse `WetterStation` nach dem Observer Pattern. Sie soll eine Methode `abonnieren(callback)` haben und eine Methode `temperaturMelden(grad)`, die alle Abonnenten mit der neuen Temperatur benachrichtigt.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
class WetterStation {
  #abonnenten = [];

  abonnieren(callback) {
    this.#abonnenten.push(callback);
  }

  temperaturMelden(grad) {
    this.#abonnenten.forEach((callback) => callback(grad));
  }
}

const station = new WetterStation();
station.abonnieren((grad) => console.log(`App zeigt: ${grad}°C`));
station.abonnieren((grad) => console.log(`Display zeigt: ${grad}°C`));

station.temperaturMelden(21);
// "App zeigt: 21°C"
// "Display zeigt: 21°C"
```

</details>

---

## 7.3 Testing-Vertiefung: Supertest & Mocking

### Theorie

In Modul 4.2 hast du bereits mit **Jest** einzelne Funktionen getestet. Für Express-APIs reicht das aber nicht ganz aus, denn du willst auch prüfen, ob eine Route den richtigen Statuscode liefert, ob der Response-Body stimmt oder ob eine POST-Anfrage Daten korrekt verarbeitet. Genau dafür gibt es `supertest`: Es simuliert HTTP-Anfragen direkt gegen deine Express-`app`, ohne dass dafür wirklich ein Server auf einem Port lauschen muss. Du übergibst supertest einfach dein `app`-Objekt, und es kümmert sich intern um Verbindung, Anfrage und Antwort.

Manchmal willst du aber nicht die komplette Kette aus Route, Middleware und Datenbank testen, sondern nur eine einzelne Funktion isoliert prüfen – zum Beispiel, ob eine Funktion mit den richtigen Argumenten aufgerufen wurde, ohne dass eine echte Datenbankabfrage oder ein echter Netzwerk-Request dahinter ausgeführt wird. Dafür gibt es **Mocking**. Ein **Mock** ist wie eine Theater-Requisite: Eine Requisiten-Waffe sieht aus wie eine echte Waffe, funktioniert im Test (auf der Bühne) aber ohne echte Munition. Genauso sieht eine gemockte Funktion für den restlichen Code wie die echte Funktion aus, führt aber keine echte Aktion aus – sie merkt sich nur, wie sie aufgerufen wurde.

Mit `jest.fn()` erstellst du eine solche "Fake-Funktion". Sie zeichnet auf, wie oft und mit welchen Argumenten sie aufgerufen wurde, sodass du das im Test mit `toHaveBeenCalledWith` überprüfen kannst. Willst du nicht nur eine einzelne Funktion, sondern ein komplettes Modul ersetzen – etwa ein Modul, das eine externe API anspricht – nutzt du `jest.mock()`. Damit ersetzt Jest automatisch alle Exporte dieses Moduls durch Mock-Funktionen, sodass dein Test unabhängig von echtem Netzwerkzugriff, externen Diensten oder Datenbanken läuft.

Das führt zur wichtigen Unterscheidung zwischen zwei Testarten: Ein **Unit-Test** prüft eine einzelne Einheit (eine Funktion, ein Modul) vollständig isoliert, wobei alle Abhängigkeiten gemockt werden. Ein **Integrationstest** hingegen prüft das Zusammenspiel mehrerer echter Teile miteinander – zum Beispiel eine Route, die tatsächlich mit einer (Test-)Datenbank spricht. Mit `supertest` schreibst du meist Integrationstests, mit `jest.fn()`/`jest.mock()` eher Unit-Tests. Beide Testarten ergänzen sich: Unit-Tests sind schnell und finden Logikfehler früh, Integrationstests fangen Probleme ab, die erst im Zusammenspiel der Teile entstehen.

### Code-Beispiele

```javascript
// Installation: npm install --save-dev supertest

// app.js – eine einfache Express-App mit GET- und POST-Route
const express = require("express");
const app = express();
app.use(express.json());

let aufgaben = [{ id: 1, titel: "TypeScript lernen" }];

app.get("/aufgaben", (req, res) => {
  res.status(200).json(aufgaben);
});

app.post("/aufgaben", (req, res) => {
  const neueAufgabe = { id: aufgaben.length + 1, titel: req.body.titel };
  aufgaben.push(neueAufgabe);
  res.status(201).json(neueAufgabe);
});

module.exports = app;
```

```javascript
// app.test.js – Integrationstest der Routen mit supertest
const request = require("supertest");
const app = require("./app");

describe("Aufgaben-API", () => {
  test("GET /aufgaben liefert Statuscode 200 und ein Array", async () => {
    const antwort = await request(app).get("/aufgaben");
    expect(antwort.status).toBe(200);
    expect(Array.isArray(antwort.body)).toBe(true);
  });

  test("POST /aufgaben legt eine neue Aufgabe an", async () => {
    const antwort = await request(app)
      .post("/aufgaben")
      .send({ titel: "Design Patterns üben" });

    expect(antwort.status).toBe(201);
    expect(antwort.body.titel).toBe("Design Patterns üben");
  });
});
// PASS  app.test.js
// Aufgaben-API
//   ✓ GET /aufgaben liefert Statuscode 200 und ein Array
//   ✓ POST /aufgaben legt eine neue Aufgabe an
```

```javascript
// jest.fn(): eine Fake-Funktion erstellen und ihren Aufruf prüfen
test("Callback wird mit korrektem Argument aufgerufen", () => {
  const mockCallback = jest.fn();

  function verarbeiteZahl(zahl, callback) {
    callback(zahl * 2);
  }

  verarbeiteZahl(5, mockCallback);

  expect(mockCallback).toHaveBeenCalledTimes(1);
  expect(mockCallback).toHaveBeenCalledWith(10);
});
// PASS – Callback wurde genau einmal mit dem Wert 10 aufgerufen
```

```javascript
// jest.mock(): ein ganzes Modul ersetzen, um einen echten API-Call zu vermeiden

// wetterApi.js
async function holeTemperatur(stadt) {
  const antwort = await fetch(`https://api.wetter.example/${stadt}`);
  const daten = await antwort.json();
  return daten.temperatur;
}
module.exports = { holeTemperatur };

// wetterService.js
const { holeTemperatur } = require("./wetterApi");

async function empfehlungGeben(stadt) {
  const temperatur = await holeTemperatur(stadt);
  return temperatur > 25 ? "Badesee!" : "Lieber drinnen bleiben.";
}
module.exports = { empfehlungGeben };
```

```javascript
// wetterService.test.js – Unit-Test mit gemocktem Modul, kein echter Netzwerk-Call
jest.mock("./wetterApi");
const { holeTemperatur } = require("./wetterApi");
const { empfehlungGeben } = require("./wetterService");

test("empfiehlt Badesee bei hoher Temperatur", async () => {
  holeTemperatur.mockResolvedValue(30); // simuliert die Rückgabe der echten API

  const empfehlung = await empfehlungGeben("Berlin");

  expect(empfehlung).toBe("Badesee!");
  expect(holeTemperatur).toHaveBeenCalledWith("Berlin");
});
// PASS – kein echter Netzwerkzugriff nötig, Ergebnis ist trotzdem vorhersagbar
```

### ⚠️ Häufiger Fehler

Ein weit verbreiteter Fehler ist, `jest.mock()` einzusetzen, aber danach zu vergessen, dass der ursprüngliche Modul-Zustand zwischen Tests erhalten bleibt, wenn man `mockClear()` oder `mockReset()` nicht nutzt. Dadurch "erinnert" sich ein Mock aus einem vorherigen Test noch an alte Aufrufe oder Rückgabewerte, und nachfolgende Tests liefern unerwartete, schwer nachvollziehbare Ergebnisse. Setze in einem `beforeEach`-Block regelmäßig `jest.clearAllMocks()` ein, um mit einem sauberen Zustand in jeden Test zu starten.

### 🎯 Übungsaufgabe

Schreibe für die folgende Express-Route einen Integrationstest mit `supertest`, der prüft, dass bei einer GET-Anfrage auf `/status` der Statuscode 200 und der Body `{ status: "ok" }` zurückgegeben wird.

```javascript
app.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});
```

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
const request = require("supertest");
const app = require("./app");

test("GET /status liefert Status ok", async () => {
  const antwort = await request(app).get("/status");

  expect(antwort.status).toBe(200);
  expect(antwort.body).toEqual({ status: "ok" });
});
```

</details>

---

## 7.4 Frontend-Testing (DOM-Code ohne Browser testen)

### Theorie

In Modul 2.3 hast du gelernt, wie man Elemente mit `querySelector` auswählt und den DOM-Baum manipuliert, und in Modul 2.4 hast du mit `addEventListener` auf Klicks und andere Ereignisse reagiert. Was in diesen Modulen bisher komplett gefehlt hat: ein Test dafür. Genau diese Lücke schließt dieses Kapitel – du lernst, wie du Code, der das DOM verändert, genauso zuverlässig testest wie eine reine Rechenfunktion.

Das naheliegende Vorgehen wäre, für jeden Testlauf einen echten Browser zu starten, die Seite zu laden und dann per Skript draufzuklicken. Das funktioniert grundsätzlich, ist aber langsam: Ein echter Browser muss hochfahren, eine Rendering-Engine initialisieren und jede Menge Ressourcen laden, nur um am Ende einen einzigen Button-Klick zu prüfen. Bei hunderten Tests summiert sich das schnell zu inakzeptablen Wartezeiten.

Die Lösung heißt **jsdom** – eine reine JavaScript-Implementierung des DOM, die komplett ohne echten Browser läuft. Stell dir jsdom wie einen Flugsimulator vor: Er verhält sich in den entscheidenden Punkten wie ein echtes Flugzeug – Steuerknüppel, Instrumente, Reaktionen auf Eingaben funktionieren realistisch –, ist aber viel schneller, günstiger und risikoloser zu betreiben als ein echter Flug. Genauso bildet jsdom `document`, `window`, Elemente, Events und Vererbungshierarchien nach, ohne dass irgendwo ein sichtbares Browserfenster geöffnet wird. Für die allermeisten Tests reicht das völlig aus, weil du in der Regel nicht das exakte Pixel-Rendering prüfen willst, sondern ob dein Code die richtigen Elemente erzeugt, aktualisiert und auf Events reagiert.

Jest bringt diese Fähigkeit von Haus aus mit: In der Jest-Konfiguration legst du mit `testEnvironment: "jsdom"` fest, dass Tests nicht in einer reinen Node.js-Umgebung laufen (in der es kein `document` gibt), sondern in einer simulierten Browser-Umgebung. Bei neueren Jest-Versionen (ab Jest 28) ist das jsdom-Paket nicht mehr automatisch im Kernpaket enthalten – hier musst du es zusätzlich installieren:

```bash
npm install --save-dev jest-environment-jsdom
```

Damit hast du das Fundament – ein simuliertes DOM. Um darin komfortabel Elemente zu finden, gibt es zusätzlich **@testing-library/dom**. Der entscheidende Unterschied zu `querySelector` aus Modul 2.3: Testing Library wählt Elemente nicht über CSS-Selektoren oder IDs aus, sondern so, wie ein Nutzer die Seite wahrnimmt – über sichtbaren Text (`getByText`), über die Rolle eines Elements (`getByRole`, z. B. "button") oder über ein Label. Das macht Tests deutlich robuster: Wenn du später aus stylistischen Gründen eine `id="zaehlerButton"` in `id="counter-btn"` umbenennst oder eine zusätzliche CSS-Klasse hinzufügst, bricht ein Test, der über `getByText` sucht, nicht – ein Test mit `document.querySelector("#zaehlerButton")` dagegen schon, obwohl sich am eigentlichen Verhalten der Seite nichts geändert hat. Testing Library zwingt dich damit dazu, aus Nutzerperspektive zu testen statt aus Implementierungsperspektive.

Zum Simulieren von Interaktionen reicht bei einfachen Fällen oft schon `element.click()` – eine native DOM-Methode, die jsdom vollständig unterstützt. @testing-library/dom bringt zusätzlich `fireEvent` mit, das feingranularer arbeitet und auch komplexere Events (Tastatureingaben, Formularänderungen) auslösen kann. Wichtig ist außerdem, den DOM-Zustand zwischen Tests zurückzusetzen: Mit `document.body.innerHTML = ""` in einem `beforeEach`-Block sorgst du dafür, dass jeder Test mit einem leeren, sauberen DOM startet und sich Tests nicht gegenseitig durch übrig gebliebene Elemente beeinflussen.

### Code-Beispiele

```javascript
// counter.js – rendert einen Zähler-Button ins DOM (vgl. Modul 2.4)
function erstelleZaehlerButton(container) {
  container.innerHTML = `<button id="zaehlerButton">Klicks: 0</button>`;

  let stand = 0;
  const button = container.querySelector("#zaehlerButton");

  button.addEventListener("click", () => {
    stand++;
    button.textContent = `Klicks: ${stand}`;
  });
}

module.exports = { erstelleZaehlerButton };
```

```javascript
// jest.config.js – jsdom als Testumgebung festlegen
module.exports = {
  testEnvironment: "jsdom",
};

// Ab Jest 28 ggf. zusätzlich installieren:
// npm install --save-dev jest-environment-jsdom
```

```javascript
// counter.test.js – Test mit document.body.innerHTML und element.click()
const { erstelleZaehlerButton } = require("./counter");

beforeEach(() => {
  document.body.innerHTML = ""; // sauberer Start für jeden Test
});

test("Button zeigt nach einem Klick 'Klicks: 1' an", () => {
  erstelleZaehlerButton(document.body);
  const button = document.querySelector("#zaehlerButton");

  button.click(); // simulierter Klick, ganz ohne echten Browser

  expect(button.textContent).toBe("Klicks: 1");
});
```

```javascript
// counter.testing-library.test.js – Auswahl über sichtbaren Text statt CSS-Selektor
const { getByText, fireEvent } = require("@testing-library/dom");
const { erstelleZaehlerButton } = require("./counter");

beforeEach(() => {
  document.body.innerHTML = "";
});

test("Zähler steht nach zwei Klicks auf 'Klicks: 2'", () => {
  erstelleZaehlerButton(document.body);
  const button = getByText(document.body, "Klicks: 0");

  fireEvent.click(button);
  fireEvent.click(button);

  expect(button.textContent).toBe("Klicks: 2");
});
```

```javascript
// mehrere Tests im selben Suite-Block – beforeEach verhindert gegenseitige Beeinflussung
describe("Zähler-Button", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    erstelleZaehlerButton(document.body);
  });

  test("startet bei 'Klicks: 0'", () => {
    expect(document.querySelector("#zaehlerButton").textContent).toBe(
      "Klicks: 0"
    );
  });

  test("reagiert unabhängig vom vorherigen Test wieder ab 0", () => {
    const button = document.querySelector("#zaehlerButton");
    button.click();
    expect(button.textContent).toBe("Klicks: 1"); // nicht "Klicks: 2"
  });
});
```

### ⚠️ Häufiger Fehler

Wird der `beforeEach`-Block mit `document.body.innerHTML = ""` vergessen, bleiben Elemente aus vorherigen Tests im simulierten DOM erhalten. Das führt zu Effekten wie doppelten Elementen mit derselben ID, veralteten Zählerständen aus dem letzten Test oder `getByText`-Aufrufen, die plötzlich mehrere passende Treffer finden und deshalb einen Fehler werfen, statt genau ein Element zu liefern. Da jsdom den DOM-Zustand nicht automatisch zwischen Tests zurücksetzt, musst du das – anders als bei einem frisch geladenen Browser-Tab – selbst übernehmen.

### 🎯 Übungsaufgabe

Schreibe eine Funktion `erstelleThemaToggle(container)`, die einen Button mit dem Anfangstext `"Modus: Hell"` in `container` rendert. Bei jedem Klick soll der Button-Text zwischen `"Modus: Hell"` und `"Modus: Dunkel"` wechseln. Schreibe anschließend einen Test mit `@testing-library/dom`, der den Button über `getByText` findet, zweimal klickt und prüft, dass der Text danach wieder `"Modus: Hell"` lautet.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
// themaToggle.js
function erstelleThemaToggle(container) {
  container.innerHTML = `<button id="themaButton">Modus: Hell</button>`;

  const button = container.querySelector("#themaButton");

  button.addEventListener("click", () => {
    button.textContent =
      button.textContent === "Modus: Hell" ? "Modus: Dunkel" : "Modus: Hell";
  });
}

module.exports = { erstelleThemaToggle };
```

```javascript
// themaToggle.test.js
const { getByText, fireEvent } = require("@testing-library/dom");
const { erstelleThemaToggle } = require("./themaToggle");

beforeEach(() => {
  document.body.innerHTML = "";
});

test("nach zwei Klicks ist wieder 'Modus: Hell' aktiv", () => {
  erstelleThemaToggle(document.body);
  const button = getByText(document.body, "Modus: Hell");

  fireEvent.click(button); // -> "Modus: Dunkel"
  fireEvent.click(button); // -> "Modus: Hell"

  expect(button.textContent).toBe("Modus: Hell");
});
```

</details>

---

## 📋 Zusammenfassung & Cheat-Sheet

| Konzept | Syntax / Beispiel | Kurzbeschreibung |
|---|---|---|
| Typ-Annotation | `let x: number = 5;` | Legt den erlaubten Typ einer Variable fest |
| Funktionstyp | `function f(a: number): string` | Parameter- und Rückgabetyp annotieren |
| Interface | `interface Nutzer { name: string; email?: string; }` | Beschreibt die Form eines Objekts, `?` = optional |
| Type-Alias | `type ID = number \| string;` | Benennt einen (auch zusammengesetzten) Typ |
| Union-Type | `string \| number` | Wert darf einer von mehreren Typen sein |
| Generics | `function f<T>(arr: T[]): T` | Wiederverwendbare Funktion für beliebige Typen |
| `any` vermeiden | `let x: any` | Schaltet Typprüfung aus – nur gezielt einsetzen |
| Compiler | `npx tsc` | Kompiliert `.ts` zu `.js` |
| Module Pattern | Closure oder `import`/`export` | Kapselt internen Zustand, exponiert nur Ausgewähltes |
| Singleton Pattern | statische Instanz-Prüfung im Constructor | Garantiert genau eine Instanz |
| Factory Pattern | Funktion mit Fallunterscheidung erzeugt Objekte | Zentralisiert Objekterzeugung |
| Observer Pattern | `abonnieren()` + `veroeffentlichen()` | Ein Subject informiert mehrere Abonnenten |
| supertest | `request(app).get("/route").expect(200)` | Testet Express-Routen ohne laufenden Server |
| `jest.fn()` | `const mock = jest.fn();` | Erstellt eine Fake-Funktion mit Aufrufprotokoll |
| `toHaveBeenCalledWith` | `expect(mock).toHaveBeenCalledWith(x)` | Prüft, mit welchen Argumenten gemockt aufgerufen wurde |
| `jest.mock()` | `jest.mock("./modul")` | Ersetzt ein komplettes Modul durch Mocks |
| Unit-Test | isolierte Funktion, Abhängigkeiten gemockt | Schnell, prüft Logik einer Einheit |
| Integrationstest | echtes Zusammenspiel, z. B. mit supertest | Prüft das Zusammenwirken mehrerer Teile |
| jsdom | `testEnvironment: "jsdom"` | Simuliert das DOM in JavaScript, ganz ohne echten Browser |
| `getByText` / `getByRole` | `getByText(document.body, "Text")` | Findet Elemente wie ein Nutzer, statt über CSS-Selektoren |
| `fireEvent.click()` | `fireEvent.click(button)` | Simuliert eine Nutzerinteraktion aus `@testing-library/dom` |

---

⬅️ [Zurück zu Modul 6](../modul-6-sicherheit-auth/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 8: Deployment](../modul-8-deployment/README.md)

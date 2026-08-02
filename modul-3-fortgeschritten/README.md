# Modul 3: Unter der Haube & externe Daten (Fortgeschritten)

⬅️ [Zurück zu Modul 2](../modul-2-mittelstufe/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 4](../modul-4-profi-nodejs/README.md)

In diesem Modul öffnen wir die Motorhaube von JavaScript: Wie funktioniert Asynchronität wirklich, wie holst du Daten von externen APIs, was sind Closures, wie funktioniert Objektorientierung – und was passiert eigentlich im Event Loop?

## 🎯 Lernziele

Nach diesem Modul kannst du:
- asynchronen Code mit Callbacks, Promises und `async`/`await` schreiben und deren Unterschiede erklären
- Daten von externen REST-APIs mit `fetch` laden, senden, aktualisieren und löschen
- Scope und Closures erklären und für private Zustände (z. B. Zähler, Bankkonto) nutzen
- Klassen mit Constructor, Vererbung, Gettern/Settern und privaten Feldern schreiben
- die Ausführungsreihenfolge von synchronem Code, Microtasks und Macrotasks im Event Loop vorhersagen
- eigene Error-Klassen schreiben und Fehler gezielt nach Typ unterscheiden und behandeln

## Inhalt

- [3.1 Asynchrones JavaScript](#31-asynchrones-javascript-callbacks-promises-asyncawait)
- [3.2 Externe APIs konsumieren](#32-externe-apis-konsumieren-fetch-api-rest-json)
- [3.3 Scope & Closures](#33-scope--closures)
- [3.4 Objektorientierung](#34-objektorientierung-in-js-klassen-constructor-this)
- [3.5 Der Event Loop](#35-der-event-loop-call-stack-web-apis-callback-queue)
- [3.6 Fehlerbehandlung mit eigenen Error-Klassen](#36-fehlerbehandlung-mit-eigenen-error-klassen)

---

## 3.1 Asynchrones JavaScript (Callbacks, Promises, `async`/`await`)

### Theorie

JavaScript ist **single-threaded** – es kann zu einem Zeitpunkt immer nur eine Sache erledigen. Trotzdem kann es Dinge wie Netzwerk-Anfragen "im Hintergrund" abwickeln, ohne dass die ganze Seite einfriert. Das nennt man **asynchrone Programmierung**.

Stell dir ein Restaurant vor: Der Kellner (JavaScript) nimmt deine Bestellung auf (startet eine Anfrage) und kümmert sich währenddessen um andere Tische, statt in der Küche zu warten, bis dein Essen fertig ist. Sobald das Essen fertig ist, wird der Kellner benachrichtigt und bringt es dir.

Es gibt drei historische Stufen, mit Asynchronität umzugehen:

1. **Callbacks**: Eine Funktion, die als Argument übergeben wird und erst später aufgerufen wird, wenn die Aktion fertig ist. Nachteil: Bei vielen verschachtelten Callbacks entsteht die berüchtigte "Callback Hell" – tief verschachtelter, schwer lesbarer Code.
2. **Promises**: Ein Objekt, das einen zukünftigen Wert repräsentiert – wie ein Abholschein beim Schuster. Es hat drei Zustände: `pending` (ausstehend), `fulfilled` (erfüllt) und `rejected` (abgelehnt). Promises lassen sich mit `.then()` verketten, was die Callback Hell auflöst.
3. **`async`/`await`**: Syntaktischer Zucker über Promises, der asynchronen Code so aussehen lässt wie normalen, synchronen Code – deutlich lesbarer. Eine `async`-Funktion gibt **immer** ein Promise zurück, auch wenn du das nicht explizit schreibst.

Mit **`Promise.all()`** kannst du mehrere Promises **parallel** starten und warten, bis alle fertig sind – deutlich schneller, als sie nacheinander mit mehreren `await` abzuarbeiten.

### Code-Beispiele

```javascript
// 1. Callback-Beispiel
function bestellungAufgeben(callback) {
  console.log("Bestellung wird aufgenommen...");

  setTimeout(() => {
    // simuliert eine Wartezeit von 2 Sekunden
    callback("Pizza Margherita");
  }, 2000);
}

bestellungAufgeben((essen) => {
  console.log(`Dein Essen ist fertig: ${essen}`);
});
console.log("Diese Zeile erscheint SOFORT, noch bevor das Essen fertig ist!");
```

```javascript
// 2. Promise-Beispiel
function bestellungAufgebenPromise() {
  return new Promise((resolve, reject) => {
    const erfolgreich = true;

    setTimeout(() => {
      if (erfolgreich) {
        resolve("Pizza Margherita"); // Erfolg
      } else {
        reject("Zutaten sind aus!"); // Fehler
      }
    }, 2000);
  });
}

bestellungAufgebenPromise()
  .then((essen) => console.log(`Dein Essen ist fertig: ${essen}`))
  .catch((fehler) => console.log(`Fehler: ${fehler}`));
```

```javascript
// 3. async/await (die moderne, lesbarste Variante)
function bestellungAufgebenPromise() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Pizza Margherita"), 2000);
  });
}

async function essenBestellen() {
  console.log("Bestellung wird aufgenommen...");

  try {
    const essen = await bestellungAufgebenPromise(); // wartet, ohne zu blockieren
    console.log(`Dein Essen ist fertig: ${essen}`);
  } catch (fehler) {
    console.log(`Fehler: ${fehler}`);
  }
}

essenBestellen();
console.log("Diese Zeile erscheint trotzdem sofort!");
```

```javascript
// Callback Hell vs. async/await im direkten Vergleich
function warte(ms, wert) {
  return new Promise(resolve => setTimeout(() => resolve(wert), ms));
}

// "Callback Hell"-Stil (verschachtelt, schwer lesbar) - simuliert mit .then()
warte(500, "Schritt 1")
  .then(ergebnis1 => {
    console.log(ergebnis1);
    return warte(500, "Schritt 2");
  })
  .then(ergebnis2 => {
    console.log(ergebnis2);
    return warte(500, "Schritt 3");
  })
  .then(ergebnis3 => {
    console.log(ergebnis3);
  });

// async/await-Stil (linear, leicht lesbar)
async function fuehreSchritteAus() {
  const ergebnis1 = await warte(500, "Schritt 1");
  console.log(ergebnis1);
  const ergebnis2 = await warte(500, "Schritt 2");
  console.log(ergebnis2);
  const ergebnis3 = await warte(500, "Schritt 3");
  console.log(ergebnis3);
}
// fuehreSchritteAus(); // gibt die gleiche Ausgabe wie oben, aber lesbarer
```

```javascript
// Promise.all: mehrere asynchrone Aktionen PARALLEL statt nacheinander ausführen
function warte(ms, wert) {
  return new Promise(resolve => setTimeout(() => resolve(wert), ms));
}

async function ladeAllesParallel() {
  console.time("Dauer");

  // Nacheinander (langsam): würde 3 Sekunden dauern (1+1+1)
  // const a = await warte(1000, "A");
  // const b = await warte(1000, "B");
  // const c = await warte(1000, "C");

  // Parallel (schnell): dauert nur ca. 1 Sekunde, da alle gleichzeitig laufen
  const [a, b, c] = await Promise.all([
    warte(1000, "A"),
    warte(1000, "B"),
    warte(1000, "C")
  ]);

  console.log(a, b, c); // A B C
  console.timeEnd("Dauer"); // Dauer: ~1000ms statt ~3000ms
}

ladeAllesParallel();
```

### ⚠️ Häufiger Fehler

`await` vergessen ist einer der häufigsten Async-Bugs: `const daten = holeDatenAsync();` gibt dir das **Promise-Objekt selbst** zurück, nicht die eigentlichen Daten. Du musst `const daten = await holeDatenAsync();` schreiben – und `await` funktioniert nur innerhalb einer `async`-Funktion.

### 🎯 Übungsaufgabe

Schreibe eine Funktion `wartenUndGruessen(name)`, die ein Promise zurückgibt. Nach 1 Sekunde soll es mit dem String `"Hallo, {name}!"` aufgelöst werden. Rufe die Funktion mit `async`/`await` in einer weiteren `async`-Funktion auf und gib das Ergebnis aus. Rufe die Funktion danach für drei verschiedene Namen **parallel** mit `Promise.all()` auf.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
function wartenUndGruessen(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Hallo, ${name}!`);
    }, 1000);
  });
}

async function starteGruss() {
  const gruss = await wartenUndGruessen("Lena");
  console.log(gruss); // Nach 1 Sekunde: "Hallo, Lena!"
}

starteGruss();

async function begruesseAlle() {
  const gruesse = await Promise.all([
    wartenUndGruessen("Anna"),
    wartenUndGruessen("Ben"),
    wartenUndGruessen("Clara")
  ]);
  console.log(gruesse); // Nach ca. 1 Sekunde: ["Hallo, Anna!", "Hallo, Ben!", "Hallo, Clara!"]
}

begruesseAlle();
```

</details>

---

## 3.2 Externe APIs konsumieren (Fetch API, REST, JSON)

### Theorie

Eine **API** (Application Programming Interface) ist eine Schnittstelle, über die verschiedene Programme miteinander sprechen können – wie eine Speisekarte in einem Restaurant: Du bestellst etwas Definiertes und bekommst ein definiertes Ergebnis, ohne wissen zu müssen, wie die Küche intern arbeitet.

**REST** ist ein weit verbreitetes Konzept, um solche Schnittstellen über HTTP zu bauen. Wichtige HTTP-Methoden:

| Methode | Bedeutung |
|---|---|
| `GET` | Daten abrufen |
| `POST` | Neue Daten erstellen |
| `PUT`/`PATCH` | Bestehende Daten ändern |
| `DELETE` | Daten löschen |

Wichtige HTTP-Statuscodes, die du kennen solltest: `200` (OK), `201` (Created), `400` (Bad Request), `401` (Unauthorized), `404` (Not Found), `500` (Server Error).

**JSON** (JavaScript Object Notation) ist das gängigste Datenformat für den Datenaustausch über APIs – im Grunde ein Text, der wie ein JavaScript-Objekt aussieht.

Die **Fetch API** ist das eingebaute Werkzeug in JavaScript, um HTTP-Anfragen zu senden. Sie gibt ein Promise zurück, das du typischerweise mit `async`/`await` verarbeitest. Ein wichtiger Stolperstein: `fetch()` lehnt das Promise **nicht** automatisch ab, wenn der Server einen Fehlerstatus (z. B. 404) zurückgibt – du musst `response.ok` selbst prüfen.

### Code-Beispiele

```javascript
// GET-Anfrage mit fetch und async/await
async function ladeBenutzer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    if (!response.ok) {
      throw new Error(`HTTP-Fehler: ${response.status}`);
    }

    const benutzer = await response.json(); // JSON-Text in JS-Objekt umwandeln
    console.log(benutzer.name);  // z.B. "Leanne Graham"
    console.log(benutzer.email); // z.B. "Sincere@april.biz"
  } catch (fehler) {
    console.log("Fehler beim Laden:", fehler.message);
  }
}

ladeBenutzer();
```

```javascript
// POST-Anfrage: neue Daten an eine API senden
async function erstelleNeuenPost() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: "Mein erster Post",
        body: "Das ist der Inhalt meines Posts.",
        userId: 1
      })
    });

    const neuerPost = await response.json();
    console.log("Erstellt:", neuerPost);
  } catch (fehler) {
    console.log("Fehler beim Erstellen:", fehler.message);
  }
}

erstelleNeuenPost();
```

```javascript
// PUT und DELETE mit fetch
async function aktualisierePost(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Aktualisierter Titel", body: "Neuer Inhalt", userId: 1 })
  });
  const aktualisiert = await response.json();
  console.log("Aktualisiert:", aktualisiert);
}

async function loeschePost(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE"
  });
  console.log("Gelöscht, Status:", response.status); // 200
}

aktualisierePost(1);
loeschePost(1);
```

```javascript
// JSON manuell umwandeln: stringify und parse
const meinObjekt = { name: "Max", alter: 25, hobbys: ["Lesen", "Radfahren"] };

const jsonString = JSON.stringify(meinObjekt); // JS-Objekt -> JSON-Text
console.log(jsonString); // '{"name":"Max","alter":25,"hobbys":["Lesen","Radfahren"]}'
console.log(typeof jsonString); // "string"

const zurueckGewandelt = JSON.parse(jsonString); // JSON-Text -> JS-Objekt
console.log(zurueckGewandelt.name); // "Max"
console.log(typeof zurueckGewandelt); // "object"
```

```javascript
// Mehrere API-Aufrufe kombinieren: Daten von zwei Endpunkten zusammenführen
async function ladeBenutzerMitPosts(benutzerId) {
  try {
    const [benutzerResponse, postsResponse] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${benutzerId}`),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${benutzerId}`)
    ]);

    const benutzer = await benutzerResponse.json();
    const posts = await postsResponse.json();

    console.log(`${benutzer.name} hat ${posts.length} Beiträge geschrieben.`);
  } catch (fehler) {
    console.log("Fehler:", fehler.message);
  }
}

ladeBenutzerMitPosts(1);
```

### ⚠️ Häufiger Fehler

Ein 404-Fehler vom Server lässt `fetch()` **nicht** automatisch fehlschlagen – das `catch()` bzw. der `catch`-Block greift nur bei Netzwerkfehlern (z. B. keine Internetverbindung), nicht bei HTTP-Fehlerstatuscodes. Prüfe deshalb **immer** `response.ok` (oder `response.status`), bevor du die Antwort weiterverarbeitest.

### 🎯 Übungsaufgabe

Schreibe eine `async`-Funktion `ladeTodo(id)`, die per `fetch` die URL `https://jsonplaceholder.typicode.com/todos/{id}` abruft und den `title` sowie den Status `completed` in der Konsole ausgibt. Behandle mögliche Fehler mit `try`/`catch`. Schreibe danach eine Funktion `ladeMehrereTodos(ids)`, die mehrere Todo-IDs **parallel** mit `Promise.all()` lädt.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
async function ladeTodo(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP-Fehler: ${response.status}`);
    }

    const todo = await response.json();
    console.log(`Titel: ${todo.title}`);
    console.log(`Erledigt: ${todo.completed}`);
    return todo;
  } catch (fehler) {
    console.log("Fehler beim Laden des Todos:", fehler.message);
  }
}

ladeTodo(1);

async function ladeMehrereTodos(ids) {
  const todos = await Promise.all(ids.map(id => ladeTodo(id)));
  console.log(`${todos.length} Todos geladen.`);
  return todos;
}

ladeMehrereTodos([1, 2, 3]);
```

</details>

---

## 3.3 Scope & Closures

### Theorie

**Scope** (Gültigkeitsbereich) beschreibt, wo im Code eine Variable "sichtbar" ist. Stell dir Zimmer in einem Haus vor: Was im Wohnzimmer (globaler Scope) liegt, kann jeder sehen. Was in einem bestimmten Zimmer (Funktions-Scope) liegt, ist nur dort sichtbar – von außen kommst du nicht ran.

- **Globaler Scope**: Überall im Programm sichtbar.
- **Funktions-Scope / Block-Scope**: Nur innerhalb der Funktion bzw. des `{}`-Blocks sichtbar (mit `let`/`const`).
- **Lexical Scope**: Der Scope wird dadurch bestimmt, **wo im Code** eine Funktion geschrieben (nicht: aufgerufen) wird. Eine innere Funktion hat immer Zugriff auf die Variablen ihrer äußeren Funktionen, unabhängig davon, von wo sie später aufgerufen wird.

Eine **Closure** entsteht, wenn eine innere Funktion sich den Zugriff auf die Variablen ihrer äußeren Funktion "merkt" – auch nachdem die äußere Funktion bereits fertig ausgeführt wurde. Stell dir das wie einen Rucksack vor: Die innere Funktion nimmt die Variablen aus ihrer Umgebung mit, egal wohin sie später "wandert".

Closures sind die Grundlage für viele fortgeschrittene Muster, z. B. private Variablen, Zähler-Funktionen, Memoization (Zwischenspeichern von Ergebnissen) und Event-Handler mit eigenem Zustand.

### Code-Beispiele

```javascript
// Scope-Beispiel
const globaleVariable = "Ich bin überall sichtbar";

function meineFunktion() {
  const lokaleVariable = "Ich bin nur hier drin sichtbar";
  console.log(globaleVariable); // funktioniert
  console.log(lokaleVariable);  // funktioniert
}

meineFunktion();
console.log(globaleVariable);   // funktioniert
// console.log(lokaleVariable); // FEHLER: lokaleVariable ist hier nicht definiert
```

```javascript
// Closure-Beispiel: ein Zähler mit "privatem" Zustand
function erstelleZaehler() {
  let zaehlerStand = 0; // diese Variable wird "eingefangen"

  return function () {
    zaehlerStand++;
    return zaehlerStand;
  };
}

const zaehleHoch = erstelleZaehler(); // erstelleZaehler() ist bereits fertig ausgeführt

console.log(zaehleHoch()); // 1
console.log(zaehleHoch()); // 2
console.log(zaehleHoch()); // 3
// zaehlerStand ist von außen NICHT direkt zugreifbar - nur über zaehleHoch()

// Wichtig: jeder Aufruf von erstelleZaehler() erzeugt einen EIGENEN, unabhängigen Zustand
const zweiterZaehler = erstelleZaehler();
console.log(zweiterZaehler()); // 1 (unabhängig vom ersten Zähler!)
```

```javascript
// Praktisches Beispiel: eine Funktions-Fabrik mit Closures
function erstelleBegruessung(anrede) {
  return function (name) {
    return `${anrede} ${name}, willkommen!`;
  };
}

const foermlicheBegruessung = erstelleBegruessung("Sehr geehrter Herr/Frau");
const legereBegruessung = erstelleBegruessung("Hey");

console.log(foermlicheBegruessung("Schmidt")); // "Sehr geehrter Herr/Frau Schmidt, willkommen!"
console.log(legereBegruessung("Tom"));         // "Hey Tom, willkommen!"
```

```javascript
// Memoization mit Closures: Ergebnisse teurer Berechnungen zwischenspeichern
function erstelleMemoisierteVerdoppelung() {
  const cache = {}; // wird von der Closure "eingefangen" und bleibt erhalten

  return function (zahl) {
    if (zahl in cache) {
      console.log(`Aus Cache: ${zahl}`);
      return cache[zahl];
    }
    console.log(`Berechne: ${zahl}`);
    const ergebnis = zahl * 2;
    cache[zahl] = ergebnis;
    return ergebnis;
  };
}

const schnelleVerdoppelung = erstelleMemoisierteVerdoppelung();
console.log(schnelleVerdoppelung(5)); // "Berechne: 5" -> 10
console.log(schnelleVerdoppelung(5)); // "Aus Cache: 5" -> 10 (kein erneuter Rechenaufwand)
```

```javascript
// Der klassische Closure-Stolperstein: Schleifen mit var vs. let
// Mit var (funktioniert NICHT wie erwartet):
const funktionenVar = [];
for (var i = 0; i < 3; i++) {
  funktionenVar.push(() => console.log("var:", i));
}
funktionenVar.forEach(fn => fn());
// Ausgabe: "var: 3", "var: 3", "var: 3" -> alle teilen sich DIESELBE Variable i!

// Mit let (funktioniert wie erwartet):
const funktionenLet = [];
for (let j = 0; j < 3; j++) {
  funktionenLet.push(() => console.log("let:", j));
}
funktionenLet.forEach(fn => fn());
// Ausgabe: "let: 0", "let: 1", "let: 2" -> jede Iteration bekommt ihre EIGENE Variable j!
```

### ⚠️ Häufiger Fehler

Das `var`-vs-`let`-Verhalten in Schleifen (siehe letztes Beispiel) ist einer der klassischsten JavaScript-Stolpersteine überhaupt. Da `var` keinen Block-Scope hat, teilen sich alle Closures in der Schleife dieselbe Variable – am Ende der Schleife haben alle den letzten Wert. `let` hingegen erzeugt bei jedem Schleifendurchlauf eine neue, unabhängige Bindung. Das ist ein weiterer guter Grund, `var` konsequent zu vermeiden.

### 🎯 Übungsaufgabe

Schreibe eine Funktion `erstelleBankkonto(startguthaben)`, die ein Objekt mit zwei Funktionen zurückgibt: `einzahlen(betrag)` und `abheben(betrag)`. Beide sollen den internen Kontostand (Closure-Variable) verändern und den neuen Stand zurückgeben. Der Kontostand selbst darf von außen nicht direkt zugreifbar sein. Erstelle danach zwei unabhängige Konten und zeige, dass sich ihre Kontostände nicht gegenseitig beeinflussen.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
function erstelleBankkonto(startguthaben) {
  let kontostand = startguthaben; // privat durch Closure

  return {
    einzahlen(betrag) {
      kontostand += betrag;
      return kontostand;
    },
    abheben(betrag) {
      kontostand -= betrag;
      return kontostand;
    }
  };
}

const meinKonto = erstelleBankkonto(100);
console.log(meinKonto.einzahlen(50)); // 150
console.log(meinKonto.abheben(30));   // 120
// meinKonto.kontostand -> undefined, kein direkter Zugriff möglich

const zweitesKonto = erstelleBankkonto(1000);
console.log(zweitesKonto.abheben(200)); // 800
console.log(meinKonto.abheben(0));      // 120 -> unbeeinflusst vom zweiten Konto
```

</details>

---

## 3.4 Objektorientierung in JS (Klassen, Constructor, `this`)

### Theorie

**Objektorientierte Programmierung (OOP)** organisiert Code rund um "Objekte", die Daten (Eigenschaften) und Verhalten (Methoden) bündeln. Eine **Klasse** ist dabei ein Bauplan – wie eine Kekse-Ausstechform, mit der du beliebig viele Kekse (Objekte/Instanzen) mit derselben Grundform, aber individuellen Details (z. B. Verzierung) herstellen kannst.

- **`class`**: Definiert den Bauplan.
- **`constructor`**: Eine spezielle Methode, die beim Erstellen einer neuen Instanz (`new MeineKlasse()`) automatisch aufgerufen wird und die Startwerte setzt.
- **`this`**: Verweist innerhalb einer Klasse auf die konkrete Instanz, mit der gerade gearbeitet wird – wie das Wort "ich", das jeder Keks für sich selbst benutzt. **Wichtig:** Der Wert von `this` hängt davon ab, **wie** eine Funktion aufgerufen wird, nicht davon, wo sie definiert wurde (außer bei Arrow Functions, siehe unten).

Klassen können auch **vererben** (`extends`): Eine Kindklasse übernimmt alle Eigenschaften und Methoden einer Elternklasse und kann sie erweitern oder überschreiben. `super()` ruft dabei den Constructor bzw. die Methoden der Elternklasse auf.

Weitere nützliche Klassen-Features: **Getter/Setter** (`get`/`set`) erlauben es, auf eine Methode wie auf eine normale Eigenschaft zuzugreifen, und **private Felder** (`#feldname`) sind von außen komplett unzugänglich – die "moderne", eingebaute Alternative zu Closures für private Daten.

### Code-Beispiele

```javascript
// Klasse mit Constructor und Methoden
class Auto {
  constructor(marke, farbe) {
    this.marke = marke;
    this.farbe = farbe;
    this.kilometerstand = 0;
  }

  fahren(kilometer) {
    this.kilometerstand += kilometer;
    console.log(`${this.marke} ist jetzt ${this.kilometerstand} km gefahren.`);
  }
}

const meinAuto = new Auto("Toyota", "Blau");
meinAuto.fahren(100); // "Toyota ist jetzt 100 km gefahren."
meinAuto.fahren(50);  // "Toyota ist jetzt 150 km gefahren."

console.log(meinAuto.farbe); // "Blau"
```

```javascript
// Vererbung mit extends
class Fahrzeug {
  constructor(marke) {
    this.marke = marke;
  }

  vorstellen() {
    return `Ich bin ein Fahrzeug der Marke ${this.marke}.`;
  }
}

class Elektroauto extends Fahrzeug {
  constructor(marke, akkukapazitaet) {
    super(marke); // ruft den Constructor der Elternklasse auf
    this.akkukapazitaet = akkukapazitaet;
  }

  vorstellen() {
    // überschreibt die Methode der Elternklasse
    return `${super.vorstellen()} Ich habe einen ${this.akkukapazitaet} kWh Akku.`;
  }
}

const tesla = new Elektroauto("Tesla", 75);
console.log(tesla.vorstellen());
// "Ich bin ein Fahrzeug der Marke Tesla. Ich habe einen 75 kWh Akku."
```

```javascript
// Ein häufiger Stolperstein: "this" in normalen Funktionen vs. Arrow Functions
class Knopf {
  constructor(label) {
    this.label = label;
  }

  // Normale Methode: "this" hängt vom AUFRUF ab, nicht von der Definition
  klickenNormal() {
    console.log(`Knopf "${this.label}" wurde geklickt.`);
  }

  // Arrow Function als Klassenfeld behält "this" korrekt bei
  klickenArrow = () => {
    console.log(`Knopf "${this.label}" wurde geklickt.`);
  };
}

const speichernKnopf = new Knopf("Speichern");

const klickFunktionNormal = speichernKnopf.klickenNormal;
// klickFunktionNormal(); // FEHLER: "this" ist hier undefined, da die Methode "isoliert" aufgerufen wird

const klickFunktionArrow = speichernKnopf.klickenArrow;
klickFunktionArrow(); // funktioniert: 'Knopf "Speichern" wurde geklickt.'
```

```javascript
// Getter, Setter und private Felder (# )
class Kreis {
  #radius; // privates Feld - von außen NICHT zugreifbar

  constructor(radius) {
    this.#radius = radius;
  }

  get flaeche() {
    return Math.PI * this.#radius ** 2;
  }

  set radius(neuerRadius) {
    if (neuerRadius <= 0) {
      throw new Error("Radius muss positiv sein");
    }
    this.#radius = neuerRadius;
  }
}

const kreis = new Kreis(5);
console.log(kreis.flaeche.toFixed(2)); // 78.54 -> wird wie eine Eigenschaft gelesen, nicht wie ein Methodenaufruf

kreis.radius = 10; // nutzt den Setter
console.log(kreis.flaeche.toFixed(2)); // 314.16

// console.log(kreis.#radius); // FEHLER: #radius ist privat und von außen nicht zugreifbar
```

```javascript
// Statische Methoden: gehören zur Klasse selbst, nicht zu einer Instanz
class MathHelfer {
  static quadriere(zahl) {
    return zahl * zahl;
  }
}

console.log(MathHelfer.quadriere(4)); // 16 -> Aufruf direkt auf der Klasse, ohne "new"
```

### ⚠️ Häufiger Fehler

Wird eine Klassen-Methode "losgelöst" von ihrer Instanz übergeben (z. B. als Event-Handler: `button.addEventListener("click", meinObjekt.klickenNormal)`), verliert `this` innerhalb der Methode seinen Bezug zur Instanz. Die Lösung: entweder eine Arrow Function als Klassenfeld verwenden (siehe Beispiel oben) oder die Methode explizit binden mit `.bind(meinObjekt)`.

### 🎯 Übungsaufgabe

Erstelle eine Klasse `Person` mit `constructor(name, alter)`. Füge eine Methode `vorstellen()` hinzu, die `"Hallo, ich bin {name} und {alter} Jahre alt."` zurückgibt. Erstelle danach eine Klasse `Student`, die von `Person` erbt und zusätzlich eine Eigenschaft `studienfach` sowie eine überschriebene `vorstellen()`-Methode hat, die das Studienfach ergänzt. Füge der `Person`-Klasse zusätzlich ein privates Feld `#geheimnis` sowie einen Getter hinzu, der eine feste Nachricht statt des tatsächlichen Werts zurückgibt.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
class Person {
  #geheimnis = "streng geheim";

  constructor(name, alter) {
    this.name = name;
    this.alter = alter;
  }

  vorstellen() {
    return `Hallo, ich bin ${this.name} und ${this.alter} Jahre alt.`;
  }

  get geheimnis() {
    return "Das bleibt geheim!"; // gibt den echten Wert bewusst nicht preis
  }
}

class Student extends Person {
  constructor(name, alter, studienfach) {
    super(name, alter);
    this.studienfach = studienfach;
  }

  vorstellen() {
    return `${super.vorstellen()} Ich studiere ${this.studienfach}.`;
  }
}

const person = new Person("Anna", 40);
console.log(person.vorstellen());
// "Hallo, ich bin Anna und 40 Jahre alt."
console.log(person.geheimnis); // "Das bleibt geheim!"

const student = new Student("Ben", 22, "Informatik");
console.log(student.vorstellen());
// "Hallo, ich bin Ben und 22 Jahre alt. Ich studiere Informatik."
```

</details>

---

## 3.5 Der Event Loop (Call Stack, Web APIs, Callback Queue)

### Theorie

Der **Event Loop** ist der Mechanismus, der es JavaScript trotz seiner Single-Thread-Natur ermöglicht, asynchron zu arbeiten. Drei bis vier Komponenten spielen dabei zusammen:

1. **Call Stack**: Ein Stapel, auf dem gerade laufende Funktionsaufrufe liegen – wie ein Stapel Teller: Der zuletzt hinzugefügte Teller wird zuerst wieder abgeräumt (LIFO – Last In, First Out).
2. **Web APIs**: Vom Browser (bzw. bei Node.js von der Node-Laufzeitumgebung) bereitgestellte Funktionen wie `setTimeout` oder `fetch`, die im Hintergrund arbeiten, ohne den Call Stack zu blockieren.
3. **Callback Queue (Macrotask Queue)**: Eine Warteschlange für fertige Callbacks von z. B. `setTimeout` oder DOM-Events.
4. **Microtask Queue**: Eine separate, **höher priorisierte** Warteschlange für Promises (`.then()`, `async/await`).

Als reines Text-Diagramm sieht das Zusammenspiel so aus:

```
 ┌───────────────┐        synchroner Code läuft hier, Funktion für Funktion
 │  Call Stack   │  ◄──── (LIFO: zuletzt drauf, zuerst wieder runter)
 └───────┬───────┘
         │ ist der Call Stack leer?
         ▼
 ┌────────────────────┐   IMMER ZUERST, und zwar VOLLSTÄNDIG geleert:
 │  Microtask Queue    │   Promises (.then, async/await)
 └────────┬────────────┘
          ▼
 ┌────────────────────┐   ERST DANACH, ein Element pro Event-Loop-Durchlauf:
 │  Callback Queue      │   setTimeout, DOM-Events, ...
 │  (Macrotask Queue)   │
 └────────────────────┘

 Web APIs (Browser/Node) arbeiten parallel im Hintergrund und legen
 fertige Callbacks/Promises erst in die jeweilige Warteschlange.
```

Der **Event Loop** selbst prüft ständig: "Ist der Call Stack leer? Dann hole ich das nächste Element aus der Warteschlange und lege es auf den Stack." Wichtig: **Microtasks** (Promises) werden immer **komplett vor** Macrotasks (z. B. `setTimeout`) abgearbeitet – und zwar nach *jeder* einzelnen Task, nicht nur einmal am Ende.

Stell dir eine Küche vor: Der Koch (Call Stack) kann nur eine Sache gleichzeitig aktiv zubereiten. Wenn ein Gericht im Ofen backt (Web API), wartet der Koch nicht tatenlos, sondern bereitet weiter vor. Der Timer klingelt (Callback Queue), und sobald der Koch gerade frei ist (Call Stack leer), holt er das fertige Gericht aus dem Ofen. Aber: dringende Notizen auf dem Tresen (Microtasks/Promises) bearbeitet er *immer zuerst*, bevor er sich dem nächsten Ofen-Timer widmet.

### Code-Beispiele

```javascript
// Klassisches Beispiel zur Reihenfolge von synchronem und asynchronem Code
console.log("1: Start");

setTimeout(() => {
  console.log("2: Aus setTimeout (Macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Aus Promise (Microtask)");
});

console.log("4: Ende");

// Tatsächliche Ausgabe-Reihenfolge:
// 1: Start
// 4: Ende
// 3: Aus Promise (Microtask)
// 2: Aus setTimeout (Macrotask)
```

```javascript
// Der Call Stack in Aktion (mit verschachtelten Funktionsaufrufen)
function funktionA() {
  console.log("A startet");
  funktionB();
  console.log("A endet");
}

function funktionB() {
  console.log("B startet");
  funktionC();
  console.log("B endet");
}

function funktionC() {
  console.log("C läuft");
}

funktionA();
// Ausgabe: A startet -> B startet -> C läuft -> B endet -> A endet
// (C wird zuerst vom Stack entfernt, da es zuletzt draufgelegt wurde)
```

```javascript
// Warum setTimeout(fn, 0) NICHT sofort ausgeführt wird
console.log("Zeile 1");

setTimeout(() => {
  console.log("Zeile 3 (aus der Callback Queue, erst NACH dem synchronen Code)");
}, 0);

console.log("Zeile 2");

// Ausgabe:
// Zeile 1
// Zeile 2
// Zeile 3 (aus der Callback Queue, erst NACH dem synchronen Code)
```

```javascript
// Microtasks werden VOLLSTÄNDIG geleert, bevor der nächste Macrotask drankommt
console.log("Start");

setTimeout(() => console.log("Macrotask 1"), 0);

Promise.resolve()
  .then(() => console.log("Microtask 1"))
  .then(() => console.log("Microtask 2")) // verkettet - läuft ebenfalls VOR dem Macrotask!
  .then(() => console.log("Microtask 3"));

setTimeout(() => console.log("Macrotask 2"), 0);

console.log("Ende");

// Ausgabe:
// Start
// Ende
// Microtask 1
// Microtask 2
// Microtask 3
// Macrotask 1
// Macrotask 2
```

```javascript
// Ein blockierender (synchroner) Vorgang "friert" den Call Stack ein
console.log("Vor der Blockade");

function blockiereFuer(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // absichtlich leere Schleife, die den Thread blockiert
  }
}

setTimeout(() => console.log("Dieser Timer wartet, bis der Stack frei ist!"), 0);

blockiereFuer(2000); // blockiert den Call Stack für 2 Sekunden
console.log("Nach der Blockade");

// Ausgabe:
// Vor der Blockade
// (2 Sekunden Pause, in der GAR NICHTS passiert, auch keine Events!)
// Nach der Blockade
// Dieser Timer wartet, bis der Stack frei ist!
```

### ⚠️ Häufiger Fehler

`setTimeout(fn, 0)` bedeutet **nicht** "führe sofort aus", sondern "führe aus, sobald der Call Stack leer ist und die Warteschlange an der Reihe ist". Lange, synchrone Berechnungen (wie im letzten Beispiel) blockieren den gesamten Call Stack – währenddessen kann JavaScript **keine** Events, Timer oder Netzwerk-Antworten verarbeiten, egal wie kurz ihre eigentliche Wartezeit war.

### 🎯 Übungsaufgabe

Sage voraus, in welcher Reihenfolge folgender Code ausgegeben wird, bevor du ihn ausführst – und erkläre warum:

```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");
```

<details>
<summary>💡 Lösung anzeigen</summary>

```
A
D
C
B
```

**Erklärung:** `console.log("A")` und `console.log("D")` sind synchroner Code und laufen sofort nacheinander. `setTimeout` wird als Macrotask in die Callback Queue verschoben, das Promise `.then()` als Microtask in die Microtask Queue. Nachdem der synchrone Code (A, D) fertig ist, leert der Event Loop zuerst die Microtask Queue (C) und erst danach die Macrotask Queue (B).

</details>

---

## 3.6 Fehlerbehandlung mit eigenen Error-Klassen

### Theorie

`try`/`catch` und `throw new Error("...")` kennst du bereits aus mehreren vorherigen Kapiteln (z. B. Modul 3.2 bei `fetch`-Fehlern). Das Problem an einem einzigen, generischen `Error`: Im `catch`-Block landet immer derselbe Typ, egal ob die Ursache eine ungültige Nutzereingabe, ein fehlgeschlagener Netzwerk-Request oder ein Programmierfehler war. Willst du auf diese Fälle unterschiedlich reagieren, bleibt dir nur, den Fehlertext (`error.message`) nach Schlüsselwörtern zu durchsuchen – brüchig und unübersichtlich.

**Eigene Error-Klassen** lösen das sauber: Genau wie du in Modul 3.4 gelernt hast, mit `class X extends Y` von einer Klasse zu erben, kannst du auch von der eingebauten `Error`-Klasse erben. Stell dir das wie beschriftete Ordner auf dem Schreibtisch eines Arztes vor: Statt aller Patientenakten in einem einzigen "Irgendwas stimmt nicht"-Stapel, gibt es einen Ordner für "Allergien", einen für "Verletzungen", einen für "Infekte" – jeder Fall landet gezielt dort, wo er behandelt werden kann, statt dass jedes Mal der komplette Stapel durchsucht werden muss.

Eine eigene Error-Klasse ist meist nur wenige Zeilen lang: Sie erbt von `Error`, ruft im Constructor zwingend `super(message)` auf (das setzt die geerbte `.message`-Eigenschaft – wird das vergessen, bleibt `error.message` leer!) und überschreibt üblicherweise `this.name`, damit Stack-Traces und Logs sofort erkennen lassen, um welchen Fehlertyp es geht, statt überall nur "Error" anzuzeigen. Zusätzliche Eigenschaften (z. B. ein HTTP-Statuscode für eine spätere Express-Route, siehe Modul 4.3) lassen sich beliebig ergänzen.

Im `catch`-Block prüfst du dann mit **`instanceof`**, welcher konkrete Error-Typ vorliegt, und reagierst gezielt – ähnlich wie ein `if`/`else if` über verschiedene Fehlerklassen. Das macht Fehlerbehandlung **vorhersehbar**: Der aufrufende Code weiß genau, mit welchen Fehlertypen er rechnen muss, und kann für jeden eine passende Antwort geben (z. B. bei einem Validierungsfehler eine Meldung im Formular anzeigen, bei einem Netzwerkfehler einen "Erneut versuchen"-Button).

### Code-Beispiele

```javascript
// Wiederholung: try/catch/throw mit einem generischen Error (Bezug zu Modul 3.2)
function teile(a, b) {
  if (b === 0) {
    throw new Error("Division durch 0 ist nicht erlaubt");
  }
  return a / b;
}

try {
  teile(10, 0);
} catch (fehler) {
  console.log(fehler.message); // "Division durch 0 ist nicht erlaubt"
  console.log(fehler.name);    // "Error" - nicht sehr aussagekräftig
}
```

```javascript
// Eine eigene Error-Klasse definieren
class ValidierungsFehler extends Error {
  constructor(message) {
    super(message);          // WICHTIG: setzt error.message - nie vergessen!
    this.name = "ValidierungsFehler"; // überschreibt den generischen Namen "Error"
  }
}

function pruefeAlter(alter) {
  if (alter < 0) {
    throw new ValidierungsFehler("Alter darf nicht negativ sein");
  }
  return alter;
}

try {
  pruefeAlter(-5);
} catch (fehler) {
  console.log(fehler.name);    // "ValidierungsFehler"
  console.log(fehler.message); // "Alter darf nicht negativ sein"
  console.log(fehler instanceof Error); // true - eigene Errors bleiben "echte" Errors
}
```

```javascript
// Mehrere Error-Typen gezielt mit instanceof unterscheiden
class ValidierungsFehler extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidierungsFehler";
  }
}

class NetzwerkFehler extends Error {
  constructor(message) {
    super(message);
    this.name = "NetzwerkFehler";
  }
}

function behandleFehler(fehler) {
  if (fehler instanceof ValidierungsFehler) {
    console.log("Bitte Eingabe korrigieren:", fehler.message);
  } else if (fehler instanceof NetzwerkFehler) {
    console.log("Verbindungsproblem, bitte erneut versuchen:", fehler.message);
  } else {
    console.log("Unerwarteter Fehler:", fehler.message); // Fallback für alles andere
  }
}

behandleFehler(new ValidierungsFehler("E-Mail-Format ungültig")); // "Bitte Eingabe korrigieren: ..."
behandleFehler(new NetzwerkFehler("Server nicht erreichbar"));     // "Verbindungsproblem, ..."
```

```javascript
// Zusätzliche Eigenschaften ergänzen - nützlich als Brücke zu Express (Modul 4.3/6.4)
class ApiFehler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "ApiFehler";
    this.statusCode = statusCode; // eigene, zusätzliche Eigenschaft
  }
}

function ladeBenutzer(id) {
  if (id <= 0) {
    throw new ApiFehler("Ungültige Benutzer-ID", 400);
  }
  // ... würde hier normalerweise Daten laden
}

try {
  ladeBenutzer(-1);
} catch (fehler) {
  if (fehler instanceof ApiFehler) {
    // In einer echten Express-Route: res.status(fehler.statusCode).json({ fehler: fehler.message })
    console.log(`Status ${fehler.statusCode}: ${fehler.message}`); // "Status 400: Ungültige Benutzer-ID"
  }
}
```

```javascript
// Eigene Errors funktionieren genauso in async-Funktionen (Bezug zu Modul 3.1)
class NetzwerkFehler extends Error {
  constructor(message) {
    super(message);
    this.name = "NetzwerkFehler";
  }
}

async function ladeDaten(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new NetzwerkFehler(`Anfrage fehlgeschlagen: ${response.status}`);
  }
  return response.json();
}

async function hauptFunktion() {
  try {
    await ladeDaten("https://jsonplaceholder.typicode.com/nicht-vorhanden");
  } catch (fehler) {
    if (fehler instanceof NetzwerkFehler) {
      console.log("Netzwerkproblem:", fehler.message);
    } else {
      throw fehler; // unbekannter Fehler - weiterreichen statt verschlucken
    }
  }
}

hauptFunktion();
```

### ⚠️ Häufiger Fehler

Wird im Constructor einer eigenen Error-Klasse `super(message)` vergessen, bleibt `error.message` leer, obwohl beim `throw` ein Text übergeben wurde – ein Fehler, der sich erst spät bemerkbar macht, weil `error instanceof Error` trotzdem `true` liefert und alles zunächst "funktioniert". Genauso häufig: Alle Fehler pauschal mit einem einzigen `catch (fehler) { console.log(fehler); }` abfangen, ohne mit `instanceof` zu unterscheiden – dann hättest du dir die eigenen Error-Klassen auch sparen können, weil ihr eigentlicher Nutzen (gezielt unterschiedlich reagieren) gar nicht ausgeschöpft wird.

### 🎯 Übungsaufgabe

Erstelle eine Error-Klasse `NichtGefundenFehler`, die von `Error` erbt, `this.name` korrekt setzt und zusätzlich eine Eigenschaft `statusCode` mit dem festen Wert `404` speichert. Schreibe eine Funktion `findeProdukt(id, produkte)`, die einen `NichtGefundenFehler` wirft, falls kein Produkt mit der übergebenen `id` im Array `produkte` existiert. Fange den Fehler auf und gib sowohl `error.message` als auch `error.statusCode` aus.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
class NichtGefundenFehler extends Error {
  constructor(message) {
    super(message);
    this.name = "NichtGefundenFehler";
    this.statusCode = 404;
  }
}

function findeProdukt(id, produkte) {
  const produkt = produkte.find((p) => p.id === id);
  if (!produkt) {
    throw new NichtGefundenFehler(`Produkt mit ID ${id} wurde nicht gefunden`);
  }
  return produkt;
}

const produkte = [{ id: 1, name: "Buch" }];

try {
  findeProdukt(99, produkte);
} catch (fehler) {
  console.log(fehler.message);    // "Produkt mit ID 99 wurde nicht gefunden"
  console.log(fehler.statusCode); // 404
}
```

</details>

---

## 📋 Zusammenfassung & Cheat-Sheet

| Thema | Syntax / Beispiel | Kurzbeschreibung |
|---|---|---|
| Promise erstellen | `new Promise((resolve, reject) => {})` | Repräsentiert einen zukünftigen Wert |
| Async-Funktion | `async function f() {}` | Gibt immer ein Promise zurück |
| Warten | `const x = await promise;` | Nur innerhalb einer `async`-Funktion |
| Parallel warten | `await Promise.all([p1, p2])` | Mehrere Promises gleichzeitig statt nacheinander |
| Daten holen | `const res = await fetch(url);` | HTTP-Anfrage senden |
| Antwort prüfen | `if (!res.ok) throw new Error(...)` | `fetch` lehnt bei 404 & Co. NICHT automatisch ab |
| JSON umwandeln | `await res.json()` | Antwort-Body in ein JS-Objekt parsen |
| Closure | Funktion, die Variablen der äußeren Funktion "mitnimmt" | Basis für private Zustände |
| Klasse | `class X { constructor() {} }` | Bauplan für Objekte |
| Vererbung | `class Y extends X { super(); }` | Kindklasse übernimmt Eigenschaften der Elternklasse |
| Privates Feld | `#feld` | Von außen nicht zugreifbar |
| Call Stack | LIFO-Stapel laufender Funktionsaufrufe | Wird zuerst vollständig abgearbeitet |
| Microtask | Promises, `.then()` | Wird immer VOR dem nächsten Macrotask komplett geleert |
| Macrotask | `setTimeout`, DOM-Events | Wird erst nach allen Microtasks verarbeitet |
| Eigene Error-Klasse | `class X extends Error { constructor(m) { super(m); this.name = "X"; } }` | `super()` nicht vergessen! |
| Fehlertyp prüfen | `if (fehler instanceof X) {}` | Gezielt je nach Fehlertyp reagieren |
| Fehler weiterreichen | `throw fehler;` | Unbekannte Fehler nicht verschlucken |

---

⬅️ [Zurück zu Modul 2](../modul-2-mittelstufe/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 4: Professionalisierung & Backend](../modul-4-profi-nodejs/README.md)

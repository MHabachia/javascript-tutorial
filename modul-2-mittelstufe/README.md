# Modul 2: Der nächste Schritt (Mittelstufe)

⬅️ [Zurück zu Modul 1](../modul-1-fundamente/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 3](../modul-3-fortgeschritten/README.md)

In diesem Modul lernst du moderne JavaScript-Syntax, mächtige Array-Methoden und wie du mit JavaScript eine Webseite lebendig machst (DOM & Events).

## 🎯 Lernziele

Nach diesem Modul kannst du:
- moderne ES6+-Syntax (Arrow Functions, Template Literals, Destructuring, Spread/Rest) lesen und selbst schreiben
- Arrays mit `map`, `filter`, `reduce`, `find`, `some` und `every` transformieren, statt manuelle Schleifen zu schreiben
- HTML-Elemente per JavaScript auswählen, verändern, erstellen und entfernen (DOM-Manipulation)
- auf Nutzerinteraktionen mit Event Listenern reagieren und Event Bubbling/Delegation gezielt einsetzen
- Texte mit regulären Ausdrücken durchsuchen, validieren und ersetzen
- Daten mit `localStorage`/`sessionStorage` im Browser persistieren
- ein einfaches, framework-freies State-Management-Muster für kleine Anwendungen bauen
- häufig feuernde Events mit Debounce und Throttle performant im Griff behalten

## Inhalt

- [2.1 Moderne Syntax](#21-moderne-syntax-arrow-functions-template-literals-destructuring-spread-operator)
- [2.2 Array-Methoden (map, filter, reduce)](#22-wichtige-array-methoden-map-filter-reduce)
- [2.3 DOM-Manipulation](#23-dom-manipulation)
- [2.4 Events & Event Listener](#24-events--event-listener)
- [2.5 Reguläre Ausdrücke (RegEx)](#25-reguläre-ausdrücke-regex)
- [2.6 Datenpersistenz im Browser (localStorage & sessionStorage)](#26-datenpersistenz-im-browser-localstorage--sessionstorage)
- [2.7 Einfaches State Management ohne Framework](#27-einfaches-state-management-ohne-framework)
- [2.8 Performance bei Events: Debounce & Throttle](#28-performance-bei-events-debounce--throttle)

---

## 2.1 Moderne Syntax (Arrow Functions, Template Literals, Destructuring, Spread-Operator)

### Theorie

Modernes JavaScript (ES6+) bietet kürzere, lesbarere Schreibweisen für Dinge, die du in Modul 1 schon gelernt hast.

**Arrow Functions** (Pfeilfunktionen) sind eine kompaktere Syntax für Funktionen. Bei einzeiligen Funktionen kannst du sogar `return` und die geschweiften Klammern weglassen (implizites Return). Ein wichtiger, oft übersehener Unterschied zu normalen Funktionen: Arrow Functions haben **kein eigenes `this`** – sie "erben" `this` von ihrer Umgebung (mehr dazu in Modul 3.4).

**Template Literals** (Template-Strings) erlauben es, Variablen direkt in einen String einzubetten – mit Backticks (`` ` ``) statt normalen Anführungszeichen und `${variable}` statt umständlicher String-Verkettung. Innerhalb von `${}` kannst du sogar ganze Ausdrücke schreiben, nicht nur Variablen.

**Destructuring** ("Entpacken") ist wie ein Umzugskarton, aus dem du gezielt einzelne Gegenstände herausnimmst, statt den ganzen Karton zu durchsuchen. Du kannst Werte direkt aus Arrays oder Objekten in eigene Variablen "entpacken" – auch mit Umbenennung und Standardwerten.

**Spread-Operator** (`...`) "breitet" die Elemente eines Arrays oder Objekts aus – nützlich, um Kopien zu erstellen oder mehrere Listen zusammenzuführen, ohne das Original zu verändern. Das Gegenstück ist der **Rest-Operator** (sieht identisch aus, `...`), der mehrere übrig gebliebene Werte in einem Array "einsammelt" – z. B. bei Funktionsparametern mit unbekannter Anzahl an Argumenten.

### Code-Beispiele

```javascript
// Arrow Functions
function addiereKlassisch(a, b) {
  return a + b;
}

const addiereModern = (a, b) => a + b; // implizites Return bei einer Zeile

console.log(addiereKlassisch(2, 3)); // 5
console.log(addiereModern(2, 3));    // 5

// Bei nur einem Parameter können die Klammern entfallen
const verdoppeln = zahl => zahl * 2;
console.log(verdoppeln(5)); // 10

// Bei mehrzeiligem Code braucht man geschweifte Klammern UND explizites return
const beschreibePerson = (name, alter) => {
  const status = alter >= 18 ? "erwachsen" : "minderjährig";
  return `${name} ist ${status}.`;
};
console.log(beschreibePerson("Lea", 20)); // "Lea ist erwachsen."
```

```javascript
// Template Literals
const name = "Sara";
const alter = 28;

// Alter Weg (String-Verkettung)
const satzAlt = "Hallo, ich heiße " + name + " und bin " + alter + " Jahre alt.";

// Moderner Weg (Template Literal)
const satzNeu = `Hallo, ich heiße ${name} und bin ${alter} Jahre alt.`;

console.log(satzAlt);
console.log(satzNeu);
// Beide geben aus: "Hallo, ich heiße Sara und bin 28 Jahre alt."

// Mehrzeilige Strings sind mit Backticks ganz einfach
const mehrzeilig = `Zeile 1
Zeile 2
Zeile 3`;
console.log(mehrzeilig);

// Ausdrücke innerhalb von ${} sind erlaubt, nicht nur Variablen
const preis = 19.99;
const menge = 3;
console.log(`Gesamtsumme: ${(preis * menge).toFixed(2)} €`); // "Gesamtsumme: 59.97 €"
```

```javascript
// Destructuring bei Objekten
const person = { vorname: "Tom", nachname: "Meier", stadt: "Berlin" };

const { vorname, stadt } = person; // entpackt gezielt zwei Eigenschaften
console.log(vorname); // "Tom"
console.log(stadt);   // "Berlin"

// Destructuring mit Umbenennung und Standardwert
const { vorname: firstName, land = "Deutschland" } = person;
console.log(firstName); // "Tom" (umbenannt)
console.log(land);      // "Deutschland" (Standardwert, da "land" im Objekt fehlt)

// Destructuring bei Arrays (Reihenfolge zählt!)
const koordinaten = [52.52, 13.40];
const [breitengrad, laengengrad] = koordinaten;
console.log(breitengrad);  // 52.52
console.log(laengengrad);  // 13.4

// Destructuring direkt in Funktionsparametern - sehr verbreitet!
function begruesseNutzer({ vorname, stadt }) {
  return `Hallo ${vorname} aus ${stadt}!`;
}
console.log(begruesseNutzer(person)); // "Hallo Tom aus Berlin!"
```

```javascript
// Spread-Operator bei Arrays
const gemuese = ["Karotte", "Erbse"];
const obst = ["Apfel", "Birne"];

const einkaufsliste = [...gemuese, ...obst, "Milch"];
console.log(einkaufsliste); // ["Karotte", "Erbse", "Apfel", "Birne", "Milch"]

// Spread-Operator bei Objekten (z. B. um eine Kopie mit Änderung zu erstellen)
const grundEinstellungen = { theme: "hell", sprache: "de" };
const meineEinstellungen = { ...grundEinstellungen, theme: "dunkel" };

console.log(meineEinstellungen); // { theme: "dunkel", sprache: "de" }
console.log(grundEinstellungen); // unverändert: { theme: "hell", sprache: "de" }

// Rest-Operator: sammelt "übrige" Werte ein
function summiereAlle(...zahlen) {
  return zahlen.reduce((summe, zahl) => summe + zahl, 0);
}
console.log(summiereAlle(1, 2, 3));       // 6
console.log(summiereAlle(1, 2, 3, 4, 5)); // 15 -> funktioniert mit beliebig vielen Argumenten

// Rest beim Destructuring: "der Rest des Arrays"
const [erster, ...restlicheZahlen] = [1, 2, 3, 4, 5];
console.log(erster);           // 1
console.log(restlicheZahlen);  // [2, 3, 4, 5]
```

### ⚠️ Häufiger Fehler

Der Spread-Operator (`...arr`) und der Rest-Operator (`...args`) sehen identisch aus, tun aber das Gegenteil: Spread **breitet Werte aus** (z. B. beim Zusammenführen von Arrays), Rest **sammelt Werte ein** (z. B. bei Funktionsparametern). Welche Bedeutung gilt, hängt vom Kontext ab, in dem `...` verwendet wird.

### 🎯 Übungsaufgabe

Gegeben ist ein Objekt `produkt = { name: "Laptop", preis: 999, kategorie: "Elektronik" }`. Entpacke `name` und `preis` per Destructuring. Erstelle danach mit einem Template Literal den Satz: `"Der Laptop kostet 999 Euro."` Schreibe außerdem eine Arrow Function `verdreifachen`, die eine Zahl mit 3 multipliziert. Erstelle zuletzt mit dem Spread-Operator eine Kopie von `produkt`, bei der `preis` auf `799` reduziert ist, ohne das Original zu verändern.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
const produkt = { name: "Laptop", preis: 999, kategorie: "Elektronik" };
const { name, preis } = produkt;

console.log(`Der ${name} kostet ${preis} Euro.`);
// "Der Laptop kostet 999 Euro."

const verdreifachen = zahl => zahl * 3;
console.log(verdreifachen(4)); // 12

const produktImAngebot = { ...produkt, preis: 799 };
console.log(produktImAngebot); // { name: "Laptop", preis: 799, kategorie: "Elektronik" }
console.log(produkt);          // { name: "Laptop", preis: 999, kategorie: "Elektronik" } -> unverändert
```

</details>

---

## 2.2 Wichtige Array-Methoden (`map`, `filter`, `reduce`)

### Theorie

Diese drei Methoden gehören zu den mächtigsten Werkzeugen in JavaScript. Sie ersetzen viele klassische `for`-Schleifen und machen den Code lesbarer.

- **`map()`**: Erstellt ein **neues Array**, indem sie jedes Element transformiert. Stell dir eine Fabrikstraße vor, auf der jedes Werkstück denselben Bearbeitungsschritt durchläuft.
- **`filter()`**: Erstellt ein **neues Array**, das nur die Elemente enthält, die eine Bedingung erfüllen. Wie ein Sieb, das nur bestimmte Körner durchlässt.
- **`reduce()`**: Fasst alle Elemente eines Arrays zu **einem einzigen Wert** zusammen (z. B. eine Summe). Wie ein Schmelzofen, der viele einzelne Teile zu einem Barren verschmilzt.

Wichtig: Keine dieser Methoden verändert das Original-Array – sie geben immer etwas Neues zurück (**Immutability**, Unveränderlichkeit).

Daneben gibt es weitere sehr nützliche Array-Methoden, die auf demselben Prinzip aufbauen:

- **`find()`**: Gibt das **erste** Element zurück, das eine Bedingung erfüllt (oder `undefined`).
- **`some()`**: Gibt `true` zurück, wenn **mindestens ein** Element die Bedingung erfüllt.
- **`every()`**: Gibt `true` zurück, wenn **alle** Elemente die Bedingung erfüllen.
- **`sort()`**: Sortiert ein Array (Achtung: verändert das Original!).
- **`forEach()`**: Führt für jedes Element eine Aktion aus, gibt aber **kein neues Array** zurück (im Gegensatz zu `map`).

### Code-Beispiele

```javascript
// map: transformiert jedes Element
const zahlen = [1, 2, 3, 4];
const verdoppelt = zahlen.map(zahl => zahl * 2);

console.log(verdoppelt); // [2, 4, 6, 8]
console.log(zahlen);     // [1, 2, 3, 4] -> Original bleibt unverändert
```

```javascript
// filter: behält nur Elemente, die eine Bedingung erfüllen
const alter = [15, 22, 17, 30, 12];
const volljaehrige = alter.filter(person => person >= 18);

console.log(volljaehrige); // [22, 30]
```

```javascript
// reduce: fasst alles zu einem Wert zusammen
const preise = [10, 20, 30];

const gesamtsumme = preise.reduce((akkumulator, aktuellerPreis) => {
  return akkumulator + aktuellerPreis;
}, 0); // 0 ist der Startwert des Akkumulators

console.log(gesamtsumme); // 60

// reduce kann auch zu Objekten "reduzieren" - z.B. zum Zählen
const woerter = ["apfel", "birne", "apfel", "kirsche", "apfel", "birne"];
const anzahl = woerter.reduce((zaehlerObjekt, wort) => {
  zaehlerObjekt[wort] = (zaehlerObjekt[wort] || 0) + 1;
  return zaehlerObjekt;
}, {});
console.log(anzahl); // { apfel: 3, birne: 2, kirsche: 1 }
```

```javascript
// find, some, every
const produkte = [
  { name: "Buch", preis: 15, aufLager: true },
  { name: "Stift", preis: 2, aufLager: false },
  { name: "Tasche", preis: 40, aufLager: true }
];

const teuerstesUnter20 = produkte.find(p => p.preis < 20);
console.log(teuerstesUnter20); // { name: "Buch", preis: 15, aufLager: true } (erster Treffer)

const gibtEsGuenstige = produkte.some(p => p.preis < 5);
console.log(gibtEsGuenstige); // true (der Stift kostet 2)

const sindAlleAufLager = produkte.every(p => p.aufLager);
console.log(sindAlleAufLager); // false (der Stift ist nicht auf Lager)
```

```javascript
// sort: VERÄNDERT das Original-Array (im Gegensatz zu map/filter)!
const namen = ["Charlie", "Alice", "Bob"];
namen.sort();
console.log(namen); // ["Alice", "Bob", "Charlie"]

// Zahlen brauchen eine Vergleichsfunktion, sonst wird alphabetisch (als Text!) sortiert
const zahlenListe = [10, 1, 21, 2];
zahlenListe.sort(); // FALSCH ohne Vergleichsfunktion!
console.log(zahlenListe); // [1, 10, 2, 21] -> alphabetisch, nicht numerisch sortiert!

const zahlenListeKorrekt = [10, 1, 21, 2];
zahlenListeKorrekt.sort((a, b) => a - b); // aufsteigend
console.log(zahlenListeKorrekt); // [1, 2, 10, 21] -> korrekt!
```

```javascript
// Kombination: map, filter und reduce hintereinander (Method Chaining)
const produkte2 = [
  { name: "Buch", preis: 15, aufLager: true },
  { name: "Stift", preis: 2, aufLager: false },
  { name: "Tasche", preis: 40, aufLager: true }
];

const gesamtwertVerfuegbar = produkte2
  .filter(p => p.aufLager)          // nur verfügbare Produkte
  .map(p => p.preis)                // nur die Preise extrahieren
  .reduce((summe, preis) => summe + preis, 0); // aufsummieren

console.log(gesamtwertVerfuegbar); // 55 (15 + 40)
```

### ⚠️ Häufiger Fehler

`forEach()` und `map()` werden oft verwechselt: `forEach()` gibt **immer `undefined`** zurück und eignet sich nur für Seiteneffekte (z. B. `console.log`). Wenn du ein **neues, transformiertes Array** brauchst, musst du `map()` verwenden – `const ergebnis = array.forEach(...)` ist fast immer ein Bug.

### 🎯 Übungsaufgabe

Gegeben ist das Array `zahlen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`. Nutze `filter`, um nur die geraden Zahlen zu behalten. Nutze danach `map`, um jede dieser Zahlen zu quadrieren. Nutze zuletzt `reduce`, um die Summe aller quadrierten Zahlen zu berechnen. Prüfe zusätzlich mit `every`, ob alle Zahlen im ursprünglichen Array positiv sind.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
const zahlen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const summeDerQuadrate = zahlen
  .filter(zahl => zahl % 2 === 0)     // [2, 4, 6, 8, 10]
  .map(zahl => zahl * zahl)           // [4, 16, 36, 64, 100]
  .reduce((summe, zahl) => summe + zahl, 0); // 220

console.log(summeDerQuadrate); // 220

const alleSindPositiv = zahlen.every(zahl => zahl > 0);
console.log(alleSindPositiv); // true
```

</details>

---

## 2.3 DOM-Manipulation

### Theorie

Das **DOM** (Document Object Model) ist die Repräsentation deiner HTML-Seite als Baumstruktur von Objekten, mit der JavaScript arbeiten kann. Stell dir das DOM wie ein Inhaltsverzeichnis vor, das JavaScript erlaubt, jedes Kapitel (Element) zu finden und zu verändern.

So sieht diese Baumstruktur rein textuell dargestellt aus – jedes HTML-Element ist ein "Knoten", der Kind-Knoten enthalten kann:

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1#titel        ("Alter Titel")
        └── ul#liste
            ├── li           ("Anna")
            ├── li           ("Ben")
            └── li           ("Clara")
```

`document.querySelector("#titel")` "läuft" diesen Baum ab und gibt dir eine direkte Referenz auf den passenden Knoten zurück – Änderungen daran wirken sich sofort auf die sichtbare Seite aus.

Die wichtigsten Werkzeuge:

- **Elemente auswählen**: `document.querySelector(".klasse")` (erstes Treffer-Element) oder `document.querySelectorAll(".klasse")` (alle Treffer, als NodeList).
- **Elemente erstellen**: `document.createElement("div")`.
- **Inhalt verändern**: `element.textContent = "Neuer Text"` (nur Text, sicher) oder `element.innerHTML = "<b>Fett</b>"` (interpretiert HTML, Vorsicht bei Nutzereingaben!).
- **In die Seite einfügen**: `parent.appendChild(element)` oder das modernere `parent.append(element)`.
- **Entfernen**: `element.remove()`.
- **Attribute**: `element.getAttribute("href")` / `element.setAttribute("href", "...")`.

> ⚠️ Diese Beispiele benötigen eine HTML-Seite mit passenden Elementen. Wenn du sie testen willst, speichere den HTML-Teil in einer `.html`-Datei mit einem `<script>`-Tag und öffne sie im Browser.

### Code-Beispiele

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>DOM-Beispiel</title>
</head>
<body>
  <h1 id="titel">Alter Titel</h1>
  <ul id="liste"></ul>

  <script>
    // Element auswählen und Text ändern
    const titel = document.querySelector("#titel");
    titel.textContent = "Neuer Titel!";

    // Neues Element erstellen und einfügen
    const liste = document.querySelector("#liste");
    const namen = ["Anna", "Ben", "Clara"];

    namen.forEach(name => {
      const listenElement = document.createElement("li");
      listenElement.textContent = name;
      liste.appendChild(listenElement);
    });
    // Ergebnis: <ul id="liste"><li>Anna</li><li>Ben</li><li>Clara</li></ul>
  </script>
</body>
</html>
```

```javascript
// Beispiel für CSS-Klassen und Styles verändern (im Browser ausführen)
const box = document.querySelector(".box");

box.classList.add("aktiv");      // fügt eine CSS-Klasse hinzu
box.classList.remove("inaktiv"); // entfernt eine CSS-Klasse
box.classList.toggle("hervorgehoben"); // schaltet eine Klasse an/aus
console.log(box.classList.contains("aktiv")); // true

box.style.backgroundColor = "lightblue"; // direktes Setzen von CSS
```

```javascript
// querySelectorAll und Attribute (im Browser ausführen)
// HTML: <a href="/alt" class="link">Alt</a><a href="/alt" class="link">Alt2</a>

const alleLinks = document.querySelectorAll(".link");
console.log(alleLinks.length); // 2 (NodeList, wie ein Array-ähnliches Objekt)

alleLinks.forEach(link => {
  link.setAttribute("href", "/neu"); // Attribut verändern
  console.log(link.getAttribute("href")); // "/neu"
});
```

```javascript
// Elemente entfernen und verschachtelte Struktur bauen
// HTML: <div id="karten-container"></div>

const container = document.querySelector("#karten-container");

function erstelleKarte(titel, beschreibung) {
  const karte = document.createElement("div");
  karte.classList.add("karte");

  const ueberschrift = document.createElement("h3");
  ueberschrift.textContent = titel;

  const text = document.createElement("p");
  text.textContent = beschreibung;

  karte.append(ueberschrift, text); // mehrere Kind-Elemente auf einmal
  return karte;
}

container.appendChild(erstelleKarte("Karte 1", "Beschreibung 1"));
container.appendChild(erstelleKarte("Karte 2", "Beschreibung 2"));

// Eine Karte später wieder entfernen:
// document.querySelector(".karte").remove();
```

### ⚠️ Häufiger Fehler

`innerHTML` mit ungeprüften Nutzereingaben zu befüllen (z. B. `element.innerHTML = nutzerEingabe`) öffnet ein Einfallstor für **Cross-Site-Scripting (XSS)**-Angriffe, weil der Browser eingefügten HTML/Script-Code tatsächlich ausführt. Für reinen Text verwende deshalb immer `textContent` statt `innerHTML`.

### 🎯 Übungsaufgabe

Erstelle eine HTML-Datei mit einem leeren `<div id="container">`. Schreibe JavaScript, das drei `<p>`-Elemente mit den Texten "Punkt 1", "Punkt 2" und "Punkt 3" erstellt und in den Container einfügt. Füge danach jedem `<p>`-Element per `classList.add()` die CSS-Klasse `"listenpunkt"` hinzu.

<details>
<summary>💡 Lösung anzeigen</summary>

```html
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8" /><title>Übung</title></head>
<body>
  <div id="container"></div>

  <script>
    const container = document.querySelector("#container");
    const texte = ["Punkt 1", "Punkt 2", "Punkt 3"];

    texte.forEach(text => {
      const absatz = document.createElement("p");
      absatz.textContent = text;
      absatz.classList.add("listenpunkt");
      container.appendChild(absatz);
    });
  </script>
</body>
</html>
```

</details>

---

## 2.4 Events & Event Listener

### Theorie

**Events** (Ereignisse) sind Dinge, die im Browser passieren – ein Klick, eine Tastatureingabe, das Laden der Seite. Mit einem **Event Listener** "hörst" du auf ein bestimmtes Ereignis und reagierst mit einer Funktion, wenn es eintritt – wie ein Türsteher, der auf das Klingeln wartet und dann die Tür öffnet.

Die Grundsyntax: `element.addEventListener("eventTyp", callbackFunktion)`. Häufige Event-Typen: `click`, `input`, `change`, `submit`, `keydown`, `mouseover`, `load`.

**Event Bubbling** bedeutet: Wenn ein Event auf einem Element ausgelöst wird (z. B. ein Klick auf einen Button), "blubbert" es danach durch alle Elternelemente nach oben. Ein Klick auf einen Button innerhalb eines `<div>` löst also auch das Klick-Event des `<div>` aus – es sei denn, du stoppst die Ausbreitung explizit mit `event.stopPropagation()`.

Ein sehr nützliches Muster, das auf Bubbling aufbaut, ist **Event Delegation**: Statt jedem einzelnen Kind-Element (z. B. jedem Listeneintrag) einen eigenen Listener zu geben, hängst du **einen einzigen** Listener an das Elternelement und prüfst im Event, welches Kind-Element tatsächlich geklickt wurde (`event.target`). Das spart Ressourcen, besonders bei dynamisch erzeugten Elementen.

### Code-Beispiele

```html
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8" /><title>Event-Beispiel</title></head>
<body>
  <button id="meinButton">Klick mich!</button>
  <p id="ausgabe">Noch nicht geklickt</p>

  <script>
    const button = document.querySelector("#meinButton");
    const ausgabe = document.querySelector("#ausgabe");

    button.addEventListener("click", () => {
      ausgabe.textContent = "Button wurde geklickt!";
    });
  </script>
</body>
</html>
```

```html
<!-- Event Bubbling demonstrieren -->
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8" /><title>Bubbling</title></head>
<body>
  <div id="aussen" style="padding: 20px; background: lightgray;">
    Äußerer Bereich
    <button id="innererButton">Klick mich</button>
  </div>

  <script>
    const aussen = document.querySelector("#aussen");
    const innererButton = document.querySelector("#innererButton");

    aussen.addEventListener("click", () => {
      console.log("Äußerer Bereich wurde geklickt (durch Bubbling ausgelöst)");
    });

    innererButton.addEventListener("click", (event) => {
      console.log("Button wurde geklickt");
      // event.stopPropagation(); // Würde verhindern, dass der Klick nach oben blubbert
    });

    // Klick auf den Button gibt AUSGABE:
    // "Button wurde geklickt"
    // "Äußerer Bereich wurde geklickt (durch Bubbling ausgelöst)"
  </script>
</body>
</html>
```

```javascript
// Formulareingaben live verarbeiten (im Browser ausführen)
// HTML: <input id="textfeld" type="text" /><p id="vorschau"></p>

const textfeld = document.querySelector("#textfeld");
const vorschau = document.querySelector("#vorschau");

textfeld.addEventListener("input", (event) => {
  vorschau.textContent = `Du tippst: ${event.target.value}`;
});
```

```html
<!-- Event Delegation: EIN Listener für viele (auch später hinzugefügte) Kind-Elemente -->
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8" /><title>Event Delegation</title></head>
<body>
  <ul id="aufgabenListe">
    <li>Einkaufen</li>
    <li>Putzen</li>
    <li>Lernen</li>
  </ul>

  <script>
    const liste = document.querySelector("#aufgabenListe");

    // EIN Listener auf dem Elternelement statt drei einzelnen auf jedem <li>
    liste.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        event.target.classList.toggle("erledigt");
        console.log(`"${event.target.textContent}" umgeschaltet`);
      }
    });

    // Funktioniert auch für Elemente, die erst SPÄTER hinzugefügt werden:
    const neueAufgabe = document.createElement("li");
    neueAufgabe.textContent = "Kochen";
    liste.appendChild(neueAufgabe); // auch klickbar, ohne neuen Listener nötig!
  </script>
</body>
</html>
```

```html
<!-- Formular-Submit korrekt behandeln -->
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8" /><title>Formular</title></head>
<body>
  <form id="anmeldeFormular">
    <input type="email" id="email" placeholder="E-Mail" />
    <button type="submit">Absenden</button>
  </form>

  <script>
    const formular = document.querySelector("#anmeldeFormular");

    formular.addEventListener("submit", (event) => {
      event.preventDefault(); // verhindert den Standard-Seiten-Reload!
      const email = document.querySelector("#email").value;
      console.log(`Formular abgeschickt mit E-Mail: ${email}`);
    });
  </script>
</body>
</html>
```

### ⚠️ Häufiger Fehler

Beim Abschicken eines Formulars (`submit`-Event) vergessen Anfänger oft `event.preventDefault()` aufzurufen. Ohne diesen Aufruf lädt der Browser die Seite automatisch neu (Standardverhalten von HTML-Formularen), wodurch der gesamte JavaScript-Zustand verloren geht.

### 🎯 Übungsaufgabe

Erstelle eine HTML-Seite mit einem Zähler: einem `<p id="zaehler">0</p>` und zwei Buttons ("Erhöhen" und "Verringern"). Nutze Event Listener, damit die Buttons den angezeigten Wert entsprechend verändern. Baue zusätzlich eine Liste mit mehreren `<li>`-Elementen und nutze **Event Delegation**, um beim Klick auf einen Listeneintrag dessen Text in der Konsole auszugeben.

<details>
<summary>💡 Lösung anzeigen</summary>

```html
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8" /><title>Zähler & Liste</title></head>
<body>
  <p id="zaehler">0</p>
  <button id="erhoehen">Erhöhen</button>
  <button id="verringern">Verringern</button>

  <ul id="liste">
    <li>Apfel</li>
    <li>Birne</li>
    <li>Kirsche</li>
  </ul>

  <script>
    let stand = 0;
    const zaehlerElement = document.querySelector("#zaehler");

    document.querySelector("#erhoehen").addEventListener("click", () => {
      stand++;
      zaehlerElement.textContent = stand;
    });

    document.querySelector("#verringern").addEventListener("click", () => {
      stand--;
      zaehlerElement.textContent = stand;
    });

    // Event Delegation für die Liste
    document.querySelector("#liste").addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        console.log(`Geklickt: ${event.target.textContent}`);
      }
    });
  </script>
</body>
</html>
```

</details>

---

## 2.5 Reguläre Ausdrücke (RegEx)

### Theorie

Ein **regulärer Ausdruck** (RegEx, RegExp) ist eine eigene kleine Mini-Sprache, um Muster in Texten zu beschreiben – wie ein extrem präziser Spürhund, dem du genau sagst, wonach er in einem Text suchen soll ("finde eine Zahl mit genau drei Ziffern" statt "finde die Zahl 123"). Statt Texte Zeichen für Zeichen manuell zu durchsuchen, beschreibst du ein **Muster**, und die Regex-Engine übernimmt die Suche.

Ein regulärer Ausdruck wird in JavaScript zwischen zwei Schrägstrichen geschrieben: `/muster/flags`. Die wichtigsten **Flags** sind `g` (global – findet alle Treffer, nicht nur den ersten) und `i` (ignore case – Groß-/Kleinschreibung wird ignoriert).

Innerhalb des Musters haben bestimmte Zeichen eine Sonderbedeutung:

- **`\d`** – eine Ziffer (0–9), **`\w`** – ein "Wortzeichen" (Buchstabe, Ziffer, Unterstrich), **`\s`** – ein Leerraum-Zeichen.
- **Quantifizierer**: `+` (ein- oder mehrmals), `*` (null- oder mehrmals), `?` (null- oder einmal), `{n,m}` (zwischen n und m mal).
- **Anker**: `^` (Anfang des Texts/der Zeile), `$` (Ende des Texts/der Zeile).
- **Zeichenklasse**: `[abc]` bedeutet "a, b ODER c", `[^abc]` bedeutet "alles AUSSER a, b, c".
- **Gruppen**: `(...)` fasst einen Teil des Musters zusammen und erlaubt es dir, genau diesen Teil später gezielt herauszulesen ("Capture Group").

Die wichtigsten Werkzeuge, um Regex in JavaScript zu benutzen: **`regex.test(text)`** gibt `true`/`false` zurück (ideal für Validierung), **`text.match(regex)`** gibt die Treffer zurück (oder `null`, wenn nichts gefunden wurde!), und **`text.replace(regex, ersatz)`** ersetzt Treffer durch einen neuen Text.

### Code-Beispiele

```javascript
// test(): true/false - ideal für einfache Validierung
const nurZiffern = /^\d+$/; // ^...$ = der GESAMTE Text muss aus Ziffern bestehen

console.log(nurZiffern.test("12345")); // true
console.log(nurZiffern.test("123a5")); // false
console.log(nurZiffern.test(""));      // false ("+"  verlangt mindestens eine Ziffer)
```

```javascript
// match(): findet Treffer im Text
const text = "Meine Telefonnummer ist 030-123456, meine PLZ ist 10115.";

const alleZahlen = text.match(/\d+/g); // g = alle Treffer, nicht nur den ersten
console.log(alleZahlen); // ["030", "123456", "10115"]

const keinTreffer = "kein Zahlen hier".match(/\d+/);
console.log(keinTreffer); // null - WICHTIG: match() gibt null zurück, kein leeres Array!
```

```javascript
// replace(): Texte gezielt ersetzen
const unsauber = "JavaScript   hat    zu    viele   Leerzeichen";
const sauber = unsauber.replace(/\s+/g, " "); // \s+ = einer oder mehrere Leerräume
console.log(sauber); // "JavaScript hat zu viele Leerzeichen"

// Ohne "g"-Flag wird nur der ERSTE Treffer ersetzt!
const nurErster = unsauber.replace(/\s+/, " ");
console.log(nurErster); // "JavaScript hat    zu    viele   Leerzeichen"
```

```javascript
// Gruppen: gezielt Teile aus einem Treffer herauslesen
const datum = "2026-08-02";
const treffer = datum.match(/^(\d{4})-(\d{2})-(\d{2})$/);

console.log(treffer[0]); // "2026-08-02" (der gesamte Treffer)
console.log(treffer[1]); // "2026" (erste Gruppe: Jahr)
console.log(treffer[2]); // "08"   (zweite Gruppe: Monat)
console.log(treffer[3]); // "02"   (dritte Gruppe: Tag)
```

```javascript
// Praxisbeispiel: einfache Formular-Validierung (Bezug zu Modul 2.4)
function istGueltigeEmail(email) {
  // Bewusst vereinfacht - für echte Produktion würdest du eine geprüfte
  // Library oder das <input type="email"> des Browsers selbst nutzen
  const emailMuster = /^[\w.-]+@[\w-]+\.[a-zA-Z]{2,}$/;
  return emailMuster.test(email);
}

console.log(istGueltigeEmail("anna@test.de"));   // true
console.log(istGueltigeEmail("keine-email"));    // false
console.log(istGueltigeEmail("anna@test"));      // false (keine Domain-Endung)
```

### ⚠️ Häufiger Fehler

`text.match(regex)` gibt bei keinem Treffer `null` zurück – **nicht** ein leeres Array. Wer direkt `.length` oder `[0]` auf das Ergebnis aufruft, ohne vorher zu prüfen, bekommt den Fehler `Cannot read properties of null`. Prüfe daher immer erst, ob ein Treffer existiert (`if (treffer) { ... }`), bevor du mit dem Ergebnis weiterarbeitest. Genauso leicht vergessen: das `g`-Flag bei `replace()` – ohne es wird nur der erste Treffer ersetzt, nicht alle.

### 🎯 Übungsaufgabe

Schreibe eine Funktion `istGueltigerBenutzername(name)`, die per Regex prüft, ob ein Benutzername **nur** aus Buchstaben, Ziffern und Unterstrichen besteht und **mindestens 3, höchstens 16 Zeichen** lang ist. Schreibe danach eine Funktion `extrahiereZahlen(text)`, die alle Zahlen aus einem beliebigen Text als Array zurückgibt (leeres Array, falls keine gefunden werden).

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
function istGueltigerBenutzername(name) {
  return /^\w{3,16}$/.test(name);
}

console.log(istGueltigerBenutzername("anna_92"));      // true
console.log(istGueltigerBenutzername("ab"));            // false (zu kurz)
console.log(istGueltigerBenutzername("ungültig!"));     // false (Sonderzeichen)

function extrahiereZahlen(text) {
  const treffer = text.match(/\d+/g);
  return treffer ? treffer.map(Number) : []; // null abfangen -> leeres Array
}

console.log(extrahiereZahlen("Ich habe 3 Äpfel und 12 Birnen")); // [3, 12]
console.log(extrahiereZahlen("keine Zahlen hier"));               // []
```

</details>

---

## 2.6 Datenpersistenz im Browser (localStorage & sessionStorage)

### Theorie

Normalerweise vergisst eine Webseite beim Neuladen alles – jede Variable wird zurückgesetzt. Der **Web Storage** löst dieses Problem: Er lässt dich Daten direkt im Browser speichern, die auch einen Reload überstehen. Stell dir **`localStorage`** wie ein Notizbuch vor, das du in der Schublade liegen lässt – es bleibt dort, bis du es aktiv leerst, auch wenn du den Browser komplett schließt und später neu startest. **`sessionStorage`** ist dagegen wie ein Notizzettel, der automatisch weggeworfen wird, sobald du den Tab schließt.

Beide funktionieren nach demselben, sehr einfachen Prinzip: Schlüssel-Wert-Paare, bei denen **sowohl Schlüssel als auch Wert immer Strings sind** – auch wenn du eine Zahl übergibst, bekommst du beim Auslesen einen String zurück.

Die vier wichtigsten Methoden: **`setItem(schluessel, wert)`** speichert einen Wert, **`getItem(schluessel)`** liest ihn wieder aus (oder gibt `null`, wenn er nicht existiert), **`removeItem(schluessel)`** löscht einen einzelnen Eintrag, **`clear()`** löscht alles.

Da nur Strings gespeichert werden können, musst du Objekte und Arrays vor dem Speichern mit `JSON.stringify()` in einen String umwandeln (siehe Modul 3.2) und beim Auslesen mit `JSON.parse()` wieder zurückwandeln.

> ⚠️ **Wichtig für die Sicherheit:** Web Storage ist unverschlüsselt und für jedes Script auf der Seite lesbar. Speichere dort **niemals** Passwörter oder sensible Tokens im Klartext – bei einer XSS-Lücke (siehe Modul 2.3 und Modul 6.4) könnte fremder Code diese Daten auslesen.

### Code-Beispiele

```javascript
// Grundlagen: speichern, lesen, löschen (im Browser ausführen)
localStorage.setItem("nutzername", "Anna");
console.log(localStorage.getItem("nutzername")); // "Anna"

localStorage.removeItem("nutzername");
console.log(localStorage.getItem("nutzername")); // null - Eintrag existiert nicht mehr
```

```javascript
// Objekte und Arrays müssen mit JSON.stringify/parse umgewandelt werden
const einstellungen = { theme: "dunkel", schriftgroesse: 16 };

localStorage.setItem("einstellungen", JSON.stringify(einstellungen));

const geladen = JSON.parse(localStorage.getItem("einstellungen"));
console.log(geladen);              // { theme: "dunkel", schriftgroesse: 16 }
console.log(geladen.schriftgroesse); // 16 (wieder eine echte Zahl, kein String!)
```

```javascript
// localStorage vs. sessionStorage im direkten Vergleich
localStorage.setItem("dauerhaft", "bleibt auch nach Browser-Neustart");
sessionStorage.setItem("temporaer", "verschwindet beim Schließen des Tabs");

// Beide haben dieselbe API - der einzige Unterschied ist die Lebensdauer
console.log(localStorage.getItem("dauerhaft"));
console.log(sessionStorage.getItem("temporaer"));
```

```javascript
// Praxisbeispiel: Dark-Mode-Einstellung über Reloads hinweg merken
// HTML: <button id="modus-umschalten">Dunkelmodus umschalten</button>

function ladeGespeichertenModus() {
  const gespeichert = localStorage.getItem("dunkelmodus");
  return gespeichert === "true"; // String-Vergleich, da localStorage nur Strings kennt
}

function setzeModus(istDunkel) {
  document.body.classList.toggle("dunkel", istDunkel);
  localStorage.setItem("dunkelmodus", istDunkel); // wird automatisch zu "true"/"false"
}

setzeModus(ladeGespeichertenModus()); // Zustand beim Laden der Seite wiederherstellen

document.querySelector("#modus-umschalten").addEventListener("click", () => {
  setzeModus(!ladeGespeichertenModus());
});
```

```javascript
// Existenz eines Schlüssels sauber prüfen
function holeOderStandard(schluessel, standardwert) {
  const wert = localStorage.getItem(schluessel);
  return wert !== null ? JSON.parse(wert) : standardwert;
}

const favoriten = holeOderStandard("favoriten", []); // [] falls noch nichts gespeichert
console.log(favoriten);
```

### ⚠️ Häufiger Fehler

Wird ein Objekt oder Array ohne `JSON.stringify()` direkt an `setItem()` übergeben, speichert der Browser stillschweigend den nutzlosen Text `"[object Object]"` statt der eigentlichen Daten (JavaScript wandelt das Objekt automatisch, aber falsch, in einen String um). Genauso wichtig: `getItem()` für einen nicht existierenden Schlüssel liefert `null`, nicht `undefined` oder einen leeren String – `JSON.parse(null)` gibt zwar `null` zurück und wirft keinen Fehler, aber dein Code sollte diesen Fall trotzdem bewusst behandeln (siehe Beispiel `holeOderStandard` oben).

### 🎯 Übungsaufgabe

Schreibe Funktionen `speichereLetzteSuche(begriff)` und `ladeLetzteSuche()`, die einen zuletzt eingegebenen Suchbegriff in `localStorage` speichern bzw. wieder auslesen (Rückgabe eines leeren Strings, falls noch nichts gespeichert wurde). Baue danach eine kleine `favoritenListe`-Funktionalität: `fuegeFavoritHinzu(name)` soll einen Namen zu einem im `localStorage` gespeicherten Array hinzufügen, ohne bestehende Einträge zu überschreiben.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
function speichereLetzteSuche(begriff) {
  localStorage.setItem("letzteSuche", begriff);
}

function ladeLetzteSuche() {
  return localStorage.getItem("letzteSuche") ?? "";
}

speichereLetzteSuche("JavaScript Kurs");
console.log(ladeLetzteSuche()); // "JavaScript Kurs"

function fuegeFavoritHinzu(name) {
  const favoriten = JSON.parse(localStorage.getItem("favoriten")) ?? [];
  favoriten.push(name);
  localStorage.setItem("favoriten", JSON.stringify(favoriten));
}

fuegeFavoritHinzu("Anna");
fuegeFavoritHinzu("Ben");
console.log(JSON.parse(localStorage.getItem("favoriten"))); // ["Anna", "Ben"]
```

</details>

---

## 2.7 Einfaches State Management ohne Framework

### Theorie

**State** (Zustand) ist einfach die Sammlung aller Daten, die gerade bestimmen, was auf dem Bildschirm zu sehen ist – der Kontostand in einer Banking-App, die Todos in einer Liste, ob ein Dark Mode aktiv ist. Solange eine Seite klein ist, reicht es, den DOM direkt zu verändern (wie in Modul 2.3). Sobald mehrere Teile der Seite von denselben Daten abhängen, wird das schnell unübersichtlich: Ändert sich der Warenkorb, müssen plötzlich drei verschiedene Stellen im Code manuell aktualisiert werden – vergisst du eine, zeigt die Seite veraltete Daten.

**State Management** löst dieses Problem mit einer einfachen Regel: Es gibt **eine einzige Quelle der Wahrheit** (den State) und **eine zentrale Stelle**, die reagiert, sobald sich dieser State ändert. Stell dir das wie ein Whiteboard im Büro vor: Statt dass jede Abteilung ihre eigene Kopie der Zahlen führt und Änderungen mühsam einzeln weiterträgt, schaut jeder auf dasselbe Whiteboard – ändert sich eine Zahl dort, sehen es alle sofort.

Größere Frameworks wie React oder Vue lösen das mit ausgefeilten Bibliotheken. Für kleinere, framework-freie Projekte reicht oft ein simpler, selbstgebauter **Store**: ein Objekt, das den aktuellen State hält, eine Funktion zum kontrollierten Ändern (`setState`) anbietet und interessierte Funktionen benachrichtigt, wenn sich etwas geändert hat (**`subscribe`**) – im Kern derselbe Publisher/Subscriber-Gedanke wie bei Event Listenern (Modul 2.4) und dem Observer Pattern (Modul 7.2). Wichtig dabei: **Niemals den State direkt verändern** (`state.wert = neu`), sondern immer über `setState` – nur so wissen die "Abonnenten", dass sie sich neu zeichnen müssen.

### Code-Beispiele

```javascript
// Das Problem ohne State Management: DOM-Updates verstreut sich im Code
let zaehlerWert = 0; // "State" liegt lose in einer globalen Variable

function erhoehenOhneStore() {
  zaehlerWert++;
  document.querySelector("#anzeige").textContent = zaehlerWert; // manuell synchron halten
  document.querySelector("#titel").textContent = `Aktuell: ${zaehlerWert}`; // leicht zu vergessen!
}
// Bei jeder neuen Stelle, die zaehlerWert anzeigt, muss man daran denken,
// sie hier ebenfalls zu aktualisieren - eine typische Fehlerquelle.
```

```javascript
// Ein winziger, selbstgebauter Store (nutzt eine Closure - mehr dazu in Modul 3.3)
function erstelleStore(initialerState) {
  let state = initialerState;
  const abonnenten = [];

  return {
    getState() {
      return state;
    },
    setState(aenderungen) {
      state = { ...state, ...aenderungen }; // niemals state direkt mutieren!
      abonnenten.forEach((funktion) => funktion(state)); // alle Abonnenten informieren
    },
    subscribe(funktion) {
      abonnenten.push(funktion);
    },
  };
}

const store = erstelleStore({ zaehler: 0 });

store.subscribe((state) => console.log("Neuer State:", state));
store.setState({ zaehler: 1 }); // "Neuer State: { zaehler: 1 }"
store.setState({ zaehler: 2 }); // "Neuer State: { zaehler: 2 }"
```

```javascript
// Den Store mit dem DOM verbinden: EINE render()-Funktion statt verstreuter Updates
// HTML: <p id="anzeige">0</p><button id="plus">+1</button>

const zaehlerStore = erstelleStore({ zaehler: 0 });

function render(state) {
  document.querySelector("#anzeige").textContent = state.zaehler;
}

zaehlerStore.subscribe(render); // render() läuft ab jetzt bei JEDER Änderung automatisch
render(zaehlerStore.getState()); // einmal initial zeichnen

document.querySelector("#plus").addEventListener("click", () => {
  zaehlerStore.setState({ zaehler: zaehlerStore.getState().zaehler + 1 });
});
```

```javascript
// State zusätzlich in localStorage persistieren (Bezug zu Modul 2.6)
function erstellePersistentenStore(schluessel, initialerState) {
  const gespeichert = localStorage.getItem(schluessel);
  const startState = gespeichert ? JSON.parse(gespeichert) : initialerState;

  const store = erstelleStore(startState);

  store.subscribe((state) => {
    localStorage.setItem(schluessel, JSON.stringify(state)); // bei jeder Änderung sichern
  });

  return store;
}

const einstellungenStore = erstellePersistentenStore("einstellungen", { dunkelmodus: false });
einstellungenStore.setState({ dunkelmodus: true }); // wird sofort in localStorage gesichert
```

```javascript
// Mehrere unabhängige Anzeigen bleiben automatisch synchron
const warenkorbStore = erstelleStore({ artikel: [] });

function zeigeArtikelAnzahl(state) {
  console.log(`Warenkorb: ${state.artikel.length} Artikel`);
}
function zeigeGesamtpreis(state) {
  const summe = state.artikel.reduce((acc, a) => acc + a.preis, 0);
  console.log(`Gesamtpreis: ${summe} €`);
}

warenkorbStore.subscribe(zeigeArtikelAnzahl);
warenkorbStore.subscribe(zeigeGesamtpreis);

warenkorbStore.setState({ artikel: [{ name: "Buch", preis: 15 }] });
// Beide Funktionen laufen automatisch, OHNE dass man sie manuell aufrufen muss:
// "Warenkorb: 1 Artikel"
// "Gesamtpreis: 15 €"
```

### ⚠️ Häufiger Fehler

Der State wird direkt verändert statt über `setState` (`store.getState().zaehler = 5`) – das "funktioniert" scheinbar, weil sich der Wert tatsächlich ändert, aber **kein einziger Abonnent wird benachrichtigt**, die Seite bleibt also optisch veraltet. Genau dieses Prinzip (nie direkt mutieren, immer eine kontrollierte Funktion nutzen) kennst du bereits aus Modul 2.2 bei `map`/`filter` – State Management wendet dieselbe Idee nur konsequent auf die gesamte Anwendung an.

### 🎯 Übungsaufgabe

Baue mit `erstelleStore()` eine kleine Todo-Liste: Der State soll ein Array `todos` enthalten. Schreibe eine Funktion `fuegeTodoHinzu(store, titel)`, die ein neues Todo (`{ titel, erledigt: false }`) zum bestehenden Array hinzufügt (ohne das Original-Array zu mutieren!). Abonniere eine `render`-Funktion, die bei jeder Änderung die Anzahl der offenen Todos in der Konsole ausgibt.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
function fuegeTodoHinzu(store, titel) {
  const aktuelleTodos = store.getState().todos;
  store.setState({
    todos: [...aktuelleTodos, { titel, erledigt: false }], // neues Array statt Mutation
  });
}

const todoStore = erstelleStore({ todos: [] });

todoStore.subscribe((state) => {
  const offene = state.todos.filter((t) => !t.erledigt).length;
  console.log(`${offene} offene Todo(s)`);
});

fuegeTodoHinzu(todoStore, "Kurs abschließen"); // "1 offene Todo(s)"
fuegeTodoHinzu(todoStore, "Projekt deployen"); // "2 offene Todo(s)"
```

</details>

---

## 2.8 Performance bei Events: Debounce & Throttle

### Theorie

Manche Events feuern extrem häufig: `input` bei jedem Tastenanschlag, `scroll` und `resize` teils hunderte Male pro Sekunde. Hängst du an so ein Event direkt eine teure Aktion (eine API-Anfrage, eine aufwendige DOM-Aktualisierung), überlastest du schnell den Browser oder das Backend – bei einer Live-Suche würdest du sonst bei jedem einzelnen Buchstaben eine neue Anfrage lostreten, obwohl der Nutzer noch mitten im Tippen ist.

**Debounce** und **Throttle** sind zwei Techniken, die die Aufruf-Häufigkeit einer Funktion künstlich begrenzen – sie lösen aber unterschiedliche Probleme:

**Debounce** wartet, bis eine *Pause* in den Events entsteht, und führt die Funktion erst dann aus – wie eine Aufzugtür, die nicht sofort schließt, sobald sie sich öffnet, sondern jedes Mal neu wartet, wenn jemand den Knopf drückt, und erst schließt, wenn für eine kurze Zeit niemand mehr gedrückt hat. Ideal für eine Live-Suche: Die Anfrage soll erst raus, wenn der Nutzer wirklich mit Tippen fertig ist (kurz pausiert), nicht bei jedem Zeichen.

**Throttle** garantiert dagegen, dass eine Funktion höchstens **einmal pro festgelegtem Zeitintervall** ausgeführt wird – egal wie oft das Event dazwischen feuert – wie ein Türsteher, der unabhängig vom Andrang alle zwei Sekunden genau eine Person durchlässt, nicht mehr und nicht weniger. Ideal für ein Scroll-Event, bei dem du z. B. regelmäßig, aber nicht bei *jedem* Pixel-Scroll, die Position prüfen willst.

Beide Techniken funktionieren nach demselben Bauprinzip wie der Store aus Modul 2.7: eine **Closure**, die sich zwischen den Aufrufen etwas merkt (bei Debounce die laufende `setTimeout`-ID, bei Throttle einen "gerade gesperrt"-Zustand) – mehr zu Closures folgt formal in Modul 3.3, hier siehst du schon eine sehr nützliche praktische Anwendung davon.

### Code-Beispiele

```javascript
// Das Problem ohne Debounce/Throttle: das Event feuert bei JEDEM Tastenanschlag
// HTML: <input id="suchfeld" />

function sucheAnfrage(begriff) {
  console.log(`Anfrage gesendet für: "${begriff}"`); // stell dir hier einen echten fetch()-Aufruf vor
}

document.querySelector("#suchfeld").addEventListener("input", (event) => {
  sucheAnfrage(event.target.value);
  // Bei "javascript" wären das ELF einzelne Anfragen - eine pro Buchstabe!
});
```

```javascript
// debounce(): wartet auf eine Pause, bevor die Funktion wirklich ausgeführt wird
function debounce(funktion, wartezeitMs) {
  let timeoutId; // wird von der Closure "eingefangen" und bleibt zwischen Aufrufen erhalten

  return function (...argumente) {
    clearTimeout(timeoutId); // vorherigen, noch wartenden Aufruf verwerfen
    timeoutId = setTimeout(() => {
      funktion(...argumente);
    }, wartezeitMs);
  };
}

const debouncedLog = debounce((text) => console.log("Ausgeführt:", text), 300);

debouncedLog("j");
debouncedLog("ja");
debouncedLog("jav"); // nur DIESER Aufruf feuert nach 300ms ohne weitere Eingabe wirklich
// Ausgabe (nach 300ms Stille): "Ausgeführt: jav"
```

```javascript
// debounce() im Einsatz bei einer Live-Suche
// HTML: <input id="suchfeld" />

const debouncedSuche = debounce((begriff) => {
  console.log(`Anfrage gesendet für: "${begriff}"`);
}, 400);

document.querySelector("#suchfeld").addEventListener("input", (event) => {
  debouncedSuche(event.target.value);
  // Egal wie schnell getippt wird: Es wird erst 400ms NACH der letzten
  // Eingabe wirklich eine Anfrage gesendet - meist nur eine einzige.
});
```

```javascript
// throttle(): garantiert höchstens einen Aufruf pro Zeitintervall
function throttle(funktion, intervallMs) {
  let gesperrt = false; // wird von der Closure "eingefangen"

  return function (...argumente) {
    if (gesperrt) {
      return; // während der Sperre werden weitere Aufrufe ignoriert
    }
    funktion(...argumente);
    gesperrt = true;
    setTimeout(() => {
      gesperrt = false; // nach Ablauf des Intervalls wieder freigeben
    }, intervallMs);
  };
}

const throttledLog = throttle((text) => console.log("Ausgeführt:", text), 1000);

throttledLog("A"); // läuft sofort: "Ausgeführt: A"
throttledLog("B"); // wird ignoriert, da noch gesperrt
throttledLog("C"); // wird ignoriert, da noch gesperrt
// Erst nach 1000ms würde ein neuer Aufruf wieder durchgelassen
```

```javascript
// throttle() im Einsatz bei einem Scroll-Event
window.addEventListener(
  "scroll",
  throttle(() => {
    console.log("Scroll-Position:", window.scrollY);
    // z.B. hier prüfen, ob ein "Nach oben"-Button eingeblendet werden soll
  }, 200)
);
// Statt hunderte Male pro Sekunde zu feuern, läuft die Funktion
// höchstens alle 200ms - spürbar entlastend für den Browser.
```

### ⚠️ Häufiger Fehler

Debounce und Throttle werden oft verwechselt, lösen aber unterschiedliche Probleme: **Debounce** führt die Funktion nur **einmal, nach einer Pause**, aus (ideal, wenn dich nur das *Endergebnis* interessiert, z. B. der fertig eingegebene Suchbegriff) – **Throttle** führt sie **regelmäßig während der Aktivität** aus (ideal, wenn du auch *zwischendurch* reagieren willst, z. B. beim Scrollen). Ein Scroll-Handler mit Debounce würde erst reagieren, wenn der Nutzer mit Scrollen komplett aufgehört hat – für die meisten Scroll-Anwendungsfälle unpassend, dort ist Throttle die richtige Wahl.

### 🎯 Übungsaufgabe

Nutze die `debounce()`-Funktion von oben, um eine Funktion `zeigeZeichenanzahl(text)` zu "debouncen", die die Länge eines eingegebenen Texts in der Konsole ausgibt. Wende sie auf ein `input`-Event an, sodass die Zeichenanzahl erst 500ms nach der letzten Eingabe ausgegeben wird. Nutze danach `throttle()`, um eine Funktion `logMausposition(event)` beim `mousemove`-Event höchstens alle 250ms auszuführen.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
function debounce(funktion, wartezeitMs) {
  let timeoutId;
  return function (...argumente) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => funktion(...argumente), wartezeitMs);
  };
}

function throttle(funktion, intervallMs) {
  let gesperrt = false;
  return function (...argumente) {
    if (gesperrt) return;
    funktion(...argumente);
    gesperrt = true;
    setTimeout(() => (gesperrt = false), intervallMs);
  };
}

function zeigeZeichenanzahl(text) {
  console.log(`Zeichenanzahl: ${text.length}`);
}

const debouncedZeichenanzahl = debounce(zeigeZeichenanzahl, 500);
document.querySelector("#suchfeld").addEventListener("input", (event) => {
  debouncedZeichenanzahl(event.target.value);
});

function logMausposition(event) {
  console.log(`Maus bei x=${event.clientX}, y=${event.clientY}`);
}

const throttledMausposition = throttle(logMausposition, 250);
document.addEventListener("mousemove", throttledMausposition);
```

</details>

---

## 📋 Zusammenfassung & Cheat-Sheet

| Thema | Syntax / Beispiel | Kurzbeschreibung |
|---|---|---|
| Arrow Function | `const f = (a, b) => a + b;` | Kompakte Funktion, kein eigenes `this` |
| Template Literal | `` `Hallo ${name}` `` | Variablen/Ausdrücke direkt im String |
| Destructuring (Objekt) | `const { a, b } = obj;` | Eigenschaften gezielt entpacken |
| Destructuring (Array) | `const [a, b] = arr;` | Werte nach Reihenfolge entpacken |
| Spread | `[...arr1, ...arr2]` | Elemente "ausbreiten", z. B. zum Kopieren/Zusammenführen |
| Rest | `function f(...args) {}` | Übrige Argumente in einem Array einsammeln |
| Transformieren | `arr.map(x => x * 2)` | Neues Array mit verändertem Inhalt |
| Filtern | `arr.filter(x => x > 0)` | Neues Array mit passenden Elementen |
| Zusammenfassen | `arr.reduce((acc, x) => acc + x, 0)` | Array zu einem einzigen Wert verdichten |
| Element suchen | `arr.find(x => ...)` | Erstes passendes Element (oder `undefined`) |
| Element auswählen | `document.querySelector(".klasse")` | Erstes Treffer-Element im DOM |
| Element erstellen | `document.createElement("div")` | Neues, noch nicht eingefügtes Element |
| In Seite einfügen | `parent.append(element)` | Element als Kind einfügen |
| Auf Klick reagieren | `el.addEventListener("click", fn)` | Event Listener registrieren |
| Formular abfangen | `event.preventDefault()` | Verhindert automatischen Seiten-Reload |
| Muster prüfen | `/^\d+$/.test(text)` | `true`/`false` - ideal für Validierung |
| Treffer finden | `text.match(/\d+/g)` | Gibt Treffer-Array oder `null` zurück |
| Ersetzen | `text.replace(/\s+/g, " ")` | `g`-Flag nicht vergessen für ALLE Treffer |
| Dauerhaft speichern | `localStorage.setItem(k, v)` | Bleibt auch nach Browser-Neustart erhalten |
| Nur für die Sitzung | `sessionStorage.setItem(k, v)` | Verschwindet beim Schließen des Tabs |
| Objekt speichern | `JSON.stringify(obj)` / `JSON.parse(str)` | Web Storage kennt nur Strings |
| Store erstellen | `erstelleStore(initialState)` | Zentraler State + `getState`/`setState`/`subscribe` |
| State ändern | `store.setState({...})` | Niemals direkt mutieren, sonst keine Benachrichtigung |
| Debounce | `debounce(fn, 300)` | Führt `fn` erst nach einer Pause aus (z. B. Live-Suche) |
| Throttle | `throttle(fn, 200)` | Führt `fn` höchstens einmal pro Intervall aus (z. B. Scroll) |

---

⬅️ [Zurück zu Modul 1](../modul-1-fundamente/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 3: Unter der Haube & externe Daten](../modul-3-fortgeschritten/README.md)

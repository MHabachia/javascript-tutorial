# Modul 1: Die Fundamente (Anfänger)

⬅️ [Zurück zur Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 2](../modul-2-mittelstufe/README.md)

In diesem Modul lernst du die absoluten Grundlagen von JavaScript: Variablen, Datentypen, Logik, Schleifen, Funktionen, Arrays und Objekte.

> 💡 **Tipp:** Kopiere die Code-Beispiele in die Browser-Konsole (F12 → Console) oder in eine `.js`-Datei und führe sie mit Node.js aus (`node datei.js`), um sie live auszuprobieren.

## 🎯 Lernziele

Nach diesem Modul kannst du:
- Variablen mit `let` und `const` sinnvoll unterscheiden und die primitiven Datentypen von JavaScript benennen
- Bedingungen mit Vergleichs- und logischen Operatoren formulieren, inklusive Truthy/Falsy-Verhalten
- `for`-, `while`- und `for...of`-Schleifen einsetzen und mit `break`/`continue` steuern
- eigene Funktionen mit Parametern, Rückgabewerten und Standardwerten schreiben
- Arrays mit den wichtigsten Methoden (`push`, `pop`, `slice`, `splice` u. a.) bearbeiten
- Objekte erstellen, auslesen und mit `Object.keys`/`values`/`entries` durchlaufen

## Inhalt

- [1.1 Variablen & Datentypen](#11-variablen-let-const--datentypen)
- [1.2 Operatoren & Logik](#12-operatoren--logik)
- [1.3 Schleifen](#13-schleifen-for-while)
- [1.4 Funktionen](#14-grundlagen-von-funktionen)
- [1.5 Arrays](#15-arrays)
- [1.6 Objekte](#16-objekte)

---

## 1.1 Variablen (`let`, `const`) & Datentypen

### Theorie

Eine **Variable** ist wie eine beschriftete Kiste, in der du einen Wert aufbewahrst. Du kannst später in die Kiste schauen oder – je nach Kistentyp – den Inhalt austauschen.

In modernem JavaScript gibt es zwei Wege, eine solche Kiste zu erstellen:

- **`let`**: Eine Kiste, deren Inhalt du später austauschen darfst (veränderbar).
- **`const`**: Eine Kiste, die du fest verklebst, nachdem du sie befüllt hast (nicht neu zuweisbar). Der Name kommt von "constant" (konstant).

> Das alte Schlüsselwort `var` solltest du vermeiden – es hat historische Eigenheiten (z. B. **kein** Block-Scope, sondern nur Funktions-Scope, und "Hoisting"-Verhalten, bei dem die Variable schon vor ihrer Deklaration mit `undefined` existiert), die oft zu schwer auffindbaren Bugs führen. Nutze immer `let` oder `const`.

**Faustregel:** Verwende standardmäßig `const`. Nutze `let` nur, wenn du den Wert wirklich später ändern musst. Das macht deinen Code sofort lesbarer, weil andere (und du selbst in drei Monaten) auf einen Blick sehen: "Diese Variable ändert sich nie."

**Wichtig zu verstehen bei `const`:** Bei Objekten und Arrays schützt `const` nur die *Zuweisung* der Variable, nicht deren *Inhalt*. Du kannst also die Eigenschaften eines `const`-Objekts weiterhin verändern – du darfst der Variable nur keinen komplett neuen Wert zuweisen.

JavaScript kennt folgende **primitive Datentypen**:

| Typ | Beschreibung | Beispiel |
|---|---|---|
| `String` | Text, in Anführungszeichen | `"Hallo Welt"` |
| `Number` | Zahlen (ganz oder mit Komma) | `42`, `3.14` |
| `Boolean` | Wahrheitswert | `true`, `false` |
| `Null` | Bewusst "kein Wert" | `null` |
| `Undefined` | Wert wurde noch nicht zugewiesen | `undefined` |
| `BigInt` | Sehr große ganze Zahlen | `9007199254740993n` |
| `Symbol` | Eindeutiger, unveränderlicher Wert | `Symbol("id")` |

Der Unterschied zwischen `null` und `undefined` verwirrt Anfänger oft: Stell dir eine leere Kaffeetasse vor. `undefined` bedeutet "niemand hat sich bisher um die Tasse gekümmert" (Standardzustand). `null` bedeutet "jemand hat die Tasse absichtlich geleert" – ein bewusstes "hier ist nichts".

Alles, was **kein** primitiver Typ ist (Arrays, Objekte, Funktionen), gehört zum Typ `object` bzw. `function` und wird **als Referenz** gespeichert – das ist der Grund, warum sich Objekt-Inhalte trotz `const` ändern lassen (siehe Beispiele unten).

### Code-Beispiele

```javascript
// const: Wert kann nicht neu zugewiesen werden
const name = "Anna";
console.log(name); // "Anna"

// let: Wert kann sich ändern
let alter = 25;
alter = 26; // erlaubt
console.log(alter); // 26

// Die verschiedenen Datentypen
const text = "Ich bin ein String";
const zahl = 42;
const kommazahl = 3.14;
const istAktiv = true;
const nichtsGesetzt = null;
let nochNichtDefiniert;

console.log(typeof text);            // "string"
console.log(typeof zahl);            // "number"
console.log(typeof istAktiv);        // "boolean"
console.log(typeof nichtsGesetzt);   // "object" (historische Eigenheit von JS!)
console.log(typeof nochNichtDefiniert); // "undefined"
```

```javascript
// Dieser Code demonstriert, warum const bei Neuzuweisung einen Fehler wirft
const geburtsjahr = 1998;

try {
  geburtsjahr = 2000; // Das wird einen Fehler auslösen
} catch (fehler) {
  console.log("Fehler abgefangen:", fehler.message);
  // Fehler abgefangen: Assignment to constant variable.
}
```

```javascript
// const schützt nur die Zuweisung, nicht den Inhalt eines Objekts/Arrays
const person = { name: "Ben", alter: 30 };

person.alter = 31;        // ERLAUBT: nur eine Eigenschaft wird verändert
person.stadt = "München"; // ERLAUBT: neue Eigenschaft hinzufügen
console.log(person); // { name: "Ben", alter: 31, stadt: "München" }

// person = { name: "Neu" }; // FEHLER: das wäre eine komplette Neuzuweisung

const zahlen = [1, 2, 3];
zahlen.push(4); // ERLAUBT: Array-Inhalt ändert sich
console.log(zahlen); // [1, 2, 3, 4]
```

```javascript
// Block-Scope: let/const gelten nur innerhalb ihres { }-Blocks
if (true) {
  let lokaleVariable = "Ich lebe nur hier drin";
  console.log(lokaleVariable); // funktioniert
}
// console.log(lokaleVariable); // FEHLER: lokaleVariable ist hier nicht definiert

// var (zum Vergleich - NICHT empfohlen) ignoriert Block-Scope:
if (true) {
  var altmodisch = "Ich existiere auch außerhalb!";
}
console.log(altmodisch); // funktioniert (aber das ist meist unerwünscht!)
```

### ⚠️ Häufiger Fehler

Anfänger versuchen oft, eine Variable mit `const` zu deklarieren, obwohl sie sie später neu zuweisen wollen (z. B. einen Zähler). Das führt zum Fehler `Assignment to constant variable`. Merke: Wenn du `variable = variable + 1` oder Ähnliches vorhast, brauchst du `let`.

### 🎯 Übungsaufgabe

Erstelle drei Variablen: `vorname` (String, mit `const`), `punktestand` (Number, mit `let`) und `hatGewonnen` (Boolean, mit `let`). Gib alle drei mit `console.log()` aus. Erhöhe danach `punktestand` um 10 und setze `hatGewonnen` auf `true`. Erstelle zusätzlich ein `const`-Objekt `spieler` mit einer Eigenschaft `punktestand` und verändere diese Eigenschaft (ohne das Objekt neu zuzuweisen).

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
const vorname = "Max";
let punktestand = 50;
let hatGewonnen = false;

console.log(vorname, punktestand, hatGewonnen);
// Max 50 false

punktestand = punktestand + 10; // oder: punktestand += 10;
hatGewonnen = true;

console.log(vorname, punktestand, hatGewonnen);
// Max 60 true

const spieler = { punktestand: 0 };
spieler.punktestand = 100; // erlaubt, da nur die Eigenschaft geändert wird
console.log(spieler); // { punktestand: 100 }
```

</details>

---

## 1.2 Operatoren & Logik

### Theorie

**Operatoren** sind die Werkzeuge, mit denen du Werte vergleichst, verknüpfst oder Entscheidungen triffst.

Mit `if`/`else` triffst du Entscheidungen im Code – wie ein Wegweiser: "Wenn Bedingung A zutrifft, gehe hier lang, sonst dort lang."

Ein häufiger Stolperstein ist der Unterschied zwischen `===` und `==`:

- **`===`** (strikte Gleichheit): Vergleicht Wert **und** Typ. `"5" === 5` ist `false`, weil ein String kein Number ist.
- **`==`** (lose Gleichheit): Vergleicht nur den Wert und wandelt Typen dabei automatisch um (Type Coercion). `"5" == 5` ist `true`.

**Empfehlung:** Verwende praktisch immer `===` und `!==`. Das verhindert überraschende Bugs durch automatische Typumwandlung.

Neben den Vergleichsoperatoren (`===`, `!==`, `<`, `>`, `<=`, `>=`) gibt es **arithmetische Operatoren** (`+`, `-`, `*`, `/`, `%` (Rest bei Division), `**` (Potenz)) und **Zuweisungsoperatoren** (`+=`, `-=`, `*=`, `/=`).

Logische Operatoren verknüpfen Bedingungen:

- **`&&`** (UND): Beide Seiten müssen `true` sein.
- **`||`** (ODER): Mindestens eine Seite muss `true` sein.
- **`!`** (NICHT): Kehrt einen Wahrheitswert um.

Denk an ein Türschloss mit zwei Schlüsseln: `&&` bedeutet "du brauchst BEIDE Schlüssel gleichzeitig", `||` bedeutet "EINER der beiden Schlüssel reicht".

Ein wichtiges, fortgeschritteneres Konzept ist **Truthy und Falsy**: JavaScript wandelt in Bedingungen (z. B. `if (wert)`) jeden Wert automatisch in `true` oder `false` um. Folgende Werte gelten als **falsy** (verhalten sich wie `false`): `0`, `""` (leerer String), `null`, `undefined`, `NaN` und `false` selbst. **Alles andere ist truthy** – auch `"0"` (String!) oder ein leeres Array `[]`.

Außerdem gibt es der **Nullish-Coalescing-Operator** `??`, der einen Fallback-Wert nur dann verwendet, wenn die linke Seite `null` oder `undefined` ist (im Gegensatz zu `||`, das bei *jedem* falsy-Wert den Fallback nimmt).

### Code-Beispiele

```javascript
// === vs ==
console.log(5 === 5);      // true (gleicher Wert, gleicher Typ)
console.log(5 === "5");    // false (unterschiedlicher Typ!)
console.log(5 == "5");     // true (Typ wird ignoriert)

// if / else
const temperatur = 15;

if (temperatur > 25) {
  console.log("Es ist warm.");
} else if (temperatur > 10) {
  console.log("Es ist mild.");
} else {
  console.log("Es ist kalt.");
}
// Ausgabe: "Es ist mild."
```

```javascript
// Logische Operatoren
const hatTicket = true;
const istÜber18 = false;

// UND: beide Bedingungen müssen erfüllt sein
if (hatTicket && istÜber18) {
  console.log("Einlass gewährt.");
} else {
  console.log("Einlass verweigert.");
}
// Ausgabe: "Einlass verweigert." (istÜber18 ist false)

// ODER: eine Bedingung reicht
const istWochenende = false;
const istFeiertag = true;

if (istWochenende || istFeiertag) {
  console.log("Heute ist frei!");
}
// Ausgabe: "Heute ist frei!"

// NICHT
const istRegen = false;
if (!istRegen) {
  console.log("Wir können nach draußen gehen.");
}
// Ausgabe: "Wir können nach draußen gehen."
```

```javascript
// Arithmetische Operatoren
console.log(10 % 3);  // 1  (Rest bei Division: 10 = 3*3 + 1)
console.log(2 ** 8);  // 256 (Potenz: 2 hoch 8)
console.log(7 / 2);   // 3.5

// Praktischer Einsatz von %: prüfen, ob eine Zahl gerade ist
function istGerade(zahl) {
  return zahl % 2 === 0;
}
console.log(istGerade(4)); // true
console.log(istGerade(7)); // false
```

```javascript
// Truthy / Falsy und der ternäre Operator (Kurzform für if/else)
const eingabe = "";

if (eingabe) {
  console.log("Es wurde etwas eingegeben.");
} else {
  console.log("Eingabe ist leer."); // dieser Zweig wird ausgeführt, "" ist falsy
}

// Ternärer Operator: bedingung ? wertWennWahr : wertWennFalsch
const alter = 16;
const status = alter >= 18 ? "volljährig" : "minderjährig";
console.log(status); // "minderjährig"

// Nullish Coalescing (??) vs. ||
const eingabeMenge = 0;
console.log(eingabeMenge || 10); // 10 -> || behandelt 0 als falsy, nimmt Fallback
console.log(eingabeMenge ?? 10); // 0  -> ?? behandelt 0 als gültigen Wert (nicht null/undefined)
```

### ⚠️ Häufiger Fehler

`=` (eine Gleichheitszeichen) ist eine **Zuweisung**, `===` ist ein **Vergleich**. `if (alter = 18)` weist versehentlich 18 zu (und ist dabei immer "truthy"), statt zu prüfen, ob `alter` gleich 18 ist. Achte immer auf die doppelten/dreifachen Gleichheitszeichen in Bedingungen.

### 🎯 Übungsaufgabe

Schreibe eine Bedingung, die prüft, ob eine Person Auto fahren darf. Dafür braucht sie: einen Führerschein (`hatFuehrerschein`, Boolean) UND muss mindestens 18 Jahre alt sein (`alter`, Number). Gib je nach Ergebnis "Darf fahren" oder "Darf nicht fahren" aus. Schreibe die Bedingung danach zusätzlich als eine Zeile mit dem ternären Operator.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
const hatFuehrerschein = true;
const alter = 20;

if (hatFuehrerschein && alter >= 18) {
  console.log("Darf fahren");
} else {
  console.log("Darf nicht fahren");
}
// Ausgabe: "Darf fahren"

// Als ternärer Operator
const ergebnis = (hatFuehrerschein && alter >= 18) ? "Darf fahren" : "Darf nicht fahren";
console.log(ergebnis); // "Darf fahren"
```

</details>

---

## 1.3 Schleifen (`for`, `while`)

### Theorie

Schleifen wiederholen einen Codeblock, ohne dass du ihn manuell mehrfach hinschreiben musst – wie ein Fließband, das dieselbe Aktion für jedes ankommende Teil ausführt.

- **`for`-Schleife**: Ideal, wenn du **weißt**, wie oft (oder über welche Menge) du iterieren willst. Sie besteht aus drei Teilen: Startwert, Bedingung, Schritt.
- **`while`-Schleife**: Ideal, wenn du **nicht genau weißt**, wie oft die Wiederholung nötig ist – sie läuft, solange eine Bedingung `true` bleibt.
- **`do...while`-Schleife**: Wie `while`, aber der Codeblock wird **mindestens einmal** ausgeführt, bevor die Bedingung geprüft wird.
- **`for...of`-Schleife**: Eine moderne, sehr lesbare Art, direkt über die *Werte* eines Arrays (oder anderer iterierbarer Objekte) zu gehen, ohne dich um den Index kümmern zu müssen.

Mit **`break`** kannst du eine Schleife vorzeitig komplett verlassen, mit **`continue`** überspringst du nur den aktuellen Durchlauf und machst mit dem nächsten weiter.

### Code-Beispiele

```javascript
// for-Schleife: zählt von 1 bis 5
for (let i = 1; i <= 5; i++) {
  console.log("Durchlauf Nummer:", i);
}
// Ausgabe: Durchlauf Nummer: 1
//          Durchlauf Nummer: 2
//          Durchlauf Nummer: 3
//          Durchlauf Nummer: 4
//          Durchlauf Nummer: 5
```

```javascript
// while-Schleife: läuft, bis eine Bedingung nicht mehr zutrifft
let batterieLevel = 100;

while (batterieLevel > 0) {
  console.log(`Batterie bei ${batterieLevel}%`);
  batterieLevel -= 25; // reduziert den Wert bei jedem Durchlauf
}
console.log("Akku leer!");
// Ausgabe: Batterie bei 100%
//          Batterie bei 75%
//          Batterie bei 50%
//          Batterie bei 25%
//          Akku leer!
```

```javascript
// for-Schleife über ein Array (klassisch) vs. for...of (modern)
const farben = ["Rot", "Grün", "Blau"];

for (let i = 0; i < farben.length; i++) {
  console.log(farben[i]);
}
// Rot, Grün, Blau

for (const farbe of farben) {
  console.log(farbe);
}
// Rot, Grün, Blau (gleiche Ausgabe, aber lesbarer)
```

```javascript
// break und continue
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break; // Schleife wird bei 5 komplett beendet
  }
  console.log(i);
}
// Ausgabe: 1, 2, 3, 4

for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue; // überspringt nur die 3
  }
  console.log(i);
}
// Ausgabe: 1, 2, 4, 5 (3 fehlt)
```

```javascript
// do...while: wird mindestens einmal ausgeführt
let versuch = 0;

do {
  versuch++;
  console.log(`Versuch Nummer ${versuch}`);
} while (versuch < 3);
// Ausgabe: Versuch Nummer 1, 2, 3
// (im Gegensatz zu while wird der Block auch ausgeführt, wenn die Bedingung von Anfang an falsch wäre)
```

### ⚠️ Häufiger Fehler

Eine `while`-Schleife, deren Bedingung sich nie ändert (z. B. weil du vergisst, die Zählvariable zu erhöhen), läuft **endlos** und lässt dein Programm/den Browser-Tab einfrieren. Achte immer darauf, dass sich der Zustand innerhalb der Schleife so verändert, dass die Bedingung irgendwann `false` wird.

### 🎯 Übungsaufgabe

Schreibe eine `for`-Schleife, die alle geraden Zahlen von 2 bis 10 ausgibt. Schreibe danach eine `while`-Schleife, die einen Countdown von 5 bis 1 ausgibt, gefolgt von "Start!". Schreibe zuletzt eine `for...of`-Schleife, die über das Array `["Montag", "Dienstag", "Mittwoch"]` geht und jeden Tag mit `continue` überspringt, wenn er mit "D" beginnt.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
// Gerade Zahlen von 2 bis 10
for (let i = 2; i <= 10; i += 2) {
  console.log(i);
}
// 2, 4, 6, 8, 10

// Countdown
let countdown = 5;
while (countdown >= 1) {
  console.log(countdown);
  countdown--;
}
console.log("Start!");

// for...of mit continue
const tage = ["Montag", "Dienstag", "Mittwoch"];
for (const tag of tage) {
  if (tag.startsWith("D")) {
    continue;
  }
  console.log(tag);
}
// Ausgabe: "Montag", "Mittwoch" (Dienstag wird übersprungen)
```

</details>

---

## 1.4 Grundlagen von Funktionen

### Theorie

Eine **Funktion** ist ein wiederverwendbares Rezept: Du gibst ihr Zutaten (**Parameter**), sie führt Schritte aus und liefert am Ende ein Ergebnis zurück (**Return-Wert**).

Ohne Funktionen müsstest du denselben Code immer wieder neu schreiben. Mit ihnen definierst du die Logik einmal und "rufst sie auf", wann immer du sie brauchst.

- **Parameter**: Die Platzhalter in der Funktionsdefinition (z. B. `zahl1`, `zahl2`).
- **Argumente**: Die konkreten Werte, die du beim Aufruf übergibst.
- **`return`**: Beendet die Funktion und gibt einen Wert an die Stelle zurück, an der die Funktion aufgerufen wurde. Ohne explizites `return` gibt eine Funktion automatisch `undefined` zurück.

Es gibt mehrere Wege, eine Funktion zu definieren:

1. **Funktionsdeklaration**: `function name() {}` – wird "gehoisted", d. h. du kannst sie sogar aufrufen, bevor sie im Code steht.
2. **Funktionsausdruck**: `const name = function() {}` – wird wie eine normale Variable behandelt, kein Hoisting.
3. **Arrow Function**: `const name = () => {}` – die moderne Kurzform (mehr dazu in Modul 2.1).

Funktionen können sich auch **selbst aufrufen** (Rekursion) – nützlich, um Probleme zu lösen, die sich natürlich in kleinere, gleichartige Teilprobleme zerlegen lassen.

### Code-Beispiele

```javascript
// Funktionsdeklaration mit Parametern und Rückgabewert
function addiere(zahl1, zahl2) {
  return zahl1 + zahl2;
}

const ergebnis = addiere(3, 4);
console.log(ergebnis); // 7
```

```javascript
// Funktion ohne Return-Wert (führt nur eine Aktion aus)
function begruesse(name) {
  console.log(`Hallo, ${name}!`);
}

begruesse("Julia"); // Hallo, Julia!
console.log(begruesse("Julia")); // Hallo, Julia! (Ausgabe der Funktion)
                                  // undefined  (Rückgabewert, da kein return vorhanden)
```

```javascript
// Parameter mit Standardwert
function berechnePreis(grundpreis, rabattProzent = 0) {
  const rabatt = grundpreis * (rabattProzent / 100);
  return grundpreis - rabatt;
}

console.log(berechnePreis(100));      // 100 (kein Rabatt angegeben)
console.log(berechnePreis(100, 20));  // 80
```

```javascript
// Funktionsausdruck (Function Expression) vs. Funktionsdeklaration
console.log(deklaration(2)); // 4 -> funktioniert, weil "gehoisted"

function deklaration(x) {
  return x * 2;
}

// console.log(ausdruck(2)); // FEHLER: ausdruck existiert an dieser Stelle noch nicht
const ausdruck = function (x) {
  return x * 2;
};
console.log(ausdruck(2)); // 4 -> funktioniert erst NACH der Zeile
```

```javascript
// Rekursion: eine Funktion, die sich selbst aufruft
function fakultaet(n) {
  if (n <= 1) {
    return 1; // Abbruchbedingung ("Basisfall") - ohne das läuft es endlos!
  }
  return n * fakultaet(n - 1);
}

console.log(fakultaet(5)); // 5 * 4 * 3 * 2 * 1 = 120
```

### ⚠️ Häufiger Fehler

Bei Rekursion vergisst man leicht die **Abbruchbedingung** (Basisfall). Ohne sie ruft sich die Funktion unendlich oft selbst auf, bis JavaScript mit `RangeError: Maximum call stack size exceeded` abbricht (der Call Stack läuft über – siehe Modul 3.5).

### 🎯 Übungsaufgabe

Schreibe eine Funktion `istVolljaehrig(alter)`, die `true` zurückgibt, wenn `alter` größer oder gleich 18 ist, sonst `false`. Teste sie mit zwei verschiedenen Werten. Schreibe zusätzlich eine rekursive Funktion `summeVon1Bis(n)`, die die Summe aller Zahlen von 1 bis `n` berechnet (z. B. `summeVon1Bis(4)` → `1+2+3+4 = 10`).

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
function istVolljaehrig(alter) {
  return alter >= 18;
}

console.log(istVolljaehrig(16)); // false
console.log(istVolljaehrig(21)); // true

function summeVon1Bis(n) {
  if (n <= 1) {
    return n; // Basisfall
  }
  return n + summeVon1Bis(n - 1);
}

console.log(summeVon1Bis(4)); // 10
console.log(summeVon1Bis(10)); // 55
```

</details>

---

## 1.5 Arrays

### Theorie

Ein **Array** ist eine geordnete Liste von Werten – wie eine nummerierte Reihe von Schließfächern. Jedes Fach hat einen **Index**, der bei `0` beginnt (nicht bei 1!).

Wichtige Grundoperationen:

- **Erstellen**: `const liste = [1, 2, 3];`
- **Zugriff per Index**: `liste[0]` liefert das erste Element.
- **`push()`**: Fügt ein Element am Ende hinzu.
- **`pop()`**: Entfernt das letzte Element und gibt es zurück.
- **`unshift()` / `shift()`**: Fügt ein Element am Anfang hinzu bzw. entfernt es von dort.
- **`length`**: Anzahl der Elemente im Array.
- **`indexOf()` / `includes()`**: Position eines Elements finden bzw. prüfen, ob es enthalten ist.
- **`slice()`**: Gibt einen **Ausschnitt** des Arrays zurück, ohne das Original zu verändern.
- **`splice()`**: Entfernt und/oder fügt Elemente **direkt im Original-Array** ein (verändert es!).

Arrays in JavaScript können übrigens gemischte Datentypen enthalten (`[1, "zwei", true]`) – das ist erlaubt, aber in der Praxis meist unübersichtlich und sollte vermieden werden.

### Code-Beispiele

```javascript
// Array erstellen und per Index zugreifen
const obst = ["Apfel", "Banane", "Kirsche"];

console.log(obst[0]); // "Apfel" (Index 0 = erstes Element)
console.log(obst[2]); // "Kirsche"
console.log(obst.length); // 3
console.log(obst[obst.length - 1]); // "Kirsche" -> letztes Element per length
```

```javascript
// Elemente hinzufügen und entfernen (verändert das Original)
const einkaufsliste = ["Milch", "Brot"];

einkaufsliste.push("Eier"); // fügt am Ende hinzu
console.log(einkaufsliste); // ["Milch", "Brot", "Eier"]

const entferntesElement = einkaufsliste.pop(); // entfernt das letzte
console.log(entferntesElement); // "Eier"
console.log(einkaufsliste); // ["Milch", "Brot"]

einkaufsliste.unshift("Kaffee"); // fügt am ANFANG hinzu
console.log(einkaufsliste); // ["Kaffee", "Milch", "Brot"]

einkaufsliste.shift(); // entfernt das ERSTE Element
console.log(einkaufsliste); // ["Milch", "Brot"]
```

```javascript
// Suchen in Arrays
const namen = ["Anna", "Ben", "Clara", "David"];

console.log(namen.indexOf("Clara"));  // 2 (Index von "Clara")
console.log(namen.indexOf("Frank"));  // -1 (nicht gefunden)
console.log(namen.includes("Ben"));   // true
console.log(namen.includes("Frank")); // false
```

```javascript
// slice vs. splice - ein häufiger Verwechslungspunkt!
const zahlen = [10, 20, 30, 40, 50];

// slice(start, ende): gibt einen NEUEN Ausschnitt zurück, Original bleibt unangetastet
const ausschnitt = zahlen.slice(1, 3);
console.log(ausschnitt); // [20, 30] (Index 1 bis exklusiv 3)
console.log(zahlen);     // [10, 20, 30, 40, 50] -> unverändert!

// splice(start, deleteCount, ...neueElemente): verändert das ORIGINAL-Array
const zahlenKopie = [10, 20, 30, 40, 50];
zahlenKopie.splice(1, 2, 99); // ab Index 1, entferne 2 Elemente, füge 99 ein
console.log(zahlenKopie); // [10, 99, 40, 50] -> Original wurde verändert!
```

```javascript
// Array mit einer for-Schleife durchlaufen und Summe berechnen
const preise = [10, 20, 30, 40];
let summe = 0;

for (let i = 0; i < preise.length; i++) {
  summe += preise[i];
}

console.log("Summe:", summe); // Summe: 100

// Verschachtelte Arrays (Array in Array, z.B. für eine Matrix)
const matrix = [
  [1, 2, 3],
  [4, 5, 6]
];
console.log(matrix[1][2]); // 6 (zweite Zeile, drittes Element)
```

### ⚠️ Häufiger Fehler

`slice()` und `splice()` klingen ähnlich, verhalten sich aber grundlegend anders: `slice()` verändert das Original **nicht**, `splice()` **schon**. Wenn du unerwartet dein Original-Array verändert siehst, prüfe zuerst, ob du versehentlich `splice()` statt `slice()` verwendet hast.

### 🎯 Übungsaufgabe

Erstelle ein Array `namen` mit drei Namen. Füge mit `push()` einen vierten Namen hinzu. Gib das Array und seine `length` aus. Entferne danach das letzte Element mit `pop()` und gib das Array erneut aus. Prüfe zuletzt mit `includes()`, ob "Tom" im Array enthalten ist, und erstelle mit `slice()` einen Ausschnitt der ersten beiden Namen.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
const namen = ["Lisa", "Tom", "Sara"];
namen.push("Ben");

console.log(namen);        // ["Lisa", "Tom", "Sara", "Ben"]
console.log(namen.length); // 4

namen.pop();
console.log(namen); // ["Lisa", "Tom", "Sara"]

console.log(namen.includes("Tom")); // true

const ersteZwei = namen.slice(0, 2);
console.log(ersteZwei); // ["Lisa", "Tom"]
console.log(namen);     // ["Lisa", "Tom", "Sara"] -> unverändert
```

</details>

---

## 1.6 Objekte

### Theorie

Ein **Objekt** ist eine Sammlung von zusammengehörigen Daten in Form von **Schlüssel-Wert-Paaren** (Key-Value-Pairs) – wie ein Ausweis mit Feldern: `Name: "Anna"`, `Alter: 30`.

Auf Eigenschaften kannst du auf zwei Arten zugreifen:

- **Dot-Notation**: `person.name` – der übliche, lesbare Weg.
- **Bracket-Notation**: `person["name"]` – nötig, wenn der Schlüsselname eine Variable ist oder Sonderzeichen/Leerzeichen enthält.

Der Unterschied zu einem Array: Ein Array ordnet Werte per **Index** (Reihenfolge), ein Objekt ordnet Werte per **benanntem Schlüssel** (Bedeutung).

Nützliche eingebaute Werkzeuge rund um Objekte:

- **`Object.keys(obj)`**: Gibt ein Array aller Schlüssel zurück.
- **`Object.values(obj)`**: Gibt ein Array aller Werte zurück.
- **`Object.entries(obj)`**: Gibt ein Array von `[schlüssel, wert]`-Paaren zurück – nützlich zum Durchlaufen.
- **`delete obj.eigenschaft`**: Entfernt eine Eigenschaft.
- **`"schluessel" in obj`**: Prüft, ob ein Schlüssel im Objekt existiert.

### Code-Beispiele

```javascript
// Objekt erstellen und per Dot-Notation zugreifen
const person = {
  name: "Anna",
  alter: 30,
  istStudentin: false
};

console.log(person.name);  // "Anna"
console.log(person.alter); // 30
```

```javascript
// Bracket-Notation: nützlich mit dynamischen Schlüsseln
const auto = {
  marke: "Toyota",
  farbe: "Rot"
};

const gesuchterSchluessel = "farbe";
console.log(auto[gesuchterSchluessel]); // "Rot" (funktioniert nur mit []!)
// auto.gesuchterSchluessel würde NICHT funktionieren

// Neue Eigenschaft hinzufügen
auto.baujahr = 2020;
console.log(auto); // { marke: "Toyota", farbe: "Rot", baujahr: 2020 }

// Eigenschaft entfernen und Existenz prüfen
delete auto.farbe;
console.log(auto); // { marke: "Toyota", baujahr: 2020 }
console.log("marke" in auto); // true
console.log("farbe" in auto); // false
```

```javascript
// Objekt mit einer Methode (Funktion als Eigenschaft)
const rechner = {
  wert: 10,
  verdoppeln() {
    return this.wert * 2;
  }
};

console.log(rechner.verdoppeln()); // 20
```

```javascript
// Verschachtelte Objekte (Objekte in Objekten - sehr häufig in der Praxis!)
const firma = {
  name: "TechCorp",
  adresse: {
    strasse: "Hauptstraße 1",
    stadt: "Berlin"
  },
  mitarbeiter: ["Anna", "Ben"]
};

console.log(firma.adresse.stadt); // "Berlin"
console.log(firma.mitarbeiter[0]); // "Anna"
```

```javascript
// Object.keys, Object.values, Object.entries - nützlich zum Durchlaufen
const noten = { mathe: 2, deutsch: 1, sport: 3 };

console.log(Object.keys(noten));   // ["mathe", "deutsch", "sport"]
console.log(Object.values(noten)); // [2, 1, 3]
console.log(Object.entries(noten)); // [["mathe", 2], ["deutsch", 1], ["sport", 3]]

// Praktischer Einsatz: alle Fächer und Noten ausgeben
for (const [fach, note] of Object.entries(noten)) {
  console.log(`${fach}: Note ${note}`);
}
// mathe: Note 2
// deutsch: Note 1
// sport: Note 3
```

### ⚠️ Häufiger Fehler

`for...in` (für Objekte) und `for...of` (für Arrays/iterierbare Werte) werden oft verwechselt. `for (const key in objekt)` gibt dir die **Schlüssel**, `for (const wert of array)` gibt dir die **Werte**. Ein `for...of` auf einem einfachen Objekt funktioniert *nicht* direkt (Objekte sind standardmäßig nicht iterierbar) – dafür brauchst du `Object.entries()`, `Object.keys()` oder `Object.values()`.

### 🎯 Übungsaufgabe

Erstelle ein Objekt `buch` mit den Eigenschaften `titel`, `autor` und `seiten`. Gib den `titel` per Dot-Notation und den `autor` per Bracket-Notation aus. Füge danach eine neue Eigenschaft `erschienen` (Jahr) hinzu. Gib zuletzt mit einer `for...of`-Schleife über `Object.entries()` alle Schlüssel-Wert-Paare des Objekts aus.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
const buch = {
  titel: "Der Weg zum Meister",
  autor: "Max Mustermann",
  seiten: 320
};

console.log(buch.titel);      // "Der Weg zum Meister"
console.log(buch["autor"]);   // "Max Mustermann"

buch.erschienen = 2022;
console.log(buch);
// { titel: "Der Weg zum Meister", autor: "Max Mustermann", seiten: 320, erschienen: 2022 }

for (const [schluessel, wert] of Object.entries(buch)) {
  console.log(`${schluessel}: ${wert}`);
}
// titel: Der Weg zum Meister
// autor: Max Mustermann
// seiten: 320
// erschienen: 2022
```

</details>

---

## 📋 Zusammenfassung & Cheat-Sheet

| Thema | Syntax / Beispiel | Kurzbeschreibung |
|---|---|---|
| Variable (fest) | `const x = 1;` | Standardwahl, kann nicht neu zugewiesen werden |
| Variable (veränderbar) | `let x = 1;` | Nur nutzen, wenn sich der Wert wirklich ändert |
| Strikter Vergleich | `a === b` | Vergleicht Wert **und** Typ – Standardwahl |
| Logische Operatoren | `&&`, `\|\|`, `!` | UND, ODER, NICHT |
| Nullish Coalescing | `a ?? fallback` | Fallback nur bei `null`/`undefined`, nicht bei `0`/`""` |
| Zähl-Schleife | `for (let i = 0; i < n; i++) {}` | Wenn die Anzahl der Durchläufe bekannt ist |
| Bedingte Schleife | `while (bedingung) {}` | Wenn die Anzahl der Durchläufe unbekannt ist |
| Werte-Schleife | `for (const x of array) {}` | Moderne, lesbare Iteration über Arrays |
| Funktion | `function f(a, b) { return a + b; }` | Wiederverwendbarer Codeblock mit Rückgabewert |
| Array-Zugriff | `arr[0]`, `arr.length` | Index startet bei `0` |
| Array anhängen/entfernen | `arr.push(x)` / `arr.pop()` | Verändert das Original-Array |
| Array-Ausschnitt (sicher) | `arr.slice(start, ende)` | Original bleibt unverändert |
| Array verändern | `arr.splice(start, anzahl)` | Verändert das Original-Array |
| Objekt-Zugriff | `obj.key` / `obj["key"]` | Dot- bzw. Bracket-Notation |
| Objekt durchlaufen | `Object.entries(obj)` | Liefert `[schlüssel, wert]`-Paare |

---

⬅️ [Zurück zur Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 2: Der nächste Schritt](../modul-2-mittelstufe/README.md)

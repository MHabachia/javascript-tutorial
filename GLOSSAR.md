# 📖 Glossar

Alle Fachbegriffe aus dem Kurs an einem Ort – zum schnellen Nachschlagen, ohne ein ganzes Modul durchsuchen zu müssen. Sortiert alphabetisch; die Kapitel-Verweise führen zur ausführlichen Erklärung mit Beispielen.

⬅️ [Zurück zur Kursübersicht](./README.md)

---

## A

**API (Application Programming Interface)** — Eine Schnittstelle, über die Programme miteinander kommunizieren, ohne die interne Umsetzung des Gegenübers zu kennen. → [Modul 3.2](./modul-3-fortgeschritten/README.md#32-externe-apis-konsumieren-fetch-api-rest-json)

**Array** — Eine geordnete Liste von Werten, zugänglich über einen bei `0` beginnenden Index. → [Modul 1.5](./modul-1-fundamente/README.md#15-arrays)

**Arrow Function** — Kompakte Funktionsschreibweise (`(a, b) => a + b`) ohne eigenes `this`. → [Modul 2.1](./modul-2-mittelstufe/README.md#21-moderne-syntax-arrow-functions-template-literals-destructuring-spread-operator)

**async/await** — Syntax, die asynchronen Code wie synchronen Code aussehen lässt; baut auf Promises auf. → [Modul 3.1](./modul-3-fortgeschritten/README.md#31-asynchrones-javascript-callbacks-promises-asyncawait)

## B

**bcrypt / bcryptjs** — Library zum sicheren, irreversiblen Hashen von Passwörtern inklusive automatischem Salt. → [Modul 6.1](./modul-6-sicherheit-auth/README.md#61-passwörter-sicher-speichern-hashing-mit-bcrypt)

**Block-Scope** — Gültigkeitsbereich, der auf den umgebenden `{}`-Block begrenzt ist (gilt für `let`/`const`, nicht für `var`). → [Modul 1.1](./modul-1-fundamente/README.md#11-variablen-let-const--datentypen)

**Branch (Git)** — Eine parallele Entwicklungslinie im Repository, z. B. für ein einzelnes Feature. → [Modul 5.1](./modul-5-werkzeuge-workflow/README.md#51-git--github-grundlagen)

## C

**Callback** — Eine Funktion, die als Argument übergeben und später aufgerufen wird. → [Modul 3.1](./modul-3-fortgeschritten/README.md#31-asynchrones-javascript-callbacks-promises-asyncawait)

**Callback Queue / Macrotask Queue** — Warteschlange für fertige Callbacks (z. B. von `setTimeout`), die auf den freien Call Stack wartet. → [Modul 3.5](./modul-3-fortgeschritten/README.md#35-der-event-loop-call-stack-web-apis-callback-queue)

**Call Stack** — Stapel der aktuell laufenden Funktionsaufrufe (LIFO-Prinzip). → [Modul 3.5](./modul-3-fortgeschritten/README.md#35-der-event-loop-call-stack-web-apis-callback-queue)

**Closure** — Eine innere Funktion, die sich dauerhaft Zugriff auf die Variablen ihrer äußeren Funktion "merkt". → [Modul 3.3](./modul-3-fortgeschritten/README.md#33-scope--closures)

**Commit (Git)** — Ein gespeicherter Schnappschuss von Änderungen in der Projekt-Historie. → [Modul 5.1](./modul-5-werkzeuge-workflow/README.md#51-git--github-grundlagen)

**const** — Deklariert eine Variable, die nicht neu zugewiesen werden kann (Objekt-/Array-Inhalte bleiben dennoch veränderbar). → [Modul 1.1](./modul-1-fundamente/README.md#11-variablen-let-const--datentypen)

**CSRF (Cross-Site Request Forgery)** — Angriff, bei dem eine fremde Seite unbemerkt Anfragen im Namen eines eingeloggten Nutzers auslöst. → [Modul 6.4](./modul-6-sicherheit-auth/README.md#64-web-sicherheit-grundlagen)

**CI (Continuous Integration)** — Praxis, bei der Tests automatisch bei jedem Push/Pull Request laufen, statt nur lokal von Hand. → [Modul 5.4](./modul-5-werkzeuge-workflow/README.md#54-automatisiertes-testen-mit-github-actions-ci)

## D

**Debounce** — Verzögert die Ausführung einer Funktion, bis für eine festgelegte Zeit keine weiteren Aufrufe mehr kommen (z. B. bei einer Live-Suche). → [Modul 2.8](./modul-2-mittelstufe/README.md#28-performance-bei-events-debounce--throttle)

**Design Pattern** — Eine bewährte, wiederverwendbare Lösung für ein wiederkehrendes Programmierproblem (z. B. Singleton, Factory, Observer). → [Modul 7.2](./modul-7-typescript-patterns/README.md#72-design-patterns-in-javascript)

**Destructuring** — Werte gezielt aus Arrays oder Objekten in eigene Variablen "entpacken". → [Modul 2.1](./modul-2-mittelstufe/README.md#21-moderne-syntax-arrow-functions-template-literals-destructuring-spread-operator)

**Docker Image / Container** — Ein Image ist der Bauplan einer Anwendung, ein Container die daraus gestartete, laufende Instanz. → [Modul 8.3](./modul-8-deployment/README.md#83-docker-grundlagen)

**DOM (Document Object Model)** — Die Baumstruktur-Repräsentation einer HTML-Seite, mit der JavaScript zur Laufzeit arbeitet. → [Modul 2.3](./modul-2-mittelstufe/README.md#23-dom-manipulation)

**dotenv** — Node-Paket, das Werte aus einer `.env`-Datei automatisch in `process.env` lädt. → [Modul 5.3](./modul-5-werkzeuge-workflow/README.md#53-umgebungsvariablen--secrets)

## E

**Eigene Error-Klasse (Custom Error)** — Eine Klasse, die von `Error` erbt (`class X extends Error`), um Fehlertypen per `instanceof` gezielt zu unterscheiden und zu behandeln. → [Modul 3.6](./modul-3-fortgeschritten/README.md#36-fehlerbehandlung-mit-eigenen-error-klassen)

**ESLint** — Ein Linter: findet automatisch Fehler und Stilprobleme im JavaScript-Code. → [Modul 5.2](./modul-5-werkzeuge-workflow/README.md#52-code-qualität-eslint--prettier)

**Event** — Ein Ereignis im Browser, z. B. ein Klick oder eine Tastatureingabe. → [Modul 2.4](./modul-2-mittelstufe/README.md#24-events--event-listener)

**Event Bubbling** — Ein Event "blubbert" nach dem Auslösen durch alle Elternelemente nach oben. → [Modul 2.4](./modul-2-mittelstufe/README.md#24-events--event-listener)

**Event Delegation** — Ein einzelner Listener auf einem Elternelement steuert das Verhalten vieler (auch später hinzugefügter) Kindelemente. → [Modul 2.4](./modul-2-mittelstufe/README.md#24-events--event-listener)

**Event Loop** — Der Mechanismus, der Call Stack, Web APIs und Warteschlangen koordiniert und JavaScript trotz Single-Thread asynchron arbeiten lässt. → [Modul 3.5](./modul-3-fortgeschritten/README.md#35-der-event-loop-call-stack-web-apis-callback-queue)

**Express.js** — Das populärste Web-Framework für Node.js zum Bauen von HTTP-Servern und APIs. → [Modul 4.3](./modul-4-profi-nodejs/README.md#43-eigene-apis-bauen-expressjs)

## F

**Factory Pattern** — Eine Funktion, die je nach Eingabe unterschiedliche Objekte erzeugt, statt `new` mit Bedingungen zu verstreuen. → [Modul 7.2](./modul-7-typescript-patterns/README.md#72-design-patterns-in-javascript)

**Falsy / Truthy** — Werte, die sich in Bedingungen wie `false` bzw. `true` verhalten (falsy: `0`, `""`, `null`, `undefined`, `NaN`, `false`). → [Modul 1.2](./modul-1-fundamente/README.md#12-operatoren--logik)

**fetch()** — Eingebautes JavaScript-Werkzeug zum Senden von HTTP-Anfragen, gibt ein Promise zurück. → [Modul 3.2](./modul-3-fortgeschritten/README.md#32-externe-apis-konsumieren-fetch-api-rest-json)

**filter()** — Array-Methode, die ein neues Array nur mit den Elementen zurückgibt, die eine Bedingung erfüllen. → [Modul 2.2](./modul-2-mittelstufe/README.md#22-wichtige-array-methoden-map-filter-reduce)

## G

**GitHub Actions** — Das in GitHub eingebaute CI-Werkzeug; führt Workflow-Dateien aus `.github/workflows/` automatisch bei Push/Pull Request aus. → [Modul 5.4](./modul-5-werkzeuge-workflow/README.md#54-automatisiertes-testen-mit-github-actions-ci)

**Generics (TypeScript)** — Wiederverwendbare Funktionen/Typen, die mit einem Platzhalter-Typ (`<T>`) für beliebige konkrete Typen arbeiten. → [Modul 7.1](./modul-7-typescript-patterns/README.md#71-typescript-einstieg)

**Git** — Ein Versionskontrollsystem, das Änderungen an Dateien über die Zeit nachverfolgt. → [Modul 5.1](./modul-5-werkzeuge-workflow/README.md#51-git--github-grundlagen)

## H

**Helmet** — Express-Middleware, die sinnvolle Sicherheits-HTTP-Header automatisch setzt. → [Modul 6.4](./modul-6-sicherheit-auth/README.md#64-web-sicherheit-grundlagen)

**Hoisting** — Verhalten, bei dem Deklarationen (v. a. bei `var` und Funktionsdeklarationen) an den Anfang ihres Scopes "hochgezogen" werden. → [Modul 1.1](./modul-1-fundamente/README.md#11-variablen-let-const--datentypen)

## I

**Immutability (Unveränderlichkeit)** — Prinzip, bei dem Daten nicht direkt verändert, sondern neue Versionen erzeugt werden (z. B. `map`/`filter` statt einer Schleife mit direkter Änderung). → [Modul 2.2](./modul-2-mittelstufe/README.md#22-wichtige-array-methoden-map-filter-reduce)

**Integrationstest** — Test, der das Zusammenspiel mehrerer Teile prüft (z. B. eine komplette API-Route inklusive Middleware). → [Modul 7.3](./modul-7-typescript-patterns/README.md#73-testing-vertiefung-supertest--mocking)

**Interface (TypeScript)** — Beschreibt die erwartete Form eines Objekts (welche Eigenschaften mit welchen Typen). → [Modul 7.1](./modul-7-typescript-patterns/README.md#71-typescript-einstieg)

## J

**jsdom** — Eine JavaScript-Implementierung des DOM, mit der Jest browserähnlichen Code (`document`, Elemente, Events) ohne echten Browser testen kann. → [Modul 7.4](./modul-7-typescript-patterns/README.md#74-frontend-testing-dom-code-ohne-browser-testen)

**Jest** — Beliebtes JavaScript-Test-Framework mit `describe`, `test`, `expect`. → [Modul 4.2](./modul-4-profi-nodejs/README.md#42-testing-jest)

**JSON (JavaScript Object Notation)** — Textbasiertes, weit verbreitetes Datenformat für den Datenaustausch, sieht aus wie ein JS-Objekt. → [Modul 3.2](./modul-3-fortgeschritten/README.md#32-externe-apis-konsumieren-fetch-api-rest-json)

**JWT (JSON Web Token)** — Ein signierter, selbsttragender Token zum Nachweis eines Logins, ohne dass der Server einen Zustand speichern muss. → [Modul 6.2](./modul-6-sicherheit-auth/README.md#62-sessions-vs-jwt)

## L

**let** — Deklariert eine Variable, deren Wert später neu zugewiesen werden darf. → [Modul 1.1](./modul-1-fundamente/README.md#11-variablen-let-const--datentypen)

**localStorage** — Speichert Schlüssel-Wert-Paare (nur Strings) im Browser dauerhaft, auch über einen Browser-Neustart hinweg. → [Modul 2.6](./modul-2-mittelstufe/README.md#26-datenpersistenz-im-browser-localstorage--sessionstorage)

**Lexical Scope** — Der Scope einer Funktion wird durch ihre Position im Code bestimmt, nicht dadurch, von wo sie aufgerufen wird. → [Modul 3.3](./modul-3-fortgeschritten/README.md#33-scope--closures)

**Linter** — Werkzeug, das Code automatisch auf Fehler und Stilprobleme prüft (z. B. ESLint). → [Modul 5.2](./modul-5-werkzeuge-workflow/README.md#52-code-qualität-eslint--prettier)

## M

**map()** — Array-Methode, die ein neues Array erzeugt, indem sie jedes Element transformiert. → [Modul 2.2](./modul-2-mittelstufe/README.md#22-wichtige-array-methoden-map-filter-reduce)

**Merge-Konflikt (Git)** — Tritt auf, wenn Git zwei widersprüchliche Änderungen an derselben Codezeile nicht automatisch zusammenführen kann. → [Modul 5.1](./modul-5-werkzeuge-workflow/README.md#51-git--github-grundlagen)

**Middleware (Express)** — Eine Funktion, die zwischen eingehender Anfrage und Antwort geschaltet wird und `next()` aufruft, um weiterzugeben. → [Modul 4.3](./modul-4-profi-nodejs/README.md#43-eigene-apis-bauen-expressjs)

**Microtask Queue** — Höher priorisierte Warteschlange für Promises, wird vor jedem Macrotask vollständig geleert. → [Modul 3.5](./modul-3-fortgeschritten/README.md#35-der-event-loop-call-stack-web-apis-callback-queue)

**Mocking** — Eine echte Abhängigkeit (z. B. eine API oder ein Modul) im Test durch eine kontrollierte Fake-Version ersetzen. → [Modul 7.3](./modul-7-typescript-patterns/README.md#73-testing-vertiefung-supertest--mocking)

**MongoDB / Mongoose** — Eine NoSQL-Datenbank für JSON-ähnliche Dokumente (MongoDB) und die Library, die den Zugriff darauf in Node.js vereinfacht (Mongoose). → [Modul 4.4](./modul-4-profi-nodejs/README.md#44-datenbank-anbindung-mongodbmongoose)

**Module (ES Modules / CommonJS)** — Zwei Systeme, um Code auf mehrere Dateien zu verteilen: modernes `import`/`export` bzw. älteres `require()`/`module.exports`. → [Modul 4.1](./modul-4-profi-nodejs/README.md#41-nodejs--npm-basics)

**Module Pattern** — Kapselt internen Zustand und exponiert nur ausgewählte Teile nach außen. → [Modul 7.2](./modul-7-typescript-patterns/README.md#72-design-patterns-in-javascript)

## N

**Node.js** — Eine Laufzeitumgebung, die JavaScript außerhalb des Browsers ausführt (z. B. auf einem Server). → [Modul 4.1](./modul-4-profi-nodejs/README.md#41-nodejs--npm-basics)

**npm (Node Package Manager)** — Werkzeug zum Installieren und Verwalten von JavaScript-Paketen. → [Modul 4.1](./modul-4-profi-nodejs/README.md#41-nodejs--npm-basics)

## O

**Observer Pattern** — Ein Objekt informiert mehrere "Abonnenten" automatisch über Änderungen (verwandt mit Event Listenern). → [Modul 7.2](./modul-7-typescript-patterns/README.md#72-design-patterns-in-javascript)

## P

**package.json** — Die zentrale Konfigurationsdatei eines Node-Projekts: Name, Version, Abhängigkeiten, Skripte. → [Modul 4.1](./modul-4-profi-nodejs/README.md#41-nodejs--npm-basics)

**Prettier** — Ein Formatter, der die Optik des Codes automatisch vereinheitlicht. → [Modul 5.2](./modul-5-werkzeuge-workflow/README.md#52-code-qualität-eslint--prettier)

**Promise** — Ein Objekt, das einen zukünftigen Wert repräsentiert, mit den Zuständen `pending`, `fulfilled`, `rejected`. → [Modul 3.1](./modul-3-fortgeschritten/README.md#31-asynchrones-javascript-callbacks-promises-asyncawait)

**Pull Request (GitHub)** — Eine Anfrage, eigene Änderungen aus einem Branch in ein anderes (meist Haupt-)Repository zu übernehmen. → [Modul 5.1](./modul-5-werkzeuge-workflow/README.md#51-git--github-grundlagen)

**Pure Function (reine Funktion)** — Eine Funktion ohne Seiteneffekte, die bei gleicher Eingabe immer dieselbe Ausgabe liefert – dadurch leicht testbar. → [Modul 4.2](./modul-4-profi-nodejs/README.md#42-testing-jest)

## R

**Regulärer Ausdruck (RegEx / RegExp)** — Eine Mini-Sprache zum Beschreiben von Textmustern, z. B. zur Validierung oder zum Suchen/Ersetzen (`/^\d+$/`, `.test()`, `.match()`, `.replace()`). → [Modul 2.5](./modul-2-mittelstufe/README.md#25-reguläre-ausdrücke-regex)

**Rate Limiting** — Begrenzung, wie oft eine Route in einem Zeitraum aufgerufen werden darf, z. B. um Brute-Force-Angriffe zu bremsen. → [Modul 6.4](./modul-6-sicherheit-auth/README.md#64-web-sicherheit-grundlagen)

**reduce()** — Array-Methode, die alle Elemente zu einem einzigen Wert zusammenfasst (z. B. eine Summe). → [Modul 2.2](./modul-2-mittelstufe/README.md#22-wichtige-array-methoden-map-filter-reduce)

**REST** — Ein weit verbreitetes Konzept, um Schnittstellen über HTTP mit den Methoden GET/POST/PUT/DELETE zu bauen. → [Modul 3.2](./modul-3-fortgeschritten/README.md#32-externe-apis-konsumieren-fetch-api-rest-json)

## S

**Salt** — Zufällige Zusatzdaten, die vor dem Hashen an ein Passwort angehängt werden, um Rainbow-Table-Angriffe zu verhindern. → [Modul 6.1](./modul-6-sicherheit-auth/README.md#61-passwörter-sicher-speichern-hashing-mit-bcrypt)

**Scope (Gültigkeitsbereich)** — Beschreibt, wo im Code eine Variable sichtbar/zugreifbar ist. → [Modul 3.3](./modul-3-fortgeschritten/README.md#33-scope--closures)

**Session** — Server-seitig gespeicherter Login-Zustand, mit dem der Client über eine Cookie-ID verknüpft ist. → [Modul 6.2](./modul-6-sicherheit-auth/README.md#62-sessions-vs-jwt)

**sessionStorage** — Wie `localStorage`, aber die Daten verschwinden automatisch, sobald der Tab geschlossen wird. → [Modul 2.6](./modul-2-mittelstufe/README.md#26-datenpersistenz-im-browser-localstorage--sessionstorage)

**Singleton Pattern** — Stellt sicher, dass von einer Klasse zur Laufzeit nur genau eine Instanz existiert. → [Modul 7.2](./modul-7-typescript-patterns/README.md#72-design-patterns-in-javascript)

**Spread-/Rest-Operator (`...`)** — Breitet Array-/Objektelemente aus (Spread) bzw. sammelt mehrere Werte in einem Array ein (Rest). → [Modul 2.1](./modul-2-mittelstufe/README.md#21-moderne-syntax-arrow-functions-template-literals-destructuring-spread-operator)

**State (Zustand) / Store** — Die aktuellen Daten, die bestimmen, was auf dem Bildschirm zu sehen ist; ein Store bündelt sie an einer zentralen Stelle mit `getState`/`setState`/`subscribe`. → [Modul 2.7](./modul-2-mittelstufe/README.md#27-einfaches-state-management-ohne-framework)

**Supertest** — Library zum Testen von Express-Routen über echte HTTP-Requests, ohne einen Server manuell starten zu müssen. → [Modul 7.3](./modul-7-typescript-patterns/README.md#73-testing-vertiefung-supertest--mocking)

## T

**Testing Library** — Bibliothek (z. B. `@testing-library/dom`), die DOM-Elemente so auswählt, wie ein Nutzer sie wahrnimmt (`getByText`, `getByRole`) statt über CSS-Selektoren. → [Modul 7.4](./modul-7-typescript-patterns/README.md#74-frontend-testing-dom-code-ohne-browser-testen)

**Template Literal** — String mit Backticks (`` ` ``), der eingebettete Ausdrücke (`${...}`) und Mehrzeiligkeit erlaubt. → [Modul 2.1](./modul-2-mittelstufe/README.md#21-moderne-syntax-arrow-functions-template-literals-destructuring-spread-operator)

**this** — Verweist innerhalb einer Funktion/Methode auf die Instanz, mit der gerade gearbeitet wird; der Wert hängt vom Aufruf ab (außer bei Arrow Functions). → [Modul 3.4](./modul-3-fortgeschritten/README.md#34-objektorientierung-in-js-klassen-constructor-this)

**Throttle** — Sorgt dafür, dass eine Funktion höchstens einmal pro festgelegtem Zeitintervall läuft, egal wie oft das Event dazwischen feuert (z. B. bei `scroll`). → [Modul 2.8](./modul-2-mittelstufe/README.md#28-performance-bei-events-debounce--throttle)

**TypeScript** — Eine Obermenge von JavaScript, die statische Typprüfung ergänzt und zu reinem JavaScript kompiliert wird. → [Modul 7.1](./modul-7-typescript-patterns/README.md#71-typescript-einstieg)

## U

**Union-Type (TypeScript)** — Ein Typ, der mehrere mögliche Typen zulässt, z. B. `string | number`. → [Modul 7.1](./modul-7-typescript-patterns/README.md#71-typescript-einstieg)

**Unit-Test** — Test, der eine einzelne Funktion oder Einheit isoliert prüft, oft mit gemockten Abhängigkeiten. → [Modul 4.2](./modul-4-profi-nodejs/README.md#42-testing-jest)

## V

**var** — Ältere Variablendeklaration ohne Block-Scope; wegen Hoisting-Eigenheiten in modernem Code vermeiden. → [Modul 1.1](./modul-1-fundamente/README.md#11-variablen-let-const--datentypen)

## W

**Web APIs** — Vom Browser bzw. von Node.js bereitgestellte Funktionen (z. B. `setTimeout`, `fetch`), die im Hintergrund arbeiten, ohne den Call Stack zu blockieren. → [Modul 3.5](./modul-3-fortgeschritten/README.md#35-der-event-loop-call-stack-web-apis-callback-queue)

## X

**XSS (Cross-Site Scripting)** — Angriff, bei dem fremder Script-Code über ungeprüften Nutzer-Input in eine Seite eingeschleust wird. → [Modul 2.3](./modul-2-mittelstufe/README.md#23-dom-manipulation) & [Modul 6.4](./modul-6-sicherheit-auth/README.md#64-web-sicherheit-grundlagen)

---

⬅️ [Zurück zur Kursübersicht](./README.md)

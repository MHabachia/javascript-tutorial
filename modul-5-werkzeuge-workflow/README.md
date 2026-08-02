# Modul 5: Werkzeuge & Workflow (Praxis)

⬅️ [Zurück zu Modul 4](../modul-4-profi-nodejs/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 6](../modul-6-sicherheit-auth/README.md)

In diesem Modul lernst du die Werkzeuge kennen, mit denen professionelle Entwickler:innen jeden Tag arbeiten – nicht mehr nur JavaScript-Syntax, sondern der komplette Workflow drumherum. Am Ende kannst du deinen Code versionieren, sauber halten und sicher konfigurieren.

## 🎯 Lernziele

Nach diesem Modul kannst du:
- Ein Git-Repository initialisieren, Änderungen verfolgen und in aussagekräftigen Commits festhalten
- Mit Branches parallel an Features arbeiten und Merge-Konflikte lösen
- Code über GitHub mit anderen teilen und den Pull-Request-Workflow durchführen
- ESLint und Prettier einrichten, um Codequalität und -stil automatisch zu sichern
- Sensible Daten wie API-Keys über Umgebungsvariablen sicher aus deinem Code heraushalten
- Ein Projekt so konfigurieren, dass es beim Fehlen wichtiger Konfiguration kontrolliert abbricht
- Einen GitHub-Actions-Workflow schreiben, der bei jedem Push automatisch die Tests ausführt

## Inhalt

- [5.1 Git & GitHub Grundlagen](#51-git--github-grundlagen)
- [5.2 Code-Qualität: ESLint & Prettier](#52-code-qualität-eslint--prettier)
- [5.3 Umgebungsvariablen & Secrets](#53-umgebungsvariablen--secrets)
- [5.4 Automatisiertes Testen mit GitHub Actions (CI)](#54-automatisiertes-testen-mit-github-actions-ci)

---

## 5.1 Git & GitHub Grundlagen

### Theorie

Stell dir vor, du schreibst an einem wichtigen Dokument und würdest nach jedem größeren Schritt eine Kopie speichern: `entwurf_v1.docx`, `entwurf_v2_final.docx`, `entwurf_v2_final_WIRKLICH_final.docx`. Genau dieses Chaos verhindert **Git**. Git ist ein **Versionskontrollsystem**: Es merkt sich jeden Zustand deines Projekts als benannten Schnappschuss (**Commit**) und du kannst jederzeit zu einem früheren Zustand zurück, Änderungen vergleichen oder mehrere Entwicklungsstränge parallel verfolgen.

Um zu verstehen, wie eine Änderung von deiner Festplatte in die Git-Historie wandert, hilft die Analogie eines Briefs, den du verschickst. Zuerst schreibst du den Brief – das ist dein **Working Directory** (Arbeitsverzeichnis), der Ordner, in dem du ganz normal Dateien bearbeitest. Dann steckst du die fertigen Seiten in einen Umschlag – das ist die **Staging Area** (auch „Index" genannt): Hier legst du gezielt fest, welche Änderungen beim nächsten Commit mitgehen sollen, nicht zwangsläufig alle. Erst wenn du den Umschlag zuklebst und in den Postausgang legst, ist er wirklich versendet – das ist der **Commit**, ein fester, unveränderlicher Eintrag im **Repository** (der Projekt-Historie). Dieses Drei-Bereiche-Modell – Working Directory → Staging Area → Repository – ist der Kern, den jeder Git-Befehl bedient.

Damit nicht jede Datei automatisch in diesen Prozess gerät, gibt es die `.gitignore`-Datei. Sie ist wie eine Liste „Diese Dinge kommen nicht in den Umschlag" – typischerweise `node_modules/`, Log-Dateien oder Konfigurationsdateien mit Geheimnissen (dazu mehr in 5.3).

Ein einzelner Entwicklungsstrang reicht selten aus. Mit **Branches** (Zweigen) kannst du parallele, isolierte Versionen deines Projekts erstellen – etwa um ein neues Feature zu bauen, ohne den funktionierenden Hauptzweig (oft `main` genannt) zu gefährden. Ist das Feature fertig, führst du die Änderungen mit `git merge` wieder zusammen. Manchmal wurde dieselbe Stelle in einer Datei in beiden Branches unterschiedlich verändert – dann entsteht ein **Merge-Konflikt**. Git kann nicht selbst entscheiden, welche Version „richtig" ist, und markiert die Konfliktstelle direkt in der Datei mit Markern wie `<<<<<<< HEAD`, `=======` und `>>>>>>> feature-branch`. Du musst dann von Hand auswählen (oder beide Versionen kombinieren), die Marker entfernen und die Datei erneut committen.

Bisher lief alles nur auf deinem eigenen Rechner (**lokales Repository**). Ein **Remote-Repository** – meist auf GitHub gehostet – ist die zentrale, geteilte Version deines Projekts in der Cloud. Mit `git push` schickst du deine lokalen Commits dorthin, mit `git pull` holst du Änderungen anderer zu dir. In offenen oder größeren Projekten läuft die Zusammenarbeit über einen festen Ablauf: Du erstellst einen **Fork** (deine eigene Kopie des Projekts auf GitHub) oder direkt einen **Branch**, machst dort deine Änderungen, öffnest einen **Pull Request** (die Bitte, deine Änderungen in den Hauptzweig zu übernehmen), jemand **reviewt** deinen Code – gibt also Feedback und Kommentare – und am Ende wird der Pull Request **gemerged**. Dieser Ablauf ist das Rückgrat praktisch jeder professionellen und Open-Source-Zusammenarbeit.

### Code-Beispiele

```bash
# Ein neues Repository in deinem Projektordner anlegen
git init
# Ausgabe: Initialized empty Git repository in /pfad/zum/projekt/.git/

# Status prüfen: Was hat sich geändert, was ist gestaged?
git status
# Ausgabe (Beispiel):
# On branch main
# Untracked files:
#   index.js
```

```bash
# Änderungen zur Staging Area hinzufügen (der "Umschlag")
git add index.js
# oder alle Änderungen auf einmal:
git add .

# Den Umschlag "versenden": einen Commit erstellen
git commit -m "Grundgerüst der App hinzugefügt"
# Ausgabe: [main (root-commit) a1b2c3d] Grundgerüst der App hinzugefügt
#  1 file changed, 10 insertions(+)
```

```bash
# Die Historie aller Commits ansehen
git log --oneline
# Ausgabe:
# a1b2c3d Grundgerüst der App hinzugefügt
# 9f8e7d6 Initiales Setup
```

```gitignore
# .gitignore – diese Dateien/Ordner werden von Git ignoriert
node_modules/
.env
*.log
dist/
```

```bash
# Einen neuen Branch erstellen und direkt hineinwechseln
git switch -c feature/login
# (älterer, gleichwertiger Befehl: git checkout -b feature/login)
# Ausgabe: Switched to a new branch 'feature/login'

# Änderungen committen, dann zurück zu main wechseln und mergen
git switch main
git merge feature/login
# Ausgabe: Fast-forward
#  login.js | 20 ++++++++++++++++++
```

```bash
# Mit GitHub verbinden, hochladen und Änderungen anderer holen
git remote add origin https://github.com/dein-name/dein-projekt.git
git push -u origin main
# Ausgabe: Branch 'main' set up to track 'origin/main'.

git pull origin main
# Ausgabe: Already up to date. (oder Liste der neu geholten Commits)

# Ein fremdes Repository lokal herunterladen
git clone https://github.com/dein-name/dein-projekt.git
```

### ⚠️ Häufiger Fehler

Anfänger:innen führen oft `git commit` aus, ohne vorher `git add` aufzurufen, und wundern sich, warum ihre Änderungen nicht im Commit landen (oder Git meldet „nothing to commit"). Denk an das Drei-Bereiche-Modell: Ohne `git add` liegt der Brief noch auf dem Schreibtisch, nicht im Umschlag – Git weiß gar nicht, dass du ihn versenden willst.

### 🎯 Übungsaufgabe

Erstelle einen neuen Ordner `mein-projekt`, initialisiere darin ein Git-Repository, lege eine Datei `README.md` mit dem Inhalt „Mein erstes Projekt" an, füge sie zur Staging Area hinzu und erstelle einen Commit mit einer passenden Nachricht. Erstelle danach einen Branch namens `feature/beschreibung`, ändere darin die `README.md` und merge den Branch zurück in `main`.

<details>
<summary>💡 Lösung anzeigen</summary>

```bash
mkdir mein-projekt
cd mein-projekt
git init

echo "Mein erstes Projekt" > README.md

git add README.md
git commit -m "Initiale README hinzugefügt"

git switch -c feature/beschreibung
echo "Ein Kurs-Projekt für JavaScript." >> README.md
git add README.md
git commit -m "Beschreibung zur README hinzugefügt"

git switch main
git merge feature/beschreibung
# Ausgabe: Fast-forward, README.md wurde aktualisiert
```

</details>

---

## 5.2 Code-Qualität: ESLint & Prettier

### Theorie

Wenn du einen Text schreibst, hilft dir eine Rechtschreibprüfung dabei, Tippfehler zu finden – aber sie sorgt nicht dafür, dass alle Absätze gleich eingerückt sind oder du überall dieselbe Anführungszeichen-Konvention nutzt. Für beides gibt es beim Programmieren zwei unterschiedliche Werkzeuge, die man leicht verwechselt.

Ein **Linter** wie **ESLint** ist die Rechtschreibprüfung für deinen Code: Er analysiert deinen JavaScript-Code und findet echte Probleme – ungenutzte Variablen, den Vergleich mit `==` statt `===`, potenzielle Bugs oder Verstöße gegen Team-Konventionen. Ein **Formatter** wie **Prettier** kümmert sich dagegen ausschließlich um die Optik: Einrückung, Zeilenumbrüche, Anführungszeichen, Semikolons. Er entscheidet nicht, ob dein Code richtig ist, sondern nur, wie er *aussieht* – und zwar konsequent gleich, egal wer im Team ihn geschrieben hat.

Der große Gewinn dieser Werkzeuge zeigt sich im Team: Ohne sie verbringen Code-Reviews viel Zeit mit Diskussionen wie „bitte hier ein Leerzeichen mehr" oder „diese Variable brauchst du doch gar nicht mehr". Mit ESLint und Prettier übernehmen Maschinen diese Kleinarbeit automatisch, und Menschen können sich auf das Wesentliche konzentrieren: Ist die Logik richtig, ist die Lösung gut durchdacht?

Beide Tools werden über Konfigurationsdateien gesteuert, in denen du Regeln festlegst oder bestehende Regelsätze (**Presets**) übernimmst. Über npm-Skripte machst du sie für dich und dein Team leicht aufrufbar, und in den meisten Code-Editoren lassen sie sich so einrichten, dass beim Speichern automatisch formatiert wird (**Format-on-Save**) – ganz ohne manuellen Aufruf.

### Code-Beispiele

```bash
# ESLint und Prettier als Entwicklungs-Abhängigkeiten installieren
npm install --save-dev eslint prettier
# Ausgabe: added 2 packages, and audited ... packages in 1s
```

```javascript
// eslint.config.js – minimale ESLint-Konfiguration (Flat Config, ESLint 9+)
export default [
  {
    rules: {
      "no-unused-vars": "warn",  // warnt bei ungenutzten Variablen
      eqeqeq: "error",           // erzwingt === statt ==
      "no-console": "off"        // console.log() ist im Kurs erlaubt
    }
  }
];
```

```json
// .prettierrc – Formatierungsregeln für Prettier
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

```json
// package.json (Ausschnitt) – npm-Skripte für Lint und Format
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

```bash
# Skripte ausführen
npm run lint
# Ausgabe (Beispiel):
# /projekt/index.js
#   3:7  warning  'ungenutzt' is assigned a value but never used  no-unused-vars

npm run format
# Ausgabe: index.js 45ms (Datei wurde automatisch neu formatiert)
```

### ⚠️ Häufiger Fehler

Viele Einsteiger:innen versuchen, ESLint-Fehler zur Formatierung zu nutzen (z. B. eigene Einrückungsregeln in ESLint zu definieren) und geraten dann in Konflikt mit Prettier, das dieselbe Datei anders formatiert. Die gängige Praxis: ESLint kümmert sich um Codequalität, Prettier ausschließlich um die Formatierung – beide Zuständigkeiten sauber trennen, statt sie zu vermischen.

### 🎯 Übungsaufgabe

Richte in einem kleinen Node.js-Projekt ESLint und Prettier ein: Installiere beide Pakete, erstelle eine `eslint.config.js` mit der Regel `eqeqeq: "error"` und eine `.prettierrc` mit `"singleQuote": true`. Füge die npm-Skripte `lint` und `format` hinzu und führe beide einmal aus.

<details>
<summary>💡 Lösung anzeigen</summary>

```bash
npm install --save-dev eslint prettier
```

```javascript
// eslint.config.js
export default [
  {
    rules: {
      eqeqeq: "error"
    }
  }
];
```

```json
// .prettierrc
{
  "singleQuote": true
}
```

```json
// package.json (Ausschnitt)
{
  "scripts": {
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

```bash
npm run lint
npm run format
```

</details>

---

## 5.3 Umgebungsvariablen & Secrets

### Theorie

Stell dir vor, du klebst den Schlüssel zu deiner Wohnung direkt außen an die Haustür, gut sichtbar für jeden, der vorbeikommt – genau das passiert, wenn du API-Keys, Datenbank-Passwörter oder andere **Secrets** (Geheimnisse) direkt im Quellcode schreibst und diesen dann per Git zu GitHub hochlädst. Selbst wenn das Repository später „privat" gesetzt wird: Die Historie bleibt bestehen, und einmal veröffentlichte Secrets gelten als kompromittiert und müssen ausgetauscht werden.

Die Lösung sind **Umgebungsvariablen** (Environment Variables): Werte, die nicht im Code, sondern außerhalb – in der Umgebung, in der dein Programm läuft – definiert werden. In der lokalen Entwicklung ist der gängige Weg eine `.env`-Datei im Projektordner, in der du Schlüssel-Wert-Paare wie `API_KEY=abc123` hinterlegst. Diese Datei liest du nicht selbst mit `fs.readFile` ein, sondern nutzt dafür das etablierte Paket **dotenv**, das die `.env`-Datei automatisch einliest und die Werte unter `process.env` verfügbar macht – dem globalen Objekt, über das Node.js dir Zugriff auf alle Umgebungsvariablen gibt.

Entscheidend ist: Die `.env`-Datei selbst gehört **niemals** in Git – sie muss zwingend in der `.gitignore` stehen. Damit andere Entwickler:innen (oder du selbst in sechs Monaten) trotzdem wissen, welche Variablen das Projekt überhaupt braucht, legt man üblicherweise eine `.env.example`-Datei an. Sie zeigt dieselben Variablennamen, aber mit Platzhaltern statt echten Werten, und *wird* mit in Git eingecheckt – sie enthält ja keine Geheimnisse, nur die Struktur.

Ein robustes Projekt prüft außerdem beim Start, ob alle zwingend benötigten Umgebungsvariablen überhaupt gesetzt sind. Fehlt zum Beispiel der Datenbank-Verbindungsstring, sollte die Anwendung nicht mit einem kryptischen Fehler mitten im Betrieb abstürzen, sondern direkt beim Start kontrolliert abbrechen und eine klare, verständliche Fehlermeldung ausgeben.

### Code-Beispiele

```bash
# dotenv installieren
npm install dotenv
# Ausgabe: added 1 package, and audited ... packages in 1s
```

```bash
# .env – lokale, geheime Werte (NICHT in Git!)
API_KEY=sk-echt-geheimer-schluessel-123
DATABASE_URL=postgres://user:passwort@localhost:5432/meinedb
PORT=3000
```

```bash
# .env.example – Vorlage ohne echte Werte (WIRD in Git eingecheckt)
API_KEY=dein-api-schluessel-hier
DATABASE_URL=postgres://user:passwort@host:5432/datenbankname
PORT=3000
```

```javascript
// index.js – dotenv laden und Umgebungsvariablen nutzen
import "dotenv/config"; // lädt automatisch die Werte aus .env in process.env

console.log(process.env.PORT);
// Ausgabe: 3000

const apiKey = process.env.API_KEY;
console.log(`Verbinde mit API-Key: ${apiKey.slice(0, 3)}...`);
// Ausgabe: Verbinde mit API-Key: sk-...
```

```javascript
// config.js – Pflicht-Variablen validieren, sonst kontrolliert abbrechen
import "dotenv/config";

const pflichtVariablen = ["API_KEY", "DATABASE_URL"];

for (const name of pflichtVariablen) {
  if (!process.env[name]) {
    console.error(`Fehler: Umgebungsvariable "${name}" fehlt in der .env-Datei.`);
    process.exit(1); // Beendet den Prozess mit Fehlercode
  }
}

console.log("Alle Pflicht-Umgebungsvariablen sind gesetzt.");
```

### ⚠️ Häufiger Fehler

Ein sehr verbreiteter Fehler: Die `.env`-Datei wird erst *nach* dem ersten Commit zur `.gitignore` hinzugefügt. Git ignoriert dann zwar zukünftige Änderungen, aber die Datei ist bereits Teil der Historie und damit auf GitHub sichtbar – auch wenn sie später gelöscht wird. In diesem Fall reicht ein nachträgliches `.gitignore`-Eintrag nicht aus; die betroffenen Secrets müssen ausgetauscht (rotiert) werden, und die Historie muss ggf. bereinigt werden.

### 🎯 Übungsaufgabe

Lege eine `.env`-Datei mit den Variablen `PORT=4000` und `API_KEY=test-schluessel-999` an, sowie eine passende `.env.example` mit Platzhaltern. Schreibe ein kleines Skript `config.js`, das mit `dotenv` die Werte lädt, prüft ob `PORT` und `API_KEY` gesetzt sind (sonst Abbruch mit `process.exit(1)`), und bei Erfolg beide Werte ausgibt. Trage `.env` in die `.gitignore` ein.

<details>
<summary>💡 Lösung anzeigen</summary>

```bash
# .env
PORT=4000
API_KEY=test-schluessel-999
```

```bash
# .env.example
PORT=dein-port-hier
API_KEY=dein-api-schluessel-hier
```

```gitignore
# .gitignore
.env
```

```javascript
// config.js
import "dotenv/config";

const pflichtVariablen = ["PORT", "API_KEY"];

for (const name of pflichtVariablen) {
  if (!process.env[name]) {
    console.error(`Fehler: Umgebungsvariable "${name}" fehlt.`);
    process.exit(1);
  }
}

console.log(`Port: ${process.env.PORT}`);
console.log(`API-Key: ${process.env.API_KEY}`);
// Ausgabe:
// Port: 4000
// API-Key: test-schluessel-999
```

</details>

---

## 5.4 Automatisiertes Testen mit GitHub Actions (CI)

### Theorie

Stell dir einen TÜV vor, der nur die Autos prüft, an die sich der Besitzer gerade erinnert und die er von sich aus vorbeibringt – alle anderen fahren ungeprüft weiter. Genau so verhält es sich, wenn Tests nur lokal auf deinem eigenen Rechner laufen: Du führst `npm test` aus, wenn du daran denkst, vielleicht vergisst du es vor einem stressigen Feierabend-Commit, und ein:e Teamkolleg:in installiert eventuell nicht mal alle Abhängigkeiten korrekt, bevor sie testet. Genau dieses Risiko beseitigt **Continuous Integration** (CI, „kontinuierliche Integration"): Jede einzelne Änderung, die eingereicht wird, durchläuft automatisch und zwingend dieselbe Prüfung – wie ein TÜV, der wirklich *jedes* eingereichte Auto kontrolliert, ganz ohne Rücksicht darauf, ob der Besitzer daran gedacht hat oder nicht.

**GitHub Actions** ist das in GitHub eingebaute CI-Werkzeug. Du musst dafür keinen separaten Dienst einrichten oder bezahlen (für öffentliche und kleinere private Repositories ist es kostenlos) – es reicht, im Repository einen Ordner `.github/workflows/` anzulegen und darin eine **Workflow-Datei** im YAML-Format abzulegen, zum Beispiel `test.yml`. Sobald diese Datei im Repository liegt, erkennt GitHub sie automatisch und führt die darin beschriebenen Schritte bei den passenden Ereignissen aus – ganz ohne weiteres Zutun deinerseits.

Eine Workflow-Datei besteht aus wenigen wiederkehrenden Bausteinen. Unter `name` gibst du dem Workflow einen lesbaren Namen, der später in der GitHub-Oberfläche erscheint. Unter `on: [push, pull_request]` legst du fest, *wann* der Workflow ausgelöst wird – hier bei jedem Push und bei jedem Pull Request, also genau den beiden Momenten, in denen neuer Code ins Spiel kommt. Unter `jobs` definierst du eine oder mehrere Aufgaben, die jeweils auf einer frischen, virtuellen Maschine laufen; mit `runs-on: ubuntu-latest` bestimmst du, dass dafür eine aktuelle Ubuntu-Umgebung verwendet wird. Innerhalb eines Jobs folgen die `steps` – eine Abfolge einzelner Kommandos oder wiederverwendbarer **Actions**. Zwei Actions tauchen in praktisch jedem Node.js-Workflow auf: `actions/checkout@v4` lädt den Code deines Repositories in die virtuelle Maschine (ohne diesen Schritt wäre gar kein Code vorhanden, den man testen könnte), und `actions/setup-node@v4` installiert eine bestimmte Node.js-Version. Danach folgen zwei ganz gewöhnliche Kommandozeilenbefehle: `npm ci` und `npm test`.

Warum `npm ci` und nicht das vertraute `npm install`? `npm ci` („clean install") installiert die Abhängigkeiten *exakt* so, wie sie in der `package-lock.json` festgeschrieben sind – keine automatischen Versions-Updates, kein Abweichen, keine Überraschungen. Das macht den Vorgang **reproduzierbar**: Der CI-Server bekommt garantiert dieselben Paketversionen wie dein lokaler Rechner. Außerdem löscht `npm ci` vorher den `node_modules`-Ordner komplett und baut ihn neu auf, statt bestehende Installationen zu ergänzen – das ist in der Regel spürbar schneller und schließt aus, dass sich Reste einer alten Installation einschleichen.

Läuft der Workflow, siehst du das Ergebnis direkt bei jedem Pull Request auf GitHub: ein grüner Haken bedeutet, alle Schritte – inklusive der Tests – waren erfolgreich; ein rotes X bedeutet, irgendetwas ist fehlgeschlagen, meist die Tests selbst. Viele Teams richten zusätzlich einen **Required Status Check** ein (eine Einstellung im Repository, die einen Merge erst dann erlaubt, wenn der zugehörige Check grün ist) – damit landet fehlerhafter Code gar nicht erst im Hauptzweig, egal wie sehr es gerade eilt. Das schließt den Kreis zu Kapitel 5.1: Dort hast du gelernt, wie ein Pull Request grundsätzlich abläuft – Branch, Änderungen, Review, Merge. CI ist die logische Fortsetzung dieses Workflows: Statt dass nur ein Mensch den Code liest, prüft zusätzlich eine Maschine automatisch und unbestechlich, ob die Tests wirklich noch bestehen.

### Code-Beispiele

```yaml
# .github/workflows/test.yml – CI-Workflow für das Express+Jest-Beispielprojekt aus Modul 4
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Code auschecken
        uses: actions/checkout@v4

      - name: Node.js einrichten
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Abhängigkeiten installieren
        run: npm ci

      - name: Tests ausführen
        run: npm test
```

```bash
# npm ci vs. npm install – der Unterschied im Verhalten
npm install
# kann package-lock.json aktualisieren, wenn package.json neuere Ranges erlaubt

npm ci
# Ausgabe: npm error `npm ci` can only install packages when your package.json
# and package-lock.json are in sync. Please update your lock file...
# (npm ci bricht ab, statt "einfach mal" etwas zu installieren –
#  genau diese Strenge willst du im CI-Server)
```

```yaml
# .github/workflows/test.yml – Erweiterung: Tests gegen mehrere Node-Versionen
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

```bash
# Lokal genau das simulieren, was CI gleich automatisch tun wird
npm ci
npm test
# Ausgabe (Beispiel):
# PASS  ./app.test.js
#  ✓ GET /todos liefert eine leere Liste (12 ms)
#  ✓ POST /todos legt ein neues Todo an (8 ms)
# Tests: 2 passed, 2 total
```

### ⚠️ Häufiger Fehler

Ein sehr häufiger Stolperstein: Die `package-lock.json` wird versehentlich in die `.gitignore` eingetragen oder schlicht nie committet, weil man sie für eine „unwichtige, automatisch generierte Datei" hält. Lokal fällt das oft nicht auf, weil `npm install` klaglos weiterarbeitet. In GitHub Actions bricht `npm ci` dann aber mit einem Fehler ab, weil ohne `package-lock.json` gar keine exakte Basis zum Installieren existiert. Die `package-lock.json` gehört – anders als `.env` oder `node_modules/` – zwingend mit ins Repository.

### 🎯 Übungsaufgabe

Erstelle für das Todo-App-Projekt aus Modul 9 (oder ein beliebiges eigenes Node.js-Projekt mit Tests) einen GitHub-Actions-Workflow unter `.github/workflows/test.yml`. Der Workflow soll bei jedem Push und bei jedem Pull Request auf einer aktuellen Ubuntu-Umgebung laufen, den Code auschecken, Node.js in Version 20 einrichten, die Abhängigkeiten mit `npm ci` installieren und anschließend `npm test` ausführen.

<details>
<summary>💡 Lösung anzeigen</summary>

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Code auschecken
        uses: actions/checkout@v4

      - name: Node.js einrichten
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Abhängigkeiten installieren
        run: npm ci

      - name: Tests ausführen
        run: npm test
```

</details>

---

## 📋 Zusammenfassung & Cheat-Sheet

| Befehl / Konzept | Beschreibung |
|---|---|
| `git init` | Neues Git-Repository im aktuellen Ordner anlegen |
| `git status` | Zeigt Änderungen im Working Directory und der Staging Area |
| `git add <datei>` | Änderungen zur Staging Area hinzufügen |
| `git commit -m "..."` | Staged Änderungen als Commit in der Historie festhalten |
| `git log --oneline` | Commit-Historie kompakt anzeigen |
| `.gitignore` | Liste von Dateien/Ordnern, die Git nicht verfolgen soll |
| `git switch -c <branch>` | Neuen Branch erstellen und hineinwechseln |
| `git merge <branch>` | Branch in den aktuellen Branch zusammenführen |
| `<<<<<<< HEAD` ... `>>>>>>>` | Marker für einen Merge-Konflikt in einer Datei |
| `git remote add origin <url>` | Remote-Repository verknüpfen |
| `git push` / `git pull` | Commits hochladen / Änderungen herunterladen |
| `git clone <url>` | Fremdes Repository lokal herunterladen |
| Fork → Branch → Pull Request → Review → Merge | Standard-Workflow für Zusammenarbeit auf GitHub |
| ESLint | Linter: findet Fehler und Stilprobleme im Code |
| Prettier | Formatter: vereinheitlicht die Optik des Codes |
| `npm run lint` / `npm run format` | Übliche npm-Skripte für Lint- bzw. Format-Durchlauf |
| `.env` | Datei mit lokalen, geheimen Umgebungsvariablen (nie in Git!) |
| `.env.example` | Vorlage mit Platzhaltern, wird mit in Git eingecheckt |
| `process.env.NAME` | Zugriff auf eine Umgebungsvariable in Node.js |
| `dotenv` | Paket, das `.env`-Werte automatisch in `process.env` lädt |
| `.github/workflows/*.yml` | Ordner mit GitHub-Actions-Workflow-Dateien (CI-Konfiguration) |
| `on: [push, pull_request]` | Legt fest, bei welchen Ereignissen ein Workflow ausgelöst wird |
| `npm ci` | Installiert Abhängigkeiten exakt gemäß `package-lock.json` – reproduzierbar & schnell |

---

⬅️ [Zurück zu Modul 4](../modul-4-profi-nodejs/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 6: Sicherheit & Authentifizierung](../modul-6-sicherheit-auth/README.md)

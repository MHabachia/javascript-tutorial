# Modul 8: Deployment & Produktion (Profi+)

⬅️ [Zurück zu Modul 7](../modul-7-typescript-patterns/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zum Abschlussprojekt](../modul-9-abschlussprojekt/README.md)

Du hast bisher gelernt, wie man Anwendungen baut — jetzt lernst du, wie sie bei echten Nutzer:innen ankommen. In diesem Modul bringst du Frontend- und Backend-Projekte auf öffentlich erreichbare Server und lernst mit Docker die Grundlage moderner Produktionsumgebungen kennen.

## 🎯 Lernziele

Nach diesem Modul kannst du:

- den Begriff **Deployment** erklären und von lokaler Entwicklung abgrenzen
- eine statische Frontend-Anwendung über Vercel oder Netlify veröffentlichen
- automatisches Deployment per Git-Push (CI/CD-Grundgedanke) einrichten und Preview-Deployments nutzen
- einen Node/Express-Server über Render oder Railway betreiben und dabei Umgebungsvariablen korrekt konfigurieren
- den Unterschied zwischen statischem Hosting und einem dauerhaft laufenden Server-Prozess erklären
- ein einfaches `Dockerfile` für eine Node-Anwendung schreiben, ein Image bauen und einen Container starten

## Inhalt

- [8.1 Frontend deployen (statisches Hosting)](#81-frontend-deployen-statisches-hosting)
- [8.2 Backend deployen (Render/Railway & Umgebungsvariablen)](#82-backend-deployen-renderrailway--umgebungsvariablen)
- [8.3 Docker-Grundlagen](#83-docker-grundlagen)

---

## 8.1 Frontend deployen (statisches Hosting)

### Theorie

Bisher lief dein Code ausschließlich auf `localhost` — deinem eigenen Rechner, den nur du erreichen kannst. **Deployment** bedeutet, diesen Code auf einen Server zu bringen, der über das öffentliche Internet erreichbar ist. Stell es dir wie ein Theaterstück vor: Wochenlang probst du hinter verschlossenen Türen (`localhost:3000`), niemand außer dir sieht die Vorstellung. Beim Deployment öffnest du den Vorhang — das Stück läuft jetzt öffentlich, auf einer Bühne, die jeder betreten kann, der die Adresse kennt.

Für reine Frontend-Projekte — HTML, CSS und JavaScript, das im Browser läuft, ohne eigenen Backend-Prozess — reicht **statisches Hosting**. "Statisch" heißt hier nicht "unveränderlich", sondern dass der Server lediglich fertige Dateien ausliefert, ohne bei jeder Anfrage Code auszuführen oder eine Datenbank abzufragen. Das ist der entscheidende Unterschied zu Abschnitt 8.2: Ein statischer Host ist wie ein Zeitungskiosk, der gedruckte Exemplare verkauft — er druckt nichts neu, er reicht nur weiter, was schon fertig vorliegt.

Anbieter wie **Vercel** und **Netlify** haben sich auf genau dieses Modell spezialisiert und es radikal vereinfacht. Das Grundprinzip beider Plattformen ist nahezu identisch: Du verbindest dein GitHub-Repository, gibst einen **Build-Befehl** (z. B. `npm run build`) und einen **Output-Ordner** (z. B. `dist` oder `build`) an, und der Rest passiert automatisch. Ab diesem Moment löst jeder `git push` auf deinen Hauptbranch ein neues Deployment aus — das ist der Grundgedanke von **CI/CD** (Continuous Integration/Continuous Deployment): Änderungen fließen kontinuierlich und automatisiert in die Produktion, ohne dass du manuell Dateien hochladen musst.

Besonders praktisch für die Teamarbeit sind **Preview-Deployments**: Öffnest du einen Pull Request, bauen Vercel und Netlify automatisch eine eigene, temporäre Version deiner Anwendung unter einer eigenen URL. So können Teammitglieder oder Reviewer eine Änderung live anschauen, bevor sie überhaupt gemerged wird — ähnlich wie ein Regieassistent, der eine Szene vorab in einem kleinen Nebenraum vorführt, bevor sie auf die große Bühne kommt. Zusätzlich lässt sich fast immer eine **eigene Domain** verbinden, sodass die Anwendung am Ende nicht unter einer generischen Plattform-URL, sondern unter deiner eigenen Adresse erreichbar ist.

### Code-Beispiele

```bash
# 1. Projekt lokal bauen, um den Build-Prozess zu verstehen
npm run build
# Erzeugt in der Regel einen Ordner wie "dist" oder "build"
# mit optimierten, statischen HTML/CSS/JS-Dateien
```

```json
{
  "name": "mein-frontend",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

```bash
# Typischer Ablauf beim Verbinden eines Projekts mit Vercel oder Netlify
# (über die Web-Oberfläche oder die jeweilige CLI):

# 1. Repository auswählen
# 2. Build-Befehl angeben:      npm run build
# 3. Output-Verzeichnis angeben: dist
# 4. Deploy auslösen -> Plattform baut und veröffentlicht automatisch
```

```bash
# Ab jetzt reicht ein einfacher Push, um ein neues Deployment zu starten
git add .
git commit -m "Startseite überarbeitet"
git push origin main
# -> Vercel/Netlify erkennen den Push und deployen automatisch
```

```bash
# Für einen Pull Request entsteht automatisch eine Vorschau-URL,
# z. B. https://mein-projekt-git-feature-login-teamname.vercel.app
# So kann das Team die Änderung testen, bevor sie in "main" landet
```

### ⚠️ Häufiger Fehler

Ein sehr häufiger Stolperstein ist ein falsch konfigurierter Output-Ordner. Baut dein Projekt beispielsweise nach `build`, in den Einstellungen ist aber `dist` eingetragen, meldet die Plattform oft nur eine leere oder fehlerhafte Seite, statt einer klaren Fehlermeldung. Wirf im Zweifel immer zuerst einen Blick in dein `package.json`-Build-Skript und den tatsächlich erzeugten Ordnernamen, bevor du in der Hosting-Konfiguration nach dem Fehler suchst.

### 🎯 Übungsaufgabe

Beschreibe in eigenen Worten (kein Code nötig) die drei Schritte, die nötig sind, um ein bestehendes GitHub-Repository mit einem Vite-Frontend-Projekt bei Vercel oder Netlify zu deployen, und erkläre, was danach bei jedem `git push` automatisch passiert.

<details>
<summary>💡 Lösung anzeigen</summary>

```
1. Repository verbinden: Bei Vercel/Netlify einloggen und das
   GitHub-Repository auswählen bzw. autorisieren.

2. Build konfigurieren: Build-Befehl "npm run build" und
   Output-Ordner "dist" (bei Vite-Standardkonfiguration) angeben.

3. Erstes Deployment auslösen: Die Plattform baut das Projekt
   und veröffentlicht es unter einer automatisch generierten URL.

Danach: Jeder Push auf den Hauptbranch löst automatisch einen neuen
Build und ein neues Deployment aus (CI/CD). Pull Requests erzeugen
zusätzlich eigene Preview-URLs, unter denen die Änderungen isoliert
begutachtet werden können, bevor sie gemerged werden.
```

</details>

---

## 8.2 Backend deployen (Render/Railway & Umgebungsvariablen)

### Theorie

Ein Node/Express-Server unterscheidet sich fundamental von den statischen Dateien aus 8.1. Während statisches Hosting nur fertige Dateien ausliefert, muss dein Backend als **dauerhaft laufender Prozess** existieren: Es lauscht ununterbrochen auf einem Port, wartet auf Anfragen, verbindet sich mit einer Datenbank und führt bei jedem Request Code aus. Bleiben wir bei der Theater-Analogie aus 8.1: Ein statischer Frontend-Host ist der Kiosk, der gedruckte Programme verkauft — ein Backend-Server ist die Live-Band, die für jede Vorstellung tatsächlich anwesend sein und spielen muss. Fällt die Band aus, gibt es keine Vorstellung, egal wie viele Programme im Kiosk liegen.

Anbieter wie **Render** und **Railway** sind auf genau solche dauerhaft laufenden Prozesse spezialisiert. Das Grundprinzip ähnelt Vercel/Netlify: Du verbindest dein Git-Repository, legst einen **Start-Befehl** fest (typischerweise `npm start`) und gibst an, welche Node-Version verwendet werden soll. Ab dann übernimmt die Plattform das Starten, Überwachen und bei Bedarf automatische Neustarten deines Servers.

Ein zentraler Unterschied zur lokalen Entwicklung betrifft **Umgebungsvariablen**. Erinnerst du dich an die `.env`-Datei aus Modul 5.3? Lokal lädst du Geheimnisse wie Datenbank-Zugangsdaten oder API-Keys aus dieser Datei. Auf einem Hosting-Anbieter existiert diese Datei aber nicht — und sollte dort auch nie landen, denn `.env`-Dateien gehören nicht ins Git-Repository. Stattdessen trägst du dieselben Variablen direkt im **Dashboard des Hosting-Anbieters** ein. Die Plattform stellt sie dem laufenden Prozess dann genauso über `process.env` zur Verfügung, wie es die `dotenv`-Bibliothek lokal tut.

Ein besonders wichtiger Sonderfall dabei ist der **Port**. Lokal legst du oft fest `PORT = 3000` fest. Auf einem Hosting-Anbieter bestimmt jedoch die Plattform selbst, auf welchem Port dein Prozess erreichbar sein muss, und teilt dir diesen über die Umgebungsvariable `PORT` mit. Hardcodierst du stattdessen einen festen Port, kann die Plattform deinen Server nicht korrekt mit dem öffentlichen Internet verbinden — dein Server läuft zwar, ist aber praktisch unsichtbar. Deshalb liest man den Port immer dynamisch aus `process.env.PORT`, mit einem lokalen Fallback für die Entwicklung.

Zur laufenden Überwachung bieten beide Plattformen **Logs** in Echtzeit an, in denen du `console.log`-Ausgaben, Fehler und Startmeldungen deines Servers verfolgen kannst — dein wichtigstes Werkzeug, wenn ein Deployment fehlschlägt. Ergänzend gibt es häufig **Health-Checks**: Die Plattform ruft in regelmäßigen Abständen eine bestimmte Route (z. B. `/health`) auf, um zu prüfen, ob dein Server noch reagiert, und kann bei Ausfällen automatisch neu starten.

### Code-Beispiele

```javascript
// server.js – Port dynamisch aus der Umgebungsvariable lesen,
// mit lokalem Fallback für die Entwicklung
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
```

```json
{
  "name": "mein-backend",
  "engines": {
    "node": "20.x"
  },
  "scripts": {
    "start": "node server.js"
  }
}
```

```bash
# Typische Konfiguration im Render/Railway-Dashboard:
# Build-Befehl:  npm install
# Start-Befehl:  npm start
# Node-Version:  wird aus "engines" in package.json übernommen
```

```bash
# Umgebungsvariablen werden NICHT ins Repository committet,
# sondern im Hosting-Dashboard hinterlegt, z. B.:
#
#   MONGODB_URI = mongodb+srv://user:passwort@cluster.mongodb.net/db
#   JWT_SECRET  = ein-langer-zufaelliger-string
#
# Der Server liest sie zur Laufzeit ganz normal über process.env
```

```bash
# Ablauf bei jedem Push:
git push origin main
# -> Render/Railway erkennen den Push
# -> npm install wird ausgeführt (Build)
# -> npm start wird ausgeführt (neuer Prozess ersetzt den alten)
# -> Logs sind live im Dashboard einsehbar
```

### ⚠️ Häufiger Fehler

Der mit Abstand häufigste Fehler beim ersten Backend-Deployment ist ein hartcodierter Port wie `app.listen(3000)`. Lokal funktioniert das einwandfrei, in der Produktion schlägt es fehl oder der Dienst bleibt von außen unerreichbar, weil der Hosting-Anbieter den Server über einen von ihm vorgegebenen Port ansprechen möchte. Verwende deshalb immer `process.env.PORT || 3000` — so funktioniert derselbe Code lokal und in der Produktion gleichermaßen.

### 🎯 Übungsaufgabe

Ein Kollege hat folgenden Code für sein Node/Express-Backend geschrieben, das er bei Render deployen möchte:

```javascript
app.listen(3000, () => {
  console.log("Server gestartet");
});
```

Erkläre, warum dieser Code auf Render nicht wie erwartet funktionieren wird, und korrigiere ihn.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
// Problem: Render vergibt den Port dynamisch über die
// Umgebungsvariable PORT. Ein fest hartcodierter Port (3000)
// wird von der Plattform nicht mit dem öffentlichen Netzwerk
// verbunden, der Server bleibt von außen unerreichbar.

// Korrigierte Version:
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server gestartet auf Port ${PORT}`);
});

// So funktioniert es sowohl lokal (Fallback auf 3000)
// als auch auf Render (nutzt den von der Plattform vorgegebenen Port).
```

</details>

---

## 8.3 Docker-Grundlagen

### Theorie

Kennst du den Satz "Aber bei mir läuft's doch!"? Genau dieses Problem löst **Docker**. Stell dir einen Schiffscontainer vor: Egal ob er auf ein Frachtschiff, einen Zug oder einen LKW verladen wird — er passt immer, weil seine Maße und Verschlüsse standardisiert sind. Ein **Docker-Container** funktioniert nach demselben Prinzip für Software: Er verpackt deine Anwendung zusammen mit allem, was sie zur Ausführung braucht — Node-Version, Abhängigkeiten, Systembibliotheken — in eine einheitliche, transportable Einheit. Egal ob dieser Container auf deinem Laptop, dem Rechner eines Kollegen oder einem Produktionsserver läuft: Der Inhalt bleibt identisch. Aus "läuft bei mir" wird "läuft überall".

Dabei ist es wichtig, zwei Begriffe sauber zu trennen: Ein **Image** ist der Bauplan — eine schreibgeschützte Vorlage, die beschreibt, welche Basis, welche Dateien und welche Befehle zur Anwendung gehören. Ein **Container** ist eine tatsächlich laufende Instanz dieses Bauplans — vergleichbar mit dem Unterschied zwischen einem Kuchenrezept (Image) und dem fertig gebackenen Kuchen, den du isst (Container). Aus demselben Image lassen sich beliebig viele identische Container starten.

Der Bauplan für ein Image wird in einer Datei namens `Dockerfile` festgehalten. Schauen wir uns ein typisches `Dockerfile` für eine Node/Express-Anwendung Zeile für Zeile an:

```dockerfile
FROM node:20-alpine
```
Diese Zeile legt die **Basis** fest, auf der dein Image aufbaut — hier eine schlanke ("alpine") Node.js-Version 20. Das ist wie die Grundmauern eines Hauses: Alles Weitere baut darauf auf.

```dockerfile
WORKDIR /app
```
Legt das Arbeitsverzeichnis **innerhalb** des Containers fest. Alle folgenden Befehle beziehen sich relativ zu diesem Ordner — vergleichbar mit einem `cd /app`, das für den Rest der Datei gilt.

```dockerfile
COPY package*.json ./
RUN npm install
```
Zuerst werden nur `package.json` und `package-lock.json` kopiert und die Abhängigkeiten installiert — noch nicht der restliche Code. Das ist ein bewusster Trick: Docker cached diesen Schritt. Solange sich die Abhängigkeiten nicht ändern, muss `npm install` bei künftigen Builds nicht erneut laufen, was Build-Zeit spart.

```dockerfile
COPY . .
```
Erst jetzt wird der restliche Quellcode in den Container kopiert.

```dockerfile
EXPOSE 3000
```
Dokumentiert, auf welchem Port die Anwendung im Container lauscht. Das öffnet den Port nicht automatisch nach außen, sondern dient vor allem als Information für alle, die das Image nutzen.

```dockerfile
CMD ["node", "server.js"]
```
Legt den Befehl fest, der beim Start eines Containers aus diesem Image ausgeführt wird — der eigentliche "Startknopf" der Anwendung.

Zwei Befehle brauchst du, um damit zu arbeiten: `docker build` erstellt aus dem `Dockerfile` ein Image, `docker run` startet daraus einen laufenden Container. Ergänzend gibt es die Datei `.dockerignore`, die genauso funktioniert wie das dir bereits bekannte `.gitignore` — sie schließt Dateien und Ordner (allen voran `node_modules`) davon aus, in das Image kopiert zu werden. Das hält Images klein und verhindert, dass lokal installierte, möglicherweise plattformspezifische Abhängigkeiten den sauberen `npm install`-Schritt im Container überschreiben.

### Code-Beispiele

```dockerfile
# Dockerfile für eine einfache Node/Express-Anwendung
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

```bash
# .dockerignore – analog zu .gitignore
node_modules
.env
npm-debug.log
.git
```

```bash
# Image aus dem Dockerfile im aktuellen Verzeichnis bauen
docker build -t meine-app .
```

```bash
# Container aus dem Image starten
# -p 3000:3000 verbindet Port 3000 des Rechners mit Port 3000 im Container
docker run -p 3000:3000 meine-app
```

```bash
# Nützliche Befehle für den Alltag
docker ps                # zeigt laufende Container
docker stop <container>  # stoppt einen laufenden Container
docker images            # listet vorhandene Images auf
```

### ⚠️ Häufiger Fehler

Fehlt eine `.dockerignore`-Datei, kopiert `COPY . .` auch den lokalen `node_modules`-Ordner in das Image. Das führt nicht nur zu unnötig großen, langsamen Images, sondern kann auch echte Fehler verursachen, wenn lokal installierte Abhängigkeiten (z. B. für macOS kompiliert) nicht zum Linux-basierten Container passen. Lege deshalb bei jedem Docker-Projekt von Anfang an eine `.dockerignore` mit mindestens `node_modules` an.

### 🎯 Übungsaufgabe

Schreibe ein `Dockerfile` für eine Node/Express-Anwendung, die auf Port 4000 lauscht, sowie eine passende `.dockerignore`-Datei. Gib anschließend die beiden Befehle an, mit denen du daraus ein Image namens `blog-api` baust und einen Container startest, der Port 4000 des Containers auf Port 4000 deines Rechners abbildet.

<details>
<summary>💡 Lösung anzeigen</summary>

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "server.js"]
```

```bash
# .dockerignore
node_modules
.env
npm-debug.log
.git
```

```bash
docker build -t blog-api .
docker run -p 4000:4000 blog-api
```

</details>

---

## 📋 Zusammenfassung & Cheat-Sheet

| Begriff / Befehl | Bedeutung |
|---|---|
| **Deployment** | Code von der lokalen Umgebung auf einen öffentlich erreichbaren Server bringen |
| **Statisches Hosting** | Server liefert fertige HTML/CSS/JS-Dateien aus, ohne eigenen Code auszuführen |
| **CI/CD** | Automatisches Bauen und Deployen bei jedem Git-Push |
| **Preview-Deployment** | Temporäre, eigene URL pro Pull Request zum isolierten Testen |
| Build-Befehl (Frontend) | z. B. `npm run build`, erzeugt statische Dateien im Output-Ordner (`dist`/`build`) |
| Start-Befehl (Backend) | z. B. `npm start`, hält den Server-Prozess dauerhaft am Laufen |
| `process.env.PORT` | Port immer dynamisch vom Hosting-Anbieter übernehmen, nie hartcodieren |
| Umgebungsvariablen (Hosting) | Werden im Dashboard des Anbieters gesetzt, nicht über `.env` im Repository |
| **Health-Check** | Regelmäßige Anfrage der Plattform an eine Route (z. B. `/health`), um Erreichbarkeit zu prüfen |
| **Image** | Schreibgeschützter Bauplan einer Anwendung (Docker) |
| **Container** | Laufende Instanz eines Images |
| `Dockerfile` | Baubeschreibung für ein Docker-Image |
| `docker build -t <name> .` | Image aus dem `Dockerfile` im aktuellen Verzeichnis bauen |
| `docker run -p <host>:<container> <name>` | Container starten und Ports verbinden |
| `.dockerignore` | Schließt Dateien (z. B. `node_modules`) vom Kopieren ins Image aus |

---

⬅️ [Zurück zu Modul 7](../modul-7-typescript-patterns/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zum Abschlussprojekt](../modul-9-abschlussprojekt/README.md)

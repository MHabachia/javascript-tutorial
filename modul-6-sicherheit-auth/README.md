# Modul 6: Sicherheit & Authentifizierung (Profi)

⬅️ [Zurück zu Modul 5](../modul-5-werkzeuge-workflow/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 7](../modul-7-typescript-patterns/README.md)

In diesem Modul lernst du, wie du Nutzerkonten in deinen Express-Anwendungen absichern kannst – von sicher gespeicherten Passwörtern über Login-Systeme mit JWT bis hin zu den wichtigsten Grundlagen der Web-Sicherheit. Wir bauen dabei direkt auf dem Express-Wissen aus Modul 4 auf.

## 🎯 Lernziele

Nach diesem Modul kannst du:
- erklären, warum Passwörter niemals im Klartext gespeichert werden dürfen und Passwörter mit `bcryptjs` sicher hashen
- den Unterschied zwischen Session-basierter und Token-basierter (JWT) Authentifizierung erklären und begründen, wann welcher Ansatz sinnvoll ist
- JSON Web Tokens erzeugen und verifizieren
- eine eigene Express-Middleware schreiben, die Routen mit einem Token schützt
- typische Angriffsvektoren wie XSS, CSRF und Brute-Force-Angriffe erkennen und mit einfachen Mitteln abwehren
- Nutzereingaben validieren, bevor du sie verarbeitest

## Inhalt

- [6.1 Passwörter sicher speichern (Hashing mit bcrypt)](#61-passwörter-sicher-speichern-hashing-mit-bcrypt)
- [6.2 Sessions vs. JWT](#62-sessions-vs-jwt)
- [6.3 Eine geschützte Route bauen (Auth-Middleware)](#63-eine-geschützte-route-bauen-auth-middleware)
- [6.4 Web-Sicherheit Grundlagen](#64-web-sicherheit-grundlagen)

---

## 6.1 Passwörter sicher speichern (Hashing mit bcrypt)

### Theorie

Stell dir vor, ein Onlineshop speichert die Passwörter seiner Kunden als reinen Text in der Datenbank – so, wie sie eingegeben wurden. Wenn diese Datenbank jemals gestohlen wird (und das passiert regelmäßig, auch bei großen Firmen), hat der Angreifer sofort Zugriff auf **alle** Konten. Schlimmer noch: Viele Menschen benutzen dasselbe Passwort für mehrere Dienste, also wären damit auch ihre E-Mail-Konten, Banking-Apps und Social-Media-Profile gefährdet. Deshalb gilt eine eiserne Regel: **Passwörter werden niemals im Klartext gespeichert.**

Die Lösung heißt **Hashing**. Ein Hash ist wie ein Fleischwolf: Du gibst ein Passwort hinein und bekommst eine scheinbar zufällige Zeichenkette fester Länge heraus – aber du kannst aus dieser Zeichenkette nicht mehr das ursprüngliche Passwort zurückgewinnen. Das ist der entscheidende Unterschied zur **Verschlüsselung**: Verschlüsselung ist bewusst umkehrbar (mit dem passenden Schlüssel bekommst du die Originaldaten zurück), Hashing ist eine **Einwegfunktion**. Wir wollen Passwörter gar nicht wiederherstellen können – wir wollen nur prüfen können, ob eine Eingabe zum gespeicherten Hash passt.

Nun könnte man einfach jedes Passwort einmal hashen und fertig. Das Problem: Wenn zwei Nutzer zufällig dasselbe Passwort wählen ("123456" lässt grüßen), erzeugen sie auch denselben Hash. Angreifer nutzen das aus, indem sie riesige, vorab berechnete Tabellen von Passwort-Hash-Paaren anlegen – sogenannte **Rainbow Tables**. Damit lässt sich ein gestohlener Hash oft in Sekunden zurück in ein Klartext-Passwort verwandeln. Die Abwehr dagegen ist der **Salt**: eine zufällige Zeichenfolge, die vor dem Hashen an jedes Passwort angehängt wird. Dadurch erzeugt selbst ein identisches Passwort bei jedem Nutzer einen komplett anderen Hash, und vorab berechnete Rainbow Tables werden nutzlos. Man kann sich den Salt wie eine persönliche Geheimzutat vorstellen, die jedem Passwort individuell beigemischt wird, bevor es "verarbeitet" wird.

Für Node.js gibt es dafür die beliebte Bibliothek `bcrypt`, die speziell für das sichere Hashen von Passwörtern entwickelt wurde. Wir verwenden in diesem Kurs bewusst das Paket `bcryptjs` – eine reine JavaScript-Implementierung ohne native Kompilierung. Das macht sie etwas langsamer als das Original-`bcrypt`-Paket (das auf nativen C++-Code setzt), dafür läuft sie garantiert auf jedem System ohne zusätzliche Build-Tools, was für unseren Kurs ideal ist.

```bash
npm install bcryptjs
```

`bcrypt` bringt den Salt-Mechanismus bereits eingebaut mit und erledigt das Salzen und Hashen in einem Schritt. Zusätzlich gibt es den Parameter **saltRounds** (auch "Cost-Faktor" genannt): Er bestimmt, wie rechenintensiv der Hashing-Vorgang ist. Ein höherer Wert macht das Hashen langsamer – das klingt erstmal schlecht, ist aber Absicht: Ein Angreifer, der Millionen Passwörter pro Sekunde durchprobieren möchte (**Brute-Force-Angriff**), wird durch die künstliche Verlangsamung massiv ausgebremst. Für dich als Nutzer beim Login merkst du davon nichts (ein Hashvorgang dauert nur Bruchteile einer Sekunde), aber für einen Angreifer mit Millionen Versuchen macht das einen riesigen Unterschied.

### Code-Beispiele

```javascript
// Beispiel 1: Ein Passwort hashen
const bcrypt = require("bcryptjs");

async function hashePasswort() {
  const klartextPasswort = "meinSicheresPasswort123";
  const saltRounds = 10; // gängiger Standardwert

  const hash = await bcrypt.hash(klartextPasswort, saltRounds);
  console.log(hash);
  // $2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq4gVh8OhP...  (jedes Mal anders!)
}

hashePasswort();
```

```javascript
// Beispiel 2: Zwei identische Passwörter erzeugen unterschiedliche Hashes
const bcrypt = require("bcryptjs");

async function zeigeSaltEffekt() {
  const hash1 = await bcrypt.hash("hallo123", 10);
  const hash2 = await bcrypt.hash("hallo123", 10);

  console.log(hash1 === hash2); // false – dank zufälligem Salt!
}

zeigeSaltEffekt();
```

```javascript
// Beispiel 3: Ein Passwort gegen einen Hash prüfen
const bcrypt = require("bcryptjs");

async function pruefePasswort() {
  const gespeicherterHash = await bcrypt.hash("korrektesPasswort", 10);

  const ergebnis1 = await bcrypt.compare("korrektesPasswort", gespeicherterHash);
  console.log(ergebnis1); // true

  const ergebnis2 = await bcrypt.compare("falschesPasswort", gespeicherterHash);
  console.log(ergebnis2); // false
}

pruefePasswort();
```

```javascript
// Beispiel 4: Registrierung & Login mit Express (vereinfacht, ohne echte DB)
const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());

// "Datenbank" nur zu Demozwecken – im echten Projekt: MongoDB, siehe Modul 4
const nutzerDatenbank = [];

app.post("/registrieren", async (req, res) => {
  const { email, passwort } = req.body;

  // Passwort NIE direkt speichern – erst hashen!
  const passwortHash = await bcrypt.hash(passwort, 10);
  nutzerDatenbank.push({ email, passwortHash });

  res.status(201).json({ nachricht: "Registrierung erfolgreich" });
});

app.post("/login", async (req, res) => {
  const { email, passwort } = req.body;
  const nutzer = nutzerDatenbank.find((n) => n.email === email);

  if (!nutzer) {
    return res.status(401).json({ fehler: "E-Mail oder Passwort falsch" });
  }

  const passwortIstKorrekt = await bcrypt.compare(passwort, nutzer.passwortHash);
  if (!passwortIstKorrekt) {
    return res.status(401).json({ fehler: "E-Mail oder Passwort falsch" });
  }

  res.json({ nachricht: "Login erfolgreich" });
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
```

### ⚠️ Häufiger Fehler

Ein sehr verbreiteter Anfängerfehler ist, `bcrypt.compare()` mit vertauschten Argumenten aufzurufen oder den Hash selbst noch einmal zu hashen und dann zu vergleichen. `bcrypt.compare(eingabe, hash)` übernimmt das Salzen intern automatisch – du musst und darfst die Eingabe nicht selbst vorher hashen. Achte außerdem darauf, bei Fehlermeldungen im Login niemals zu verraten, ob die E-Mail oder das Passwort falsch war ("E-Mail nicht gefunden" vs. "Passwort falsch") – das erleichtert Angreifern das Ausspähen gültiger E-Mail-Adressen.

### 🎯 Übungsaufgabe

Schreibe eine Funktion `registriereNutzer(email, passwort, nutzerListe)`, die ein Passwort mit `bcrypt` hasht (10 Salt-Rounds), ein Objekt `{ email, passwortHash }` in die übergebene `nutzerListe` einfügt und diese zurückgibt. Schreibe außerdem eine Funktion `pruefeLogin(email, passwort, nutzerListe)`, die `true` zurückgibt, wenn E-Mail und Passwort zu einem Eintrag passen, sonst `false`.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
const bcrypt = require("bcryptjs");

async function registriereNutzer(email, passwort, nutzerListe) {
  const passwortHash = await bcrypt.hash(passwort, 10);
  nutzerListe.push({ email, passwortHash });
  return nutzerListe;
}

async function pruefeLogin(email, passwort, nutzerListe) {
  const nutzer = nutzerListe.find((n) => n.email === email);
  if (!nutzer) return false;

  return bcrypt.compare(passwort, nutzer.passwortHash);
}

// Test
async function test() {
  const nutzer = [];
  await registriereNutzer("anna@beispiel.de", "geheim123", nutzer);

  console.log(await pruefeLogin("anna@beispiel.de", "geheim123", nutzer)); // true
  console.log(await pruefeLogin("anna@beispiel.de", "falsch", nutzer));    // false
}

test();
```

</details>

---

## 6.2 Sessions vs. JWT

### Theorie

HTTP ist von Natur aus **zustandslos** (englisch: *stateless*): Jede Anfrage an einen Server wird völlig unabhängig von allen vorherigen Anfragen behandelt. Der Server hat standardmäßig kein Gedächtnis. Das ist ein Problem, sobald wir einen eingeloggten Nutzer haben – woher soll der Server bei der zweiten Anfrage wissen, dass es sich um dieselbe Person handelt, die sich gerade eingeloggt hat? Dafür braucht es einen Mechanismus, der den Login-Zustand über mehrere Anfragen hinweg "merkt". Hier gibt es zwei grundlegend verschiedene Strategien.

Bei der **Session-basierten Authentifizierung** merkt sich der Server selbst, welche Nutzer eingeloggt sind. Beim Login legt der Server einen Eintrag in einem Session-Speicher an (früher oft im Arbeitsspeicher, heute meist in Redis oder einer Datenbank) und schickt dem Client nur eine zufällige **Session-ID** als Cookie zurück. Bei jeder weiteren Anfrage schickt der Browser dieses Cookie automatisch mit, und der Server schlägt die Session-ID in seinem Speicher nach, um zu wissen, wer da anfragt. Das ist wie ein Handstempel im Club: Der Türsteher (Server) führt eine Liste, wer heute Abend schon reingelassen wurde, und der Stempel auf deiner Hand ist nur eine Referenznummer zu dieser Liste – ohne die Liste des Türstehers ist der Stempel bedeutungslos.

Bei der **Token-basierten Authentifizierung** mit **JWT** (JSON Web Token) dreht sich das Prinzip um: Der Server speichert überhaupt nichts. Stattdessen bekommt der Client beim Login ein digital signiertes Dokument – den Token – der bereits alle nötigen Informationen enthält (z. B. die Nutzer-ID). Bei jeder Anfrage schickt der Client diesen Token mit, und der Server muss nur die Signatur prüfen, um sicherzugehen, dass der Token echt und unverändert ist – ganz ohne Datenbankabfrage oder gespeicherten Zustand. Das ist eher wie eine unterschriebene, fälschungssichere Eintrittskarte: Du trägst sie selbst bei dir, und jeder Kontrolleur kann anhand der Unterschrift prüfen, ob sie echt ist, ohne bei einer zentralen Stelle nachfragen zu müssen. Genau das macht JWT besonders praktisch für Szenarien mit mehreren Servern oder für APIs, die von verschiedenen Clients (Web, Mobile App) genutzt werden – niemand muss sich Session-Daten teilen.

Ein JWT besteht aus drei durch Punkte getrennten, **Base64-kodierten** Teilen: `Header.Payload.Signature`. Der **Header** beschreibt den verwendeten Algorithmus, der **Payload** enthält die eigentlichen Daten (z. B. `{ userId: 42 }`) und die **Signatur** wird mit einem geheimen Schlüssel erzeugt und stellt sicher, dass niemand den Token unbemerkt verändern kann. Wichtig zu verstehen: Base64 ist **keine Verschlüsselung**, sondern nur eine Kodierung – jeder kann Header und Payload eines JWT mit einem Klick decodieren und lesen (probier es mal auf jwt.io aus). Deshalb gilt: **Niemals sensible Daten wie Passwörter in den Payload packen!** Die Signatur schützt nur davor, dass der Inhalt unbemerkt verändert wird – nicht davor, dass er gelesen wird.

In Node.js übernimmt das Paket `jsonwebtoken` das Erzeugen und Prüfen von Tokens.

```bash
npm install jsonwebtoken
```

### Code-Beispiele

```javascript
// Beispiel 1: Einen JWT erzeugen
const jwt = require("jsonwebtoken");

const geheimerSchluessel = "mein-super-geheimer-schluessel"; // im echten Projekt: .env-Datei!

const token = jwt.sign(
  { userId: 42, email: "anna@beispiel.de" }, // Payload
  geheimerSchluessel,
  { expiresIn: "1h" } // läuft nach 1 Stunde ab
);

console.log(token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQyLCJlbWFpbCI6...
```

```javascript
// Beispiel 2: Einen JWT verifizieren
const jwt = require("jsonwebtoken");
const geheimerSchluessel = "mein-super-geheimer-schluessel";

const token = jwt.sign({ userId: 42 }, geheimerSchluessel, { expiresIn: "1h" });

const dekodiertePayload = jwt.verify(token, geheimerSchluessel);
console.log(dekodiertePayload);
// { userId: 42, iat: 1735000000, exp: 1735003600 }
```

```javascript
// Beispiel 3: Was passiert bei einem manipulierten oder abgelaufenen Token
const jwt = require("jsonwebtoken");
const geheimerSchluessel = "mein-super-geheimer-schluessel";

const token = jwt.sign({ userId: 42 }, geheimerSchluessel, { expiresIn: "1h" });
const manipulierterToken = token.slice(0, -5) + "AAAAA"; // Signatur kaputt gemacht

try {
  jwt.verify(manipulierterToken, geheimerSchluessel);
} catch (fehler) {
  console.log(fehler.message); // "invalid signature"
}
```

```javascript
// Beispiel 4: Payload ist nur kodiert, nicht verschlüsselt – jeder kann sie lesen!
const jwt = require("jsonwebtoken");

const token = jwt.sign({ userId: 42, rolle: "admin" }, "irgendein-schluessel");

// jwt.decode() prüft KEINE Signatur, sondern liest nur die Payload aus
console.log(jwt.decode(token));
// { userId: 42, rolle: "admin", iat: 1735000000 }
// -> Deshalb: niemals Passwörter oder Kreditkartendaten in den Payload!
```

### ⚠️ Häufiger Fehler

Viele Einsteiger verwechseln `jwt.decode()` mit `jwt.verify()`. `decode()` liest die Payload nur aus, ohne die Signatur zu prüfen – ein manipulierter Token würde also nicht auffallen! Für jede sicherheitsrelevante Prüfung (z. B. in einer Middleware) musst du immer `jwt.verify()` verwenden, da nur diese Funktion sicherstellt, dass der Token wirklich von deinem Server signiert wurde und nicht verändert wurde.

### 🎯 Übungsaufgabe

Schreibe eine Funktion `erstelleToken(userId)`, die einen JWT mit dem Payload `{ userId }` erzeugt, der nach 15 Minuten abläuft. Schreibe außerdem eine Funktion `leseToken(token)`, die den Token verifiziert und entweder die Payload oder (bei ungültigem Token) `null` zurückgibt.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
const jwt = require("jsonwebtoken");
const GEHEIMNIS = "kurs-demo-schluessel";

function erstelleToken(userId) {
  return jwt.sign({ userId }, GEHEIMNIS, { expiresIn: "15m" });
}

function leseToken(token) {
  try {
    return jwt.verify(token, GEHEIMNIS);
  } catch (fehler) {
    return null;
  }
}

// Test
const token = erstelleToken(7);
console.log(leseToken(token));       // { userId: 7, iat: ..., exp: ... }
console.log(leseToken("kaputt.abc")); // null
```

</details>

---

## 6.3 Eine geschützte Route bauen (Auth-Middleware)

### Theorie

In Modul 4 hast du bereits Express-Middleware kennengelernt: Funktionen, die zwischen eingehender Anfrage und der eigentlichen Routen-Logik geschaltet werden und `req`, `res` sowie `next()` zur Verfügung haben. Genau dieses Konzept nutzen wir jetzt, um Routen zu schützen, die nur eingeloggte Nutzer erreichen dürfen.

Der übliche Weg, einen JWT an den Server zu übermitteln, ist der HTTP-Header `Authorization` im Format `Bearer <token>`. "Bearer" bedeutet dabei so viel wie "Inhaber" – wer den Token vorzeigt, gilt als berechtigt, ähnlich wie bei einem Fahrschein ohne Namenseintrag: Wer ihn hat, darf fahren. Deshalb ist es so wichtig, Tokens sicher aufzubewahren (dazu mehr in 6.4) und ihnen eine begrenzte Lebensdauer zu geben.

Eine Auth-Middleware übernimmt drei Aufgaben: Erstens liest sie den `Authorization`-Header aus der Anfrage. Zweitens prüft sie mit `jwt.verify()`, ob der enthaltene Token gültig und nicht abgelaufen ist. Drittens hängt sie bei Erfolg die entschlüsselten Nutzerdaten als `req.user` an das Request-Objekt, damit nachfolgende Routen wissen, wer die Anfrage stellt – und ruft `next()` auf, damit die Anfrage weiterverarbeitet wird. Schlägt die Prüfung fehl, bricht die Middleware die Kette ab und sendet direkt eine Fehlerantwort zurück, ohne `next()` aufzurufen. Man kann sich das wie einen Kontrolleur am Bahnsteig vorstellen, der jeden Fahrgast (jede Anfrage) durchwinkt, sobald der Fahrschein (Token) als gültig erkannt wurde – ungültige Fahrscheine führen dazu, dass der Fahrgast gar nicht erst auf den Bahnsteig (in die geschützte Route) gelangt.

Dabei ist die Unterscheidung zwischen den HTTP-Statuscodes **401** und **403** wichtig: **401 Unauthorized** bedeutet "du hast dich nicht (korrekt) ausgewiesen" – es fehlt ein gültiger Token oder er ist abgelaufen. **403 Forbidden** bedeutet "ich weiß, wer du bist, aber du darfst das trotzdem nicht" – zum Beispiel, wenn ein normaler Nutzer versucht, auf eine Admin-Route zuzugreifen.

### Code-Beispiele

```javascript
// Beispiel 1: Die Auth-Middleware selbst
const jwt = require("jsonwebtoken");
const GEHEIMNIS = process.env.JWT_SECRET || "kurs-demo-schluessel";

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"]; // z.B. "Bearer eyJhbGci..."

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ fehler: "Kein Token übermittelt" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, GEHEIMNIS);
    req.user = payload; // ab jetzt in allen folgenden Handlern verfügbar
    next();
  } catch (fehler) {
    return res.status(403).json({ fehler: "Token ungültig oder abgelaufen" });
  }
}

module.exports = authMiddleware;
```

```javascript
// Beispiel 2: Middleware an einer einzelnen Route einsetzen
const express = require("express");
const authMiddleware = require("./authMiddleware");
const app = express();

app.get("/profil", authMiddleware, (req, res) => {
  // req.user wurde von der Middleware gesetzt
  res.json({ nachricht: `Willkommen, User ${req.user.userId}!` });
});
```

```javascript
// Beispiel 3: Vollständiger Ablauf – Login gibt Token aus, /profil ist geschützt
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const GEHEIMNIS = "kurs-demo-schluessel";
const nutzerDatenbank = [
  { id: 1, email: "anna@beispiel.de", passwortHash: null }
];

// Setup: Passwort vorab hashen (normalerweise passiert das bei der Registrierung)
bcrypt.hash("geheim123", 10).then((hash) => {
  nutzerDatenbank[0].passwortHash = hash;
});

app.post("/login", async (req, res) => {
  const { email, passwort } = req.body;
  const nutzer = nutzerDatenbank.find((n) => n.email === email);

  if (!nutzer || !(await bcrypt.compare(passwort, nutzer.passwortHash))) {
    return res.status(401).json({ fehler: "E-Mail oder Passwort falsch" });
  }

  const token = jwt.sign({ userId: nutzer.id }, GEHEIMNIS, { expiresIn: "1h" });
  res.json({ token });
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ fehler: "Kein Token übermittelt" });
  }
  try {
    req.user = jwt.verify(authHeader.split(" ")[1], GEHEIMNIS);
    next();
  } catch {
    return res.status(403).json({ fehler: "Token ungültig oder abgelaufen" });
  }
}

app.get("/profil", authMiddleware, (req, res) => {
  res.json({ nachricht: `Willkommen, User ${req.user.userId}!` });
});

app.listen(3000);
```

```javascript
// Beispiel 4: Middleware wiederverwenden für mehrere Routen gleichzeitig
const express = require("express");
const authMiddleware = require("./authMiddleware");
const router = express.Router();

// router.use() wendet die Middleware auf ALLE folgenden Routen in diesem Router an
router.use(authMiddleware);

router.get("/dashboard", (req, res) => {
  res.json({ nachricht: `Dashboard für User ${req.user.userId}` });
});

router.get("/einstellungen", (req, res) => {
  res.json({ nachricht: "Deine Einstellungen" });
});

module.exports = router;
```

### ⚠️ Häufiger Fehler

Ein klassischer Fehler ist, `req.user` in der Middleware zu setzen, aber zu vergessen, `next()` aufzurufen (oder umgekehrt: `next()` UND eine Fehlerantwort gleichzeitig zu senden). Ohne `next()` bleibt die Anfrage einfach "hängen", bis sie in einen Timeout läuft. Achte deshalb genau darauf, dass jeder Codepfad deiner Middleware entweder mit `next()` oder mit einer `res.status(...).json(...)`-Antwort endet – niemals beides und niemals keines von beiden.

### 🎯 Übungsaufgabe

Erweitere die Auth-Middleware aus Beispiel 1 um eine Funktion `erlaubeRolle(rolle)`, die eine weitere Middleware zurückgibt. Diese soll nach der Auth-Middleware laufen und prüfen, ob `req.user.rolle` der geforderten Rolle entspricht – falls nicht, soll sie `403` zurückgeben.

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
function erlaubeRolle(erforderlicheRolle) {
  return (req, res, next) => {
    if (req.user?.rolle !== erforderlicheRolle) {
      return res.status(403).json({ fehler: "Keine Berechtigung für diese Aktion" });
    }
    next();
  };
}

// Verwendung:
// app.delete("/nutzer/:id", authMiddleware, erlaubeRolle("admin"), (req, res) => {
//   res.json({ nachricht: "Nutzer gelöscht" });
// });

module.exports = erlaubeRolle;
```

</details>

---

## 6.4 Web-Sicherheit Grundlagen

### Theorie

Zum Abschluss dieses Moduls werfen wir einen Blick auf die häufigsten Angriffsarten gegen Webanwendungen und wie du dich mit vertretbarem Aufwand dagegen schützt. Sicherheit ist dabei nie "einmal erledigt und fertig", sondern eher wie das Abschließen deiner Wohnungstür: Man macht es routinemäßig, weil man weiß, dass es Menschen gibt, die versuchen, unverschlossene Türen zu finden.

**XSS (Cross-Site Scripting)** hast du bereits im Kurs gestreift: Dabei schleust ein Angreifer eigenen JavaScript-Code in deine Webseite ein, der dann im Browser anderer Nutzer ausgeführt wird – zum Beispiel, weil ein Kommentarfeld ungeprüft per `innerHTML` angezeigt wird. Die goldene Regel bleibt: **Vertraue niemals Nutzereingaben und schreibe sie nie ungeprüft in `innerHTML`.** Nutze stattdessen `textContent` für reinen Text oder verlasse dich auf Frontend-Frameworks, die automatisch escapen.

**CSRF (Cross-Site Request Forgery)** funktioniert anders: Hier bringt ein Angreifer dich dazu, unwissentlich eine Anfrage an eine Seite zu senden, bei der du eingeloggt bist – zum Beispiel über einen versteckten Button auf einer bösartigen Webseite, der beim Klick eine Überweisung auf deiner Banking-Seite auslöst, weil dein Browser dein Session-Cookie automatisch mitschickt. Man kann sich das vorstellen wie einen Trickbetrüger, der dich dazu bringt, unwissentlich ein bereits von dir unterschriebenes Blanko-Formular abzugeben. Zwei gängige Schutzmaßnahmen: Cookies mit dem Attribut **`SameSite=Strict`** (oder `Lax`) versehen, damit sie nur bei Anfragen von der eigenen Domain mitgeschickt werden, und **CSRF-Tokens** verwenden – ein zufälliger, geheimer Wert, den der Server bei jedem Formular mitgibt und bei jeder verändernden Anfrage abgleicht. Anfragen ohne (oder mit falschem) Token werden abgelehnt.

**Rate Limiting** schützt vor Brute-Force-Angriffen, bei denen ein Angreifer automatisiert tausende Passwörter gegen deine Login-Route ausprobiert. Die Idee ist simpel: Du zählst pro IP-Adresse (oder pro Nutzerkonto), wie viele Anfragen in einem bestimmten Zeitfenster eingehen, und blockierst weitere Versuche, sobald ein Limit überschritten wird – ähnlich wie ein Türsteher, der jemanden nach dem dritten missglückten Versuch, den richtigen Namen auf der Gästeliste zu nennen, erstmal wegschickt. Für den produktiven Einsatz empfiehlt sich das fertige Paket `express-rate-limit`, das genau das mit wenigen Zeilen Konfiguration übernimmt.

**Input-Validierung** bedeutet, niemals blind darauf zu vertrauen, dass eingehende Daten das erwartete Format haben – weder von echten Nutzern (die sich vertippen) noch von Angreifern (die absichtlich kaputte oder bösartige Daten senden). Für einfache Fälle reicht manuelle Validierung, für komplexere Formulare lohnt sich der Einsatz von spezialisierten Bibliotheken wie `zod` oder `joi`, die Validierungsregeln deklarativ beschreiben lassen und automatisch aussagekräftige Fehlermeldungen liefern.

Zum Schluss noch ein nützlicher Tipp: Das Paket **`helmet`** setzt für dich mit einer einzigen Zeile Code eine ganze Reihe sinnvoller HTTP-Sicherheitsheader (die z. B. bestimmte Arten von XSS und Clickjacking erschweren). Es ist kein Ersatz für die oben genannten Maßnahmen, aber ein sehr guter, kostenloser erster Schutzwall für jede Express-Anwendung.

### Code-Beispiele

```javascript
// Beispiel 1: XSS-Recap – niemals ungeprüften Input in innerHTML schreiben
// SCHLECHT:
// element.innerHTML = nutzerKommentar; // Angreifer könnte <script>...</script> einschleusen

// GUT:
const element = document.createElement("div");
element.textContent = nutzerKommentar; // wird immer als reiner Text behandelt
```

```javascript
// Beispiel 2: Cookie mit SameSite-Schutz gegen CSRF setzen (Express)
res.cookie("sessionId", "abc123", {
  httpOnly: true,   // per JavaScript nicht auslesbar (schützt zusätzlich vor XSS-Diebstahl)
  secure: true,      // nur über HTTPS übertragen
  sameSite: "strict" // wird nur bei Anfragen von der eigenen Domain mitgeschickt
});
```

```javascript
// Beispiel 3: Rate Limiting mit express-rate-limit gegen Brute-Force am Login
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Zeitfenster: 15 Minuten
  max: 5,                    // max. 5 Versuche pro IP in diesem Fenster
  message: { fehler: "Zu viele Login-Versuche, bitte später erneut versuchen" }
});

app.post("/login", loginLimiter, (req, res) => {
  // normale Login-Logik
});
```

```javascript
// Beispiel 4: Einfache manuelle Input-Validierung
function validiereRegistrierung(daten) {
  const fehler = [];

  if (!daten.email || !daten.email.includes("@")) {
    fehler.push("Ungültige E-Mail-Adresse");
  }
  if (!daten.passwort || daten.passwort.length < 8) {
    fehler.push("Passwort muss mindestens 8 Zeichen lang sein");
  }

  return { istGueltig: fehler.length === 0, fehler };
}

console.log(validiereRegistrierung({ email: "keine-email", passwort: "123" }));
// { istGueltig: false, fehler: ["Ungültige E-Mail-Adresse", "Passwort muss mindestens 8 Zeichen lang sein"] }
```

```javascript
// Beispiel 5: helmet in wenigen Zeilen einbinden
const express = require("express");
const helmet = require("helmet");
const app = express();

app.use(helmet()); // setzt automatisch mehrere sinnvolle Sicherheitsheader

app.get("/", (req, res) => res.send("Sicher unterwegs!"));
app.listen(3000);
```

### ⚠️ Häufiger Fehler

Ein weit verbreiteter Trugschluss ist, Validierung nur im Frontend durchzuführen (z. B. mit `required` in einem HTML-Formular) und zu glauben, das reiche aus. Frontend-Validierung ist nur für die Nutzerfreundlichkeit da – ein Angreifer kann Anfragen problemlos direkt an deine API senden und dabei jede Frontend-Prüfung umgehen. **Validierung muss immer zusätzlich auf dem Server stattfinden**, da nur der Server die letzte Kontrollinstanz ist, der du vertrauen kannst.

### 🎯 Übungsaufgabe

Schreibe eine Funktion `validiereKommentar(text)`, die `{ istGueltig: false, fehler: "..." }` zurückgibt, wenn der Text leer ist, nur aus Leerzeichen besteht oder länger als 280 Zeichen ist, und sonst `{ istGueltig: true, text: bereinigterText }` – wobei führende und abschließende Leerzeichen entfernt wurden (`trim()`).

<details>
<summary>💡 Lösung anzeigen</summary>

```javascript
function validiereKommentar(text) {
  if (typeof text !== "string" || text.trim().length === 0) {
    return { istGueltig: false, fehler: "Kommentar darf nicht leer sein" };
  }

  const bereinigterText = text.trim();

  if (bereinigterText.length > 280) {
    return { istGueltig: false, fehler: "Kommentar darf maximal 280 Zeichen lang sein" };
  }

  return { istGueltig: true, text: bereinigterText };
}

// Test
console.log(validiereKommentar("   "));           // { istGueltig: false, fehler: "..." }
console.log(validiereKommentar("  Hallo Welt!  ")); // { istGueltig: true, text: "Hallo Welt!" }
```

</details>

---

## 📋 Zusammenfassung & Cheat-Sheet

| Konzept | Zweck | Wichtigste Funktion / Code |
|---|---|---|
| Hashing (bcrypt) | Passwörter irreversibel speichern | `bcrypt.hash(pw, 10)` / `bcrypt.compare(pw, hash)` |
| Salt | Rainbow-Table-Angriffe verhindern | automatisch in `bcrypt.hash()` enthalten |
| Session | Server merkt sich Login-Zustand | Cookie mit Session-ID |
| JWT | Client trägt signierten Login-Nachweis | `jwt.sign(payload, secret, { expiresIn })` |
| JWT prüfen | Token-Gültigkeit & Signatur verifizieren | `jwt.verify(token, secret)` |
| Auth-Header | Token beim Request mitschicken | `Authorization: Bearer <token>` |
| Auth-Middleware | Route nur für eingeloggte Nutzer öffnen | eigene Middleware mit `jwt.verify()` + `next()` |
| 401 vs. 403 | Fehlender vs. unzureichender Zugriff | 401 = nicht eingeloggt, 403 = keine Berechtigung |
| XSS-Schutz | Kein Script-Einschleusen erlauben | `textContent` statt `innerHTML` |
| CSRF-Schutz | Ungewollte Fremd-Anfragen verhindern | `sameSite: "strict"`, CSRF-Token |
| Rate Limiting | Brute-Force am Login bremsen | `express-rate-limit` |
| Input-Validierung | Nutzerdaten nie blind vertrauen | manuell oder mit `zod` / `joi` |
| HTTP-Header absichern | Grundschutz mit wenig Aufwand | `app.use(helmet())` |

---

⬅️ [Zurück zu Modul 5](../modul-5-werkzeuge-workflow/README.md) | 🏠 [Kursübersicht](../README.md) | ➡️ [Weiter zu Modul 7: TypeScript & Patterns](../modul-7-typescript-patterns/README.md)

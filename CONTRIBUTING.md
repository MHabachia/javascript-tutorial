# Beitragen zum JavaScript-Kurs

Danke, dass du diesen Kurs verbessern möchtest! Jede Art von Beitrag ist willkommen – von der Korrektur eines Tippfehlers bis zu einem komplett neuen Beispiel.

## Wie du beitragen kannst

- 🐛 **Fehler melden**: Ein Code-Beispiel läuft nicht, eine Erklärung ist unklar oder fehlerhaft? Erstelle ein [Bug-Issue](.github/ISSUE_TEMPLATE/bug_report.md).
- 💡 **Verbesserung vorschlagen**: Ein Konzept fehlt, ein Kapitel könnte ein besseres Beispiel gebrauchen? Erstelle ein [Feature-Issue](.github/ISSUE_TEMPLATE/feature_request.md).
- 🔀 **Pull Request einreichen**: Du hast die Korrektur oder Ergänzung schon geschrieben? Immer her damit!

## Ablauf für Pull Requests

1. **Forke** das Repository und erstelle einen neuen Branch:
   ```bash
   git checkout -b fix/kurze-beschreibung
   ```
2. Nimm deine Änderungen vor.
3. Stelle sicher, dass Code-Beispiele **tatsächlich lauffähig** sind (kopiere sie in die Konsole oder führe sie mit `node datei.js` aus, bevor du sie einreichst).
4. Committe mit einer aussagekräftigen Nachricht:
   ```bash
   git commit -m "Fix: Tippfehler in Modul 2.2 (map/filter) korrigiert"
   ```
5. Push deinen Branch und öffne einen Pull Request gegen `main`.

## Style-Richtlinien für Inhalte

Damit der Kurs einheitlich bleibt, halte dich bei neuen oder geänderten Kapiteln an folgende Struktur:

- **Theorie** zuerst, mit mindestens einer Analogie aus dem echten Leben.
- **Code-Beispiele**: Jeder Code-Block muss **komplett eigenständig lauffähig** sein – keine Abhängigkeiten von Variablen aus anderen Beispielen.
- Nutze moderne Syntax (ES6+): `const`/`let` statt `var`, Arrow Functions wo sinnvoll, Template Literals statt String-Verkettung.
- Kommentiere Code-Beispiele auf Deutsch, kurz und gezielt (nicht jede Zeile, nur die wichtigen).
- Ergänze bei Bedarf eine **⚠️ Häufiger Fehler**-Box mit einem typischen Stolperstein zum Thema.
- Jedes Unterkapitel endet mit einer **🎯 Übungsaufgabe** und einer versteckten Lösung (`<details><summary>...</summary>` in Markdown).

## Verhaltenskodex

Sei freundlich und konstruktiv. Dieser Kurs soll ein einladender Ort zum Lernen sein – für Anfänger genauso wie für erfahrene Entwickler, die einen Beitrag leisten möchten.

Viel Spaß beim Mitgestalten! 🚀

// Ein kleines, vollstaendiges Express-Beispielprojekt: eine "Buecher"-API
// Starten mit: npm start   (Server laeuft danach auf http://localhost:3000)

import express from "express";

const app = express();
app.use(express.json());

// In-Memory "Datenbank" (nur zu Demonstrationszwecken - siehe Modul 4.4 fuer echte DB-Anbindung)
let buecher = [
  { id: 1, titel: "Der Weg zum Meister" },
  { id: 2, titel: "JavaScript fuer Einsteiger" }
];

app.get("/buecher", (req, res) => {
  res.json(buecher);
});

app.get("/buecher/:id", (req, res) => {
  const buch = buecher.find((b) => b.id === Number(req.params.id));
  if (!buch) {
    return res.status(404).json({ fehler: "Buch nicht gefunden" });
  }
  res.json(buch);
});

app.post("/buecher", (req, res) => {
  const neuesBuch = { id: buecher.length + 1, titel: req.body.titel };
  buecher.push(neuesBuch);
  res.status(201).json(neuesBuch);
});

app.put("/buecher/:id", (req, res) => {
  const buch = buecher.find((b) => b.id === Number(req.params.id));
  if (!buch) {
    return res.status(404).json({ fehler: "Buch nicht gefunden" });
  }
  buch.titel = req.body.titel;
  res.json(buch);
});

app.delete("/buecher/:id", (req, res) => {
  const existiert = buecher.some((b) => b.id === Number(req.params.id));
  if (!existiert) {
    return res.status(404).json({ fehler: "Buch nicht gefunden" });
  }
  buecher = buecher.filter((b) => b.id !== Number(req.params.id));
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server laeuft auf http://localhost:${PORT}`);
});

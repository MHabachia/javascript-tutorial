// server.js - Die Todo-API: verbindet Express (Modul 4), Auth (Modul 6)
// und die Datenlogik aus store.js zu einer vollständigen Anwendung.
//
// Starten mit: npm start   (Server läuft danach auf http://localhost:3000)

import express from "express";
import * as store from "./store.js";
import {
  hashePasswort,
  vergleichePasswort,
  erstelleToken,
  pruefeToken,
} from "./auth.js";

export const app = express();
app.use(express.json());

// ---------- Auth-Routen ----------

app.post("/auth/register", async (req, res) => {
  const { email, passwort } = req.body;

  if (!email || !passwort) {
    return res
      .status(400)
      .json({ fehler: "E-Mail und Passwort sind erforderlich" });
  }

  try {
    const passwordHash = await hashePasswort(passwort);
    const user = store.createUser({ email, passwordHash });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (fehler) {
    // z.B. "E-Mail bereits registriert"
    res.status(409).json({ fehler: fehler.message });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, passwort } = req.body;
  const user = store.findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ fehler: "E-Mail oder Passwort falsch" });
  }

  const stimmtUeberein = await vergleichePasswort(passwort, user.passwordHash);
  if (!stimmtUeberein) {
    return res.status(401).json({ fehler: "E-Mail oder Passwort falsch" });
  }

  const token = erstelleToken({ userId: user.id, email: user.email });
  res.json({ token });
});

// ---------- Geschützte Todo-Routen (nur mit gültigem Token) ----------

app.get("/todos", pruefeToken, (req, res) => {
  res.json(store.findTodosByUser(req.user.userId));
});

app.post("/todos", pruefeToken, (req, res) => {
  const { titel } = req.body;

  if (!titel) {
    return res.status(400).json({ fehler: "Titel ist erforderlich" });
  }

  const todo = store.createTodo({ userId: req.user.userId, titel });
  res.status(201).json(todo);
});

app.put("/todos/:id", pruefeToken, (req, res) => {
  const todo = store.updateTodo(Number(req.params.id), req.user.userId, req.body);

  if (!todo) {
    return res.status(404).json({ fehler: "Aufgabe nicht gefunden" });
  }
  res.json(todo);
});

app.delete("/todos/:id", pruefeToken, (req, res) => {
  const geloescht = store.deleteTodo(Number(req.params.id), req.user.userId);

  if (!geloescht) {
    return res.status(404).json({ fehler: "Aufgabe nicht gefunden" });
  }
  res.status(204).send();
});

// Server nur starten, wenn diese Datei direkt ausgeführt wird.
// Beim Testen mit Jest importiert server.test.js nur "app" (siehe unten) -
// Jest setzt NODE_ENV automatisch auf "test", daher startet hier kein
// zusätzlicher Server, der den Port blockieren würde.
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
  });
}

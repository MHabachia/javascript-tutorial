// auth.js - Passwort-Hashing, JWT-Erstellung und Auth-Middleware
// Vertiefte Erklärung dieser Konzepte: siehe Modul 6.

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// In einer echten Anwendung IMMER über eine Umgebungsvariable setzen
// (siehe Modul 5.3) und niemals einen Fallback wie diesen in Produktion nutzen!
const JWT_SECRET =
  process.env.JWT_SECRET || "unsicheres-entwicklungs-secret-nur-lokal";

export async function hashePasswort(passwort) {
  const saltRounds = 10;
  return bcrypt.hash(passwort, saltRounds);
}

export async function vergleichePasswort(passwort, hash) {
  return bcrypt.compare(passwort, hash);
}

export function erstelleToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
}

/** Express-Middleware: lässt nur Requests mit gültigem Bearer-Token durch. */
export function pruefeToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ fehler: "Kein Token vorhanden" });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, JWT_SECRET); // z.B. { userId, email }
    next();
  } catch (fehler) {
    return res.status(403).json({ fehler: "Token ungültig oder abgelaufen" });
  }
}

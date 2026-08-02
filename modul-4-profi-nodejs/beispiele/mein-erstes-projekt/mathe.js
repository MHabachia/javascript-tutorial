// Kleine, pure (testbare) Hilfsfunktionen ohne Seiteneffekte

export function summiere(a, b) {
  return a + b;
}

export function teile(a, b) {
  if (b === 0) {
    throw new Error("Division durch 0 ist nicht erlaubt");
  }
  return a / b;
}

export function findeGeradeZahlen(zahlen) {
  return zahlen.filter((zahl) => zahl % 2 === 0);
}

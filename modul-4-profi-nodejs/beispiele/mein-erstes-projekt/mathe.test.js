import { summiere, teile, findeGeradeZahlen } from "./mathe.js";

describe("summiere()", () => {
  test("addiert zwei positive Zahlen korrekt", () => {
    expect(summiere(2, 3)).toBe(5);
  });

  test("funktioniert auch mit negativen Zahlen", () => {
    expect(summiere(-5, 5)).toBe(0);
  });
});

describe("teile()", () => {
  test("teilt zwei Zahlen korrekt", () => {
    expect(teile(10, 2)).toBe(5);
  });

  test("wirft einen Fehler bei Division durch 0", () => {
    expect(() => teile(10, 0)).toThrow("Division durch 0 ist nicht erlaubt");
  });
});

describe("findeGeradeZahlen()", () => {
  test("filtert nur gerade Zahlen heraus", () => {
    expect(findeGeradeZahlen([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
  });

  test("gibt ein leeres Array zurueck, wenn keine geraden Zahlen vorhanden sind", () => {
    expect(findeGeradeZahlen([1, 3, 5])).toEqual([]);
  });
});

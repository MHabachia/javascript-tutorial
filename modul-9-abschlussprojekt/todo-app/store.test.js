import {
  resetStore,
  createUser,
  findUserByEmail,
  createTodo,
  findTodosByUser,
  updateTodo,
  deleteTodo,
} from "./store.js";

beforeEach(() => {
  resetStore(); // jeder Test startet mit einem leeren Datenbestand
});

describe("createUser() & findUserByEmail()", () => {
  test("erstellt einen neuen Nutzer", () => {
    const user = createUser({ email: "anna@test.de", passwordHash: "hash123" });
    expect(user.id).toBe(1);
    expect(user.email).toBe("anna@test.de");
  });

  test("wirft einen Fehler bei bereits registrierter E-Mail", () => {
    createUser({ email: "anna@test.de", passwordHash: "hash123" });
    expect(() =>
      createUser({ email: "anna@test.de", passwordHash: "anders" })
    ).toThrow("E-Mail bereits registriert");
  });

  test("findet einen Nutzer per E-Mail", () => {
    createUser({ email: "ben@test.de", passwordHash: "hash456" });
    expect(findUserByEmail("ben@test.de").email).toBe("ben@test.de");
    expect(findUserByEmail("unbekannt@test.de")).toBeUndefined();
  });
});

describe("Todo-CRUD", () => {
  test("erstellt und findet Todos eines Nutzers", () => {
    createTodo({ userId: 1, titel: "Kurs abschließen" });
    createTodo({ userId: 1, titel: "Projekt deployen" });
    createTodo({ userId: 2, titel: "Fremdes Todo" });

    const todosVonUser1 = findTodosByUser(1);
    expect(todosVonUser1).toHaveLength(2);
    expect(todosVonUser1[0].erledigt).toBe(false); // Standardwert
  });

  test("aktualisiert nur Todos des richtigen Nutzers", () => {
    const todo = createTodo({ userId: 1, titel: "Testen" });

    const aktualisiert = updateTodo(todo.id, 1, { erledigt: true });
    expect(aktualisiert.erledigt).toBe(true);

    const fremderZugriff = updateTodo(todo.id, 2, { erledigt: false });
    expect(fremderZugriff).toBeNull(); // anderer Nutzer darf nicht ändern
  });

  test("löscht ein Todo nur für den richtigen Nutzer", () => {
    const todo = createTodo({ userId: 1, titel: "Löschen" });

    expect(deleteTodo(todo.id, 2)).toBe(false); // falscher Nutzer
    expect(deleteTodo(todo.id, 1)).toBe(true); // richtiger Nutzer
    expect(findTodosByUser(1)).toHaveLength(0);
  });
});

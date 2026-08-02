// store.js - reine, testbare Datenlogik (In-Memory "Datenbank")
//
// Bewusst ohne echte Datenbank gehalten, damit das Projekt ohne Zusatz-Setup
// (MongoDB, PostgreSQL, ...) sofort lauffähig ist. Die Funktionen sind pure
// Funktionen auf einem internen Zustand - siehe Modul 4.2 "Testbarer Code".
// Für eine echte Anwendung würdest du diese Funktionen 1:1 durch Mongoose-
// bzw. SQL-Abfragen ersetzen (siehe Modul 4.4), ohne den Rest der App
// (server.js, auth.js) anfassen zu müssen.

let users = [];
let todos = [];
let nextUserId = 1;
let nextTodoId = 1;

/** Setzt den kompletten Datenbestand zurück (wichtig für isolierte Tests). */
export function resetStore() {
  users = [];
  todos = [];
  nextUserId = 1;
  nextTodoId = 1;
}

export function createUser({ email, passwordHash }) {
  if (users.some((u) => u.email === email)) {
    throw new Error("E-Mail bereits registriert");
  }
  const user = { id: nextUserId++, email, passwordHash };
  users.push(user);
  return user;
}

export function findUserByEmail(email) {
  return users.find((u) => u.email === email);
}

export function createTodo({ userId, titel }) {
  const todo = { id: nextTodoId++, userId, titel, erledigt: false };
  todos.push(todo);
  return todo;
}

export function findTodosByUser(userId) {
  return todos.filter((t) => t.userId === userId);
}

export function updateTodo(id, userId, changes) {
  const todo = todos.find((t) => t.id === id && t.userId === userId);
  if (!todo) {
    return null; // nicht gefunden ODER gehört einem anderen Nutzer
  }
  if (changes.titel !== undefined) {
    todo.titel = changes.titel;
  }
  if (changes.erledigt !== undefined) {
    todo.erledigt = changes.erledigt;
  }
  return todo;
}

export function deleteTodo(id, userId) {
  const index = todos.findIndex((t) => t.id === id && t.userId === userId);
  if (index === -1) {
    return false;
  }
  todos.splice(index, 1);
  return true;
}

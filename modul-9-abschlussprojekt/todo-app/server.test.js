import request from "supertest";
import { app } from "./server.js";
import { resetStore } from "./store.js";

beforeEach(() => {
  resetStore();
});

describe("Auth-Flow", () => {
  test("registriert einen neuen Nutzer", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "anna@test.de", passwort: "geheim123" });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe("anna@test.de");
    expect(res.body.passwordHash).toBeUndefined(); // Hash darf NIE zurückgegeben werden
  });

  test("verweigert doppelte Registrierung", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "anna@test.de", passwort: "geheim123" });

    const res = await request(app)
      .post("/auth/register")
      .send({ email: "anna@test.de", passwort: "anderes-pw" });

    expect(res.status).toBe(409);
  });

  test("loggt einen registrierten Nutzer ein und gibt ein Token zurück", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "ben@test.de", passwort: "geheim123" });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "ben@test.de", passwort: "geheim123" });

    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe("string");
  });

  test("verweigert Login mit falschem Passwort", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "clara@test.de", passwort: "geheim123" });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "clara@test.de", passwort: "falsches-pw" });

    expect(res.status).toBe(401);
  });
});

describe("Geschützte Todo-Routen", () => {
  // Kleiner Helfer: registriert einen Nutzer und gibt dessen Token zurück
  async function registriereUndLogge(email) {
    await request(app)
      .post("/auth/register")
      .send({ email, passwort: "geheim123" });
    const login = await request(app)
      .post("/auth/login")
      .send({ email, passwort: "geheim123" });
    return login.body.token;
  }

  test("verweigert Zugriff ohne Token", async () => {
    const res = await request(app).get("/todos");
    expect(res.status).toBe(401);
  });

  test("erstellt und listet Todos mit gültigem Token", async () => {
    const token = await registriereUndLogge("dora@test.de");

    const erstellt = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ titel: "Kurs abschließen" });
    expect(erstellt.status).toBe(201);

    const liste = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${token}`);
    expect(liste.status).toBe(200);
    expect(liste.body).toHaveLength(1);
  });

  test("aktualisiert und löscht ein eigenes Todo", async () => {
    const token = await registriereUndLogge("erik@test.de");
    const erstellt = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({ titel: "Testen" });

    const aktualisiert = await request(app)
      .put(`/todos/${erstellt.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ erledigt: true });
    expect(aktualisiert.body.erledigt).toBe(true);

    const geloescht = await request(app)
      .delete(`/todos/${erstellt.body.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(geloescht.status).toBe(204);
  });

  test("verweigert Zugriff auf fremde Todos", async () => {
    const tokenA = await registriereUndLogge("frank@test.de");
    const tokenB = await registriereUndLogge("greta@test.de");

    const erstellt = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ titel: "Geheimes Todo" });

    const fremderZugriff = await request(app)
      .delete(`/todos/${erstellt.body.id}`)
      .set("Authorization", `Bearer ${tokenB}`);
    expect(fremderZugriff.status).toBe(404);
  });
});

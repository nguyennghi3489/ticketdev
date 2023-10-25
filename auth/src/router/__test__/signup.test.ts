import request from "supertest";
import { app } from "../../app";

it("return a 201 on successful signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "nnn201@gmail.com",
      password: "012345",
    })
    .expect(201);
});

it("return a 400 on invalid email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "invalidemail",
      password: "012345",
    })
    .expect(400);
});

it("return a 400 on invalid password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "nnn201@gmail.com",
      password: "p",
    })
    .expect(400);
});

it("return a 400 on missing email or password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "nnn201@gmail.com",
      password: "",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "",
      password: "012345",
    })
    .expect(400);
});

it("return a 400 on duplicated email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "nnn201@gmail.com",
      password: "012345",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "nnn201@gmail.com",
      password: "012345",
    })
    .expect(400);
});

it("sets a cookie after signup sucessfully", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "nnn201@gmail.com",
      password: "012345",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});

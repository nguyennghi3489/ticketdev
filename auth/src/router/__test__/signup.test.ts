import request from "supertest";
import { app } from "../../app";

it("return a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "nnn201@gmail.com",
      password: "012345",
    })
    .expect(201);
});

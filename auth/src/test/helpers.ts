import request from "supertest";
import { app } from "../app";

declare global {
  var signin: (email: string, password: string) => Promise<string[]>;
}

global.signin = async (email: string, password: string) => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: email,
      password: password,
    })
    .expect(201);
  return response.get("Set-Cookie");
};

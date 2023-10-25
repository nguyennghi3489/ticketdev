import request from "supertest";
import { app } from "../../app";

const TEST_EMAIL = "nnn2020@gmail.com";
const TEST_PASS = "1923123";

it("return 400 when a email does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: TEST_EMAIL,
      password: TEST_PASS,
    })
    .expect(400);
});

it("return 400 when a password is not correct", async () => {
  await global.signin(TEST_EMAIL, TEST_PASS);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: TEST_EMAIL,
      password: "wrongpassword",
    })
    .expect(400);
});

it("return 200 on signin successfully", async () => {
  await global.signin(TEST_EMAIL, TEST_PASS);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: TEST_EMAIL,
      password: TEST_PASS,
    })
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});

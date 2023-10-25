import request from "supertest";
import { app } from "../../app";

const TEST_EMAIL = "nnn2020@gmail.com";
const TEST_PASS = "1923123";
it("responds with details about the current user", async () => {
  const responseWithCookie = await request(app)
    .post("/api/users/signup")
    .send({
      email: TEST_EMAIL,
      password: TEST_PASS,
    })
    .expect(201);

  const cookie = responseWithCookie.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.user.email).toEqual(TEST_EMAIL);
});

it("return 400 if user in not authorized ", async () => {
  await request(app).get("/api/users/currentuser").send().expect(401);
});

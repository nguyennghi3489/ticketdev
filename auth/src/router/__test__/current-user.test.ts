import request from "supertest";
import { app } from "../../app";

const TEST_EMAIL = "nnn2020@gmail.com";
const TEST_PASS = "1923123";
it("responds with details about the current user", async () => {
  const cookie = await global.signin(TEST_EMAIL, TEST_PASS);

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

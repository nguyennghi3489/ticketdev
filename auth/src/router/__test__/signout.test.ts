import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signing out", async () => {
  await global.signin("nn2021@gmail.com", "21231232");

  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);
  expect(response.get("Set-Cookie")).toEqual([
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly",
  ]);
});

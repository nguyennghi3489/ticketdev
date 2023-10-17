import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("Hi There ! I am Lyon !");
});

export { router as currentUserRouter };

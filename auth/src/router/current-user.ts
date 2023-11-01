import express from "express";
import jwt from "jsonwebtoken";
import { requireAuth } from "@microlyon/common";

const router = express.Router();

router.get("/api/users/currentuser", requireAuth, (req, res) => {
  const payload = jwt.decode(req.session!.jwt);
  res.send({ currentUser: payload });
});

export { router as currentUserRouter };

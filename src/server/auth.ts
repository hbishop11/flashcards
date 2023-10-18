import express, { Router } from "express";
import { UsersController } from "../shared/UserController";

export const auth = Router();

auth.use(express.json());

auth.post("/api/signIn", async (req, res) => {
  console.log({ req });
  const user = await UsersController.signIn(req.body.username);
  if (user) {
    req.session!["user"] = user;
    res.json(user);
  } else {
    res.status(404).json("Invalid user, try 'Steve' or 'Jane'");
  }
});

auth.post("/api/signOut", (req, res) => {
  req.session!["user"] = null;
  res.json("signed out");
});

auth.get("/api/currentUser", (req, res) => res.json(req.session!["user"]));

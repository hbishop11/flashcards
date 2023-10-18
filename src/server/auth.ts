import express, { Router } from "express";
import { remult, type UserInfo } from "remult";
import { User } from "../shared/User";
import { api } from "./api";

const validUsers: UserInfo[] = [
  { id: "1", name: "Jane" },
  { id: "2", name: "Steve" },
];

export const auth = Router();

auth.use(express.json());

auth.post("/api/signIn", api.withRemult, async (req, res) => {
  const userRepo = remult.repo(User);

  const user = await userRepo.findFirst({
    name: req.body.username,
  });
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

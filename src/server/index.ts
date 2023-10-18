import express from "express";
import { api } from "./api";
import session from "cookie-session";
import { auth } from "./auth";

const app = express();
app.use(api);
app.use(
  session({
    secret: process.env["SESSION_SECRET"] || "my secret",
  })
);
console.dir({ auth }, { depth: 5 });
app.use(auth);

app.listen(3002, () => console.log("Server started"));

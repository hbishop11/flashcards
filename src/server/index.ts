import express from "express";
import { api } from "./api";
import path from "path";
import session from "cookie-session";
import { auth } from "./auth";

// const app = express();
// app.use(api);

const app = express();

// app.use(helmet())
// app.use(compression())
app.use(api);
app.use(express.static(path.join(__dirname, "../")));
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "../", "index.html"));
});
app.use(
  session({
    secret: process.env["SESSION_SECRET"] || "my secret",
  })
);
app.use(auth);
app.listen(process.env["PORT"] || 3002, () => console.log("Server started"));

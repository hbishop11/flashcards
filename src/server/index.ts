import express from "express";
import { api } from "./api";
import path from "path"


// const app = express();
// app.use(api);



const app = express()

// app.use(helmet())
// app.use(compression())
app.use(api)
app.use(express.static(path.join(__dirname, "../")))
app.get("/*", (_, res) => {
    res.sendFile(path.join(__dirname, "../", "index.html"))
})

app.listen(process.env["PORT"] || 3002, () => console.log("Server started"));
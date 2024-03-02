import express from "express";
import { config } from "dotenv";
config();
const app = express();
const PORT = process.env.PORT||5000;

app.get("/", (req, res) => {
  res.send("hellow world");
});

app.listen(PORT, () => console.log("server in running on port 5000"));

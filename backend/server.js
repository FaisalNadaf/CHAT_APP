import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import mongoConnect from "./mongo_connect/mongoConnect.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("hellow world");
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  mongoConnect();
  console.log(`server in running on port ${PORT}`);
});

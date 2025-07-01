// src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running 🎯");
});

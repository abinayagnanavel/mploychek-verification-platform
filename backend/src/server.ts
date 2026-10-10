import express from "express";
import cors from "cors";
import authRouter from "./auth";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api", authRouter);

app.get("/", (req, res) => {
  res.json({
    message: "MPloyChek Verification Backend is running!"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK"
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
import express from "express";
import cors from "cors";
import pino from "pino-http";
import helmet from "helmet";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(pino());

app.use((req, res, next) => {
  console.log(`Method: ${req.method}, url: ${req.url}`);
  next();
});

app.use((req, res, next) => {
  console.log(`Time: ${new Date().toISOString()}`);
  next();
});

app.get("/error", (req, res) => {
  throw new Error("This is test error");
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello in my app!" });
});

app.get("/students", (req, res) => {
  res.status(200).json([]);
});

app.post("/students", (req, res) => {
  //   console.log("body", req.body);
  res.status(201).json({ message: "new student" });
});

app.get("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  res.status(200).json({ param: studentId });
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

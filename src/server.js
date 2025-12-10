import express from "express";
import cors from "cors";
import pino from "pino-http";
import helmet from "helmet";
import "dotenv/config";
import createHttpError, { HttpError } from "http-errors";

import { connectMongoDb } from "./db/connectMongoDb.js";
import { Student } from "./models/student.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(pino());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello in my app!" });
});

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
});

app.get("/students/:studentId", async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);
  if (!student) {
    // throw new Error("Student not found!");
    throw createHttpError(404, "Student not found!");
    // res.status(404).json({ message: "Student not found!" });
    // return;
  }
  res.status(200).json(student);
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message || err.name });
    return;
  }
  res.status(500).json({ message: err.message });
});

await connectMongoDb();

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

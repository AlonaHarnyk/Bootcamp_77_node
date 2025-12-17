import express from "express";
import cors from "cors";
import pino from "pino-http";
import helmet from "helmet";
import "dotenv/config";
import { errors } from "celebrate";

import { connectMongoDb } from "./db/connectMongoDb.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import studentsRouter from "./routes/studentsRoutes.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(pino());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello in my app!" });
});

app.use("/students", studentsRouter);

app.use(notFoundHandler);

app.use(errors());
app.use(errorHandler);

await connectMongoDb();

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

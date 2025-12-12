import { Router } from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/studentsControllers.js";

const router = Router();

router.get("/", getStudents);

router.get("/:studentId", getStudentById);

router.post("/", createStudent);

router.delete("/:studentId", deleteStudent);

router.patch("/:studentId", updateStudent);

export default router;

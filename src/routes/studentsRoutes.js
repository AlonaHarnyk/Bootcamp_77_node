import { Router } from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/studentsControllers.js";
import { celebrate } from "celebrate";

import {
  createStudentBodySchema,
  idSchema,
  updateStudentSchema,
} from "../validations/studentsValidation.js";

const router = Router();

router.get("/", getStudents);

router.get("/:studentId", celebrate(idSchema), getStudentById);

router.post(
  "/",
  celebrate(createStudentBodySchema, { abortEarly: false, warnings: true }),
  createStudent
);

router.delete("/:studentId", celebrate(idSchema), deleteStudent);

router.patch("/:studentId", celebrate(updateStudentSchema), updateStudent);

export default router;

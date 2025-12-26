import { Router } from "express";
import { celebrate } from "celebrate";
import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/studentsControllers.js";
import { authenticate } from "../middleware/authenticate.js";

import {
  createStudentBodySchema,
  idSchema,
  updateStudentSchema,
  getStudentsSchema,
} from "../validations/studentsValidation.js";

const router = Router();

router.use(authenticate);

router.get("/", celebrate(getStudentsSchema), getStudents);

router.get("/:studentId", celebrate(idSchema), getStudentById);

router.post(
  "/",
  celebrate(createStudentBodySchema, { abortEarly: false, warnings: true }),
  createStudent
);

router.delete("/:studentId", celebrate(idSchema), deleteStudent);

router.patch("/:studentId", celebrate(updateStudentSchema), updateStudent);

export default router;

import { celebrate } from "celebrate";
import { Router } from "express";
import {
  createUserBodySchema,
  loginUserBodySchema,
} from "../validations/authValidation.js";
import { register, login } from "../controllers/authControllers.js";

const router = Router();

router.post("/register", celebrate(createUserBodySchema), register);
router.post("/login", celebrate(loginUserBodySchema), login);

export default router;

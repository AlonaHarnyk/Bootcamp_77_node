import { celebrate } from "celebrate";
import { Router } from "express";
import {
  createUserBodySchema,
  loginUserBodySchema,
} from "../validations/authValidation.js";
import {
  register,
  login,
  logout,
  refreshSession,
} from "../controllers/authControllers.js";

const router = Router();

router.post("/register", celebrate(createUserBodySchema), register);
router.post("/login", celebrate(loginUserBodySchema), login);
router.post("/refresh", refreshSession);
router.post("/logout", logout);

export default router;

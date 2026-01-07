import { celebrate } from "celebrate";
import { Router } from "express";
import {
  createUserBodySchema,
  loginUserBodySchema,
  reqResetEmailBodySchema,
  reqResetPassBodySchema,
} from "../validations/authValidation.js";
import {
  register,
  login,
  logout,
  refreshSession,
  reqResetEmail,
  resetPassword,
} from "../controllers/authControllers.js";

const router = Router();

router.post("/register", celebrate(createUserBodySchema), register);
router.post("/login", celebrate(loginUserBodySchema), login);
router.post("/refresh", refreshSession);
router.post("/logout", logout);
router.post(
  "/req-reset-email",
  celebrate(reqResetEmailBodySchema),
  reqResetEmail
);
router.post("/reset-pass", celebrate(reqResetPassBodySchema), resetPassword);

export default router;

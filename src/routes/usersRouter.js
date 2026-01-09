import { Router } from "express";
import { updateAvatar } from "../controllers/usersController.js";
import { mediaParser } from "../middleware/multer.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.patch(
  "/current/avatar",
  authenticate,
  mediaParser.single("photo"),
  updateAvatar
);

export default router;

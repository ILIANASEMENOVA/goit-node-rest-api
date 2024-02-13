import express from "express";
const router = express.Router();
import validateBody from "../helpers/validateBody.js";
import schemas from "../models/users.js";

import { authenticate } from "../helpers/authenticate.js";

import * as Auth from "../controllers/users/index.js";
import { upload } from "../helpers/upload.js";

router.post("/register", validateBody(schemas.registerSchema), Auth.register);
router.post("/login", validateBody(schemas.loginSchema), Auth.login);
router.get("/current", authenticate, Auth.getCurrent);
router.post("/logout", authenticate, Auth.logout);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  Auth.updateAvatar
);
export default router;

import express from "express";
const router = express.Router();
import validateBody from "../helpers/validateBody.js";
import schemas from "../models/user.js";

import { authenticate } from "../helpers/authenticate.js";

import * as Auth from "../controllers/auth/index.js";

router.post("/register", validateBody(schemas.registerSchema), Auth.register);
router.post("/login", validateBody(schemas.loginSchema), Auth.login);
router.get("/current", authenticate, Auth.getCurrent);
router.post("/logout", authenticate, Auth.logout);
export default router;

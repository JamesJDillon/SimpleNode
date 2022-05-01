import express, { Router } from "express";
import { AuthController, loginValidation, registerValidation } from "../../controllers/auth.controller";
import validate from "../../misc/validate";

const router: Router = express.Router();

router.post(
  '/',
  validate(loginValidation),
  AuthController.login,
);

router.post(
  '/register',
  validate(registerValidation),
  AuthController.register,
);

export default router;

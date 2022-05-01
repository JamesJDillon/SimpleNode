import express from "express";
import UserController from "../../controllers/user.controller";
import hasRole from "../../misc/hasRole";


const router = express.Router();

router.get(
  '/',
  hasRole(['ADMIN', 'USER']),
  UserController.getUserDetails,
);

export default router;

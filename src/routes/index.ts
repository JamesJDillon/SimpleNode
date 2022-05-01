import express from "express";
import api from "./api/index";

const router = express.Router();
router.use('/v1/api', api);

export default router;

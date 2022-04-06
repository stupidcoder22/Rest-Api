import express from "express";
import registerController from "../controllers/auth/registerController";
const router = express.Router();

router.post("/register", registerController.register);

export default router;

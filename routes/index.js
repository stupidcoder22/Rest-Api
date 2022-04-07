import express from "express";
import loginController from "../controllers/auth/loginController";
import registerController from "../controllers/auth/registerController";
import userController from "../controllers/auth/userController";
import auth from "../middlewares/auth";
const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/identity", auth, userController.identity);

export default router;

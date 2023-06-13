import express from "express";
import { forgotPassword, login, register } from "../controller/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/forgot-password", forgotPassword);

export default router;

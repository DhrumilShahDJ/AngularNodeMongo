import express from "express";
import {
  forgotPassword,
  login,
  refreshToken,
  register,
} from "../controller/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/forgot-password", forgotPassword);
router.post("/getRefreshToken", refreshToken);

export default router;

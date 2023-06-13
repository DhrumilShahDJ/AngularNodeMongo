import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controller/adminController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/getAllUsers", authenticate, getAllUsers);
router.put("/updateUser/:id", authenticate, updateUser);
router.put("/deleteUser/:id", authenticate, deleteUser);

export default router;

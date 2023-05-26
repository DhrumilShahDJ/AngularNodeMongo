import express from "express";
import {
  createRole,
  deleteRole,
  deleteUser,
  getAllRoleLevels,
  getAllRoles,
  getAllUsers,
  updateRole,
  updateUser,
} from "../controller/adminController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/getAllUsers", authenticate, getAllUsers);
router.put("/updateUser/:id", authenticate, updateUser);
router.post("/createRole", authenticate, createRole);
router.put("/deleteUser/:id", authenticate, deleteUser);
router.put("/updateRole/:id", authenticate, updateRole);
router.put("/deleteRole/:id", authenticate, deleteRole);
router.post("/getAllRoles", authenticate, getAllRoles);
router.get("/getAllRoleLevels", authenticate, getAllRoleLevels);

export default router;

import express from "express";
import {
  createRole,
  deleteRole,
  getAllRoleLevels,
  getAllRoles,
  updateRole,
} from "../controller/roleController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/createRole", authenticate, createRole);
router.put("/updateRole/:id", authenticate, updateRole);
router.put("/deleteRole/:id", authenticate, deleteRole);
router.post("/getAllRoles", authenticate, getAllRoles);
router.get("/getAllRoleLevels", authenticate, getAllRoleLevels);

export default router;

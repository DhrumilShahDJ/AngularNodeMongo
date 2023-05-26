import mongoose, { Schema } from "mongoose";
import { Role } from "../interfaces/role.interface";

const RoleSchema: Schema = new Schema({
  name: { type: String, require: true },
  level: { type: Object },
  isActive: { type: Boolean },
});

export default mongoose.model<Role>("Role", RoleSchema);

import mongoose, { Schema } from "mongoose";
import { User } from "../interfaces/auth.interface";

const UserSchema: Schema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  isActive: { type: Boolean },
  role: { type: String },
});

export default mongoose.model<User>("User", UserSchema);

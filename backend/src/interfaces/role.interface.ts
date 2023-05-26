import { ObjectId } from "mongoose";

export interface Level extends Document{
  _id: number;
  priority: number;
  isActive: boolean;
}

export interface Role extends Document {
  _id: ObjectId;
  name: string;
  level: Level;
  isActive: boolean;
}

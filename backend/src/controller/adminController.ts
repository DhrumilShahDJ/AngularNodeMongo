import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../interfaces/auth.interface";
import userModel from "../models/userModel";

export const getAllUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await userModel
    .find({ isActive: true })
    .then((users: User[]) => {
      if (users.length) {
        res.json(users);
      } else {
        res.json({ message: "Data not found" });
      }
    })
    .catch((err) => res.json(err));
};

export const updateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, role } = req.body;
  const { id } = req.params;
  await userModel
    .findByIdAndUpdate(id, { name: name, role: role }, { new: true })
    .then(() => {
      res.json({
        message: "User Updated Successfully",
        statusCode: 200,
      });
    })
    .catch((err) => res.json(err));
};

export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  await userModel
    .findByIdAndUpdate(id, { isActive: false }, { new: true })
    .then(() => {
      res.json({ message: "User deleted seccessfully", statusCode: 200 });
    })
    .catch((err) => res.json(err));
};

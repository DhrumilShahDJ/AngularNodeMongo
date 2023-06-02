import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../interfaces/auth.interface";
import userModel from "../models/userModel";
import { ObjectId } from "mongodb";
import roleModel from "../models/roleModel";
import { Role } from "../interfaces/role.interface";
import { RoleLevel } from "../constant";

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
  const { name, role} = req.body;
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

export const createRole: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, level } = req.body;
  await roleModel
    .create({
      name: name,
      level: RoleLevel.find(data => data._id === level),
      isActive: true,
    })
    .then(() => {
      res.json({ message: "Role Created Successfully", statusCode: 200 });
    })
    .catch((err) => res.json(err));
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, level } = req.body;
  const { id } = req.params;
  await roleModel
    .findByIdAndUpdate(id, { name: name, level: RoleLevel.find(data => data.priority === level) }, { new: true })
    .then(() => {
      res.json({ message: "Role Updated Successfully", statusCode: 200 });
    })
    .catch((err) => res.json(err));
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  await roleModel
    .findByIdAndUpdate(id, { isActive: false }, { new: true })
    .then(() => {
      res.json({ message: "Role deleted seccessfully", statusCode: 200 });
    })
    .catch((err) => res.json(err));
};

export const getAllRoles: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await roleModel
    .find({ isActive: true })
    .then((roles: Role[]) => {
      res.json(roles);
    })
    .catch((err) => res.json(err));
};

export const getAllRoleLevels: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await res.json(RoleLevel);
};

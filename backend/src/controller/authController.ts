import { NextFunction, RequestHandler, Request, Response } from "express";
import { User } from "../interfaces/auth.interface";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import roleModel from "../models/roleModel";
import { Role } from "../interfaces/role.interface";

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  await userModel
    .find({ email: email })
    .then((user: User[]) => {
      if (user.length) {
        res.json({ message: "Email already Exists", statusCode: 403 });
      } else {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            res.json(err);
          } else {
            roleModel
              .find({})
              .then((role: Role[]) => {
                userModel
                  .create({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    isActive: true,
                    role: role.find((data) => data.level.priority === 2)._id,
                  })
                  .then(() =>
                    res.status(200).json({
                      message: "User Created Successfully",
                      statusCode: 200,
                    })
                  )
                  .catch((err) => res.json(err));
              })
              .catch((err) => res.json(err));
          }
        });
      }
    })
    .catch((err) => res.json(err));
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  await userModel
    .find({ email: email })
    .then((user: User[]) => {
      if (user.length) {
        bcrypt.compare(password, user[0].password, (err, result) => {
          if (err) {
            res.json(err);
          }
          if (result === true) {
            roleModel
              .find({ _id: user[0].role, isActive: true })
              .then((role: Role[]) => {
                const token = jwt.sign(
                  {
                    email: email,
                    isLogin: true,
                    name: user[0].name,
                    role: role[0].level.priority,
                  },
                  "secretkey",
                  { expiresIn: "1d" }
                );
                res.json({
                  message: "Login Successfully",
                  token,
                  statusCode: 200,
                });
              })
              .catch((err) => res.json(err));
          } else {
            res.json({ message: "Password does not match", statusCode: 401 });
          }
        });
      } else {
        res.json({ message: "Email does not exists", statusCode: 404 });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

export const forgotPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  await userModel.find({ email: email }).then((user: User[]) => {
    if (user.length) {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          res.json(err);
        } else {
          userModel
            .updateOne({ email: user[0].email }, { password: hashedPassword })
            .then(() =>
              res.json({
                message: "Password Updated Successfully!",
                statusCode: 200,
              })
            )
            .catch((err) => res.json(err));
        }
      });
    } else {
      res.json({ message: "Email does not exists", statusCode: 404 });
    }
  });
};

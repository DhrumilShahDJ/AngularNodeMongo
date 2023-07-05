import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (token) {
    jwt.verify(token, "secretkey", { complete: true }, (err, result) => {
      if (err) {
        res.json({ message: err.name, statusCode: 401 });
      } else {
        next();
      }
    });
  } else {
    res.json({ message: "Unauthorized" });
  }
};

import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRound = 10;
const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      return res.status(500).json({
        message: "Server error, Please try again.",
        error: err,
      });
    }
    const user = new User({
      name,
      email,
      password: hash,
    });
    user
      .save()
      .then((user) => {
        const token = jwt.sign(
          { id: user?._id, role: user.role },
          process.env.JWT_SECRET!,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }
        );
        res.status(201).json({
          token: token,
          message: "User created successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Server error, Please try again.",
          error: error.message,
        });
      });
  });
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return User.findById(id)
    .exec()
    .then((user) => {
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.status(200).json({ data: user, token: token });
      } else {
        res.status(500).json({ message: "User not found" });
      }
    });
};

const readAllUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find()
    .exec()
    .then((users) => {
      if (users) {
        const tokens = users.map((user) =>
          jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          })
        );
        res.status(200).json({ data: users, tokens });
      } else {
        res.status(500).json({ message: "Server error. Please try again" });
      }
    });
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return User.findById(id)
    .exec()
    .then((user) => {
      if (!user) {
        res.status(500).json({ message: "User not found" });
      } else {
        const { name, email, password } = req.body;
        user.name = name;
        user.email = email;
        user.password = password;
        user.save();
        const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET!, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res
          .status(200)
          .json({ token: token, message: "User updated successfully" });
      }
    });
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return User.findByIdAndRemove(id)
    .exec()
    .then((user) => {
      if (!user) {
        res.status(500).json({ message: "User not found" });
      } else {
        const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET!, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res
          .status(200)
          .json({ token: token, message: "User deleted successfully" });
      }
    });
};

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, password } = req.body;
  return User.findOne({ name: name })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(401).json({
          message: "Login failed",
        });
      } else {
        bcrypt.compare(password, user?.password || "", (err, result) => {
          if (err) {
            res.status(401).json({
              message: "Login Failed",
            });
          } else if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
              expiresIn: process.env.JWT_EXPIRES_IN,
            });
            res.status(200).json({
              message: "Login Successful",
              token: token,
            });
          }
        });
      }
    });
};

export default {
  createUser,
  readUser,
  readAllUsers,
  updateUser,
  deleteUser,
  loginUser,
};

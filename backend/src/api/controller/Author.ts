import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Author from "../models/Author";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRound = 10;

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      return res.status(500).json({
        message: "Server error, Please try again.",
        error: err,
      });
    }
    const author = new Author({
      name,
      email,
      password: hash,
    });
    author
      .save()
      .then((author) => {
        const token = jwt.sign(
          { id: author?._id, role: author.role },
          process.env.JWT_SECRET!,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }
        );
        res.status(201).json({
          token: token,
          message: "Author created successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Server error, Please try again.",
          error: error,
        });
      });
  });
};
const readAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  return Author.findById(id)
    .exec()
    .then((author) => {
      if (author) {
        const token = jwt.sign({ id: author._id }, process.env.JWT_SECRET!, {
          expiresIn: process.env.JWT_EXPIRES_IN!,
        });
        res.status(200).json({
          data: author,
          token: token,
        });
      } else {
        res.status(500).json({
          message: "Author not found",
          error: new Error(),
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error. Please try again.",
        error: error,
      });
    });
};

const readAllAuthors = (req: Request, res: Response, next: NextFunction) => {
  return Author.find()
    .exec()
    .then((authors) => {
      if (authors) {
        const token = jwt.sign(
          { id: authors[0]._id },
          process.env.JWT_SECRET!,
          {
            expiresIn: process.env.JWT_EXPIRES_IN!,
          }
        );
        res.status(200).json({
          data: authors,
          message: "List of all authors",
          token: token,
        });
      } else {
        res.status(500).json({
          message: "Server error. Please try again",
          error: new Error(),
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error. Please try again",
        error: error,
      });
    });
};

const updateAuthors = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Author.findById(id)
    .exec()
    .then((author) => {
      if (!author) {
        return res.status(404).json({
          message: "Author not found",
        });
      } else {
        const { name, email } = req.body;
        author.name = name;
        author.email = email;
        author
          .save()
          .then((result) => {
            const token = jwt.sign(
              { id: author?._id },
              process.env.JWT_SECRET!,
              {
                expiresIn: process.env.JWT_EXPIRES_IN!,
              }
            );
            res.status(200).json({
              message: "Author updated successfully",
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: "Server error. Please try again.",
              error: error,
            });
          });
      }
    });
};

const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  return Author.findByIdAndRemove(id)
    .exec()
    .then((author) => {
      if (!author) {
        return res.status(404).json({
          message: "Author not found!!!",
        });
      } else {
        const token = jwt.sign({ id: author?._id }, process.env.JWT_SECRET!, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.status(200).json({
          message: "Author deleted successfully",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Author not deleted",
        error: error,
      });
    });
};

const loginAuthor = (req: Request, res: Response, next: NextFunction) => {
  const { name, password } = req.body;
  return Author.findOne({ name: name })
    .exec()
    .then((author) => {
      if (!author) {
        res.status(401).json({
          message: "Login failed",
        });
      } else {
        if (author?.password) {
          bcrypt.compare(password, author.password, (err, result) => {
            if (err) {
              res.status(401).json({
                message: "Login Failed",
              });
            } else if (result) {
              const token = jwt.sign(
                { id: author._id, role: "author" },
                process.env.JWT_SECRET!,
                { expiresIn: process.env.JWT_EXPIRES_IN! }
              );
              res.status(200).json({
                message: "Login Successful",
                token: token,
              });
            }
          });
        } else {
          res.status(401).json({
            message: "Login Failed",
          });
        }
      }
    });
};

export default {
  createAuthor,
  readAuthor,
  readAllAuthors,
  updateAuthors,
  deleteAuthor,
  loginAuthor,
};

import { NextFunction, Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import Comment from "../models/Comment";
import { userInfo } from "os";
import Blog from "../models/Blog";

const createComment: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user, blog, text } = req.body;

  const comment = new Comment({
    user,
    blog,
    comment: text,
  });
  comment
    .save()
    .then((result) => {
      Blog.findByIdAndUpdate(
        blog,
        { $push: { comments: result._id } },
        { new: true }
      )
        .exec()
        .then((blog) => {
          if (blog) {
            res.status(201).json({
              message: "Comment created successfully and added to blog",
            });
          } else {
            res.status(500).json({
              message: "Server error, Please try again.",
            });
          }
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error, Please try again.",
        error: error.message,
      });
    });
};

const readSingleComment = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Comment.findById(id)
    .exec()
    .then((comment) => {
      if (comment) {
        res.status(200).json({
          comment,
        });
      } else {
        res.status(404).json({
          message: "Comment not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error, Please try again.",
        error: error.message,
      });
    });
};
const readAllComments = (req: Request, res: Response, next: NextFunction) => {
  Comment.find()
    .exec()
    .then((comments) => {
      res.status(200).json({
        comments,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error, Please try again.",
        error: error.message,
      });
    });
};
const deleteComment = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Comment.findByIdAndDelete(id)
    .exec()
    .then((comment) => {
      if (comment) {
        res.status(200).json({
          message: "Comment deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "Comment not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error, Please try again.",
        error: error.message,
      });
    });
};
export default {
  createComment,
  readSingleComment,
  readAllComments,
  deleteComment,
};

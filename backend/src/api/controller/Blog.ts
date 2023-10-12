import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Blog from "../models/Blog";

const createBlog = (req: Request, res: Response, next: NextFunction) => {
  const { title, content, author } = req.body;

  const blog = new Blog({
    title,
    content,
    author,
  });
  blog
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Blog created successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error, Please try again.",
        error: error,
      });
    });
};

const readBlog = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  Blog.findById(id)
    .populate("author")
    .exec()
    .then((blog) => {
      blog
        ? res.status(200).json({
            data: blog,
          })
        : res.status(500).json({
            message: "Blog not found",
          });
    });
};

const readAllBlog = (req: Request, res: Response, next: NextFunction) => {
  Blog.find()
    .populate("author")
    .exec()
    .then((blogs) => {
      blogs
        ? res.status(200).json({
            data: blogs,
            message: "List of all blogs",
          })
        : res.status(500).json({
            message: "Server error. Please try again",
          });
    });
};

const updateBlog = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  Blog.findByIdAndUpdate(id, { title, content, author }, { new: true })
    .exec()
    .then((blog) => {
      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        });
      }
      // const { title, content, author } = req.body;
      // blog.title = title;
      // blog.content = content;
      // blog.author = author;
      blog
        .save()
        .then((result) => {
          res.status(200).json({
            message: "Blog updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Server error, Please try again.",
          });
        });
    });
};

const deleteBlog = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Blog.findByIdAndDelete(id)
    .exec()
    .then((blog) => {
      blog
        ? res.status(200).json({
            message: "Blog deleted successfully",
          })
        : res.status(500).json({
            message: "Blog not found",
          });
    });
};

const updateLikeCount = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Blog.findByIdAndUpdate(id, { $inc: { likeCount: 1 } }, { new: true })
    .exec()
    .then((blog) => {
      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        });
      }
      blog
        .save()
        .then((result) => {
          res.status(200).json({
            message: "Blog updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Server error, Please try again.",
          });
        });
    });
};

const updateViewCount = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Blog.findByIdAndUpdate(id, { $inc: { viewCount: 1 } }, { new: true })
    .exec()
    .then((blog) => {
      if (!blog) {
        return res.status(404).json({
          message: "Blog not found",
        });
      }
      blog
        .save()
        .then((result) => {
          res.status(200).json({
            message: "Blog updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Server error, Please try again.",
          });
        });
    });
};

export default {
  createBlog,
  readBlog,
  readAllBlog,
  updateBlog,
  deleteBlog,
  updateLikeCount,
  updateViewCount,
};

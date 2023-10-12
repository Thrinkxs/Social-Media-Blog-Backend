import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { dbconfig } from "./config/dbconfig";
import {
  authenticateUser,
  authenticateAuthor,
} from "./api/middleware/AuthenticateUser";
// import authenticateAuthor from "./api/middleware/AuthenticateUser";
//Routes
import createBlog from "./api/routes/CreateBlog";
import createComment from "./api/routes/CreateComment";
import createAuthor from "./api/routes/CreateAuthor";
import createUser from "./api/routes/CreateUser";
import loginUser from "./api/routes/LoginUser";
import loginAuthor from "./api/routes/LoginAuthor";
import updateLikeCount from "./api/routes/UpdateLikes";
import updateViewCount from "./api/routes/UpdateViews";

const app = express();
const router = express();
const PORT: Number = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());
dotenv.config();
//Connect to MongoDB
mongoose
  .connect(dbconfig.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });

//Blog Routes
app.use("/api/blogs/create", authenticateUser, authenticateAuthor, createBlog);

//Comment Route
app.use("/api/blogs", authenticateUser, createComment);

//Author Route
app.use("/api/authors/register", createAuthor);
app.use("/api/authors/login", loginAuthor);

//Users route
app.use("/api/users/register", createUser);
app.use("/api/users/login", loginUser);

//Likes
app.use("api/blogs", authenticateUser, updateLikeCount);
//views
app.use("/api/blogs", authenticateAuthor, updateViewCount);

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});

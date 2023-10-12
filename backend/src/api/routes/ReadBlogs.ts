import express from "express";
import controller from "../controller/Blog";

const router = express.Router();

router.get("/", controller.readAllBlog);
export = router;

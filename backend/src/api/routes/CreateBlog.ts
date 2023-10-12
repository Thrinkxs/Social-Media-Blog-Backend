import express from "express";
import controller from "../controller/Blog";

const router = express.Router();

router.post("/", controller.createBlog);
export = router;

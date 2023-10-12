import express from "express";
import controller from "../controller/Blog";

const router = express.Router();

router.get("/:id", controller.readAllBlog);
export = router;

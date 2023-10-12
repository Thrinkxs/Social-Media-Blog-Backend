import express from "express";
import controller from "../controller/Comment";

const router = express.Router();

router.post("/:id/comments", controller.createComment);
export = router;

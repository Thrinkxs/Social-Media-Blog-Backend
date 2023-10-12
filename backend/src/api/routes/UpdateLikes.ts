import express from "express";
import controller from "../controller/Blog";

const router = express.Router();

router.get("/:id/likes", controller.updateLikeCount);
export = router;

import express from "express";
import controller from "../controller/Author";

const router = express.Router();

router.post("/", controller.createAuthor);
export = router;

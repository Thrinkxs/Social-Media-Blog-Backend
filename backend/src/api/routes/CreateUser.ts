import express from "express";
import controller from "../controller/User";

const router = express.Router();

router.post("/", controller.createUser);
export = router;

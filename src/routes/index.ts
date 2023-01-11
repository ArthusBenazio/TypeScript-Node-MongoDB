import express from "express";
import userRouter from "./userRouter";

const router = express.Router();

router.use("/api", userRouter);

export default router;

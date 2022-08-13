import express from "express";
import { articleRouter } from "./article";
import { userRouter } from "./user";
export const restRouter = express.Router();

restRouter.use("/user",userRouter);
restRouter.use("/article",articleRouter);
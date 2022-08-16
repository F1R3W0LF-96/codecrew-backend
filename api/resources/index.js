import express from "express";
import AUTH from "../../middlewares/authJwt";
import { articleRouter } from "./article";
import { userRouter } from "./user";
export const restRouter = express.Router();

restRouter.use("/user",AUTH.authJwt,userRouter);
restRouter.use("/article",articleRouter);
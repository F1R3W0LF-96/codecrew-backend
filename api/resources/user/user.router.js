import express from "express";
import userController from "./user.controler";

export const userRouter=express.Router();

userRouter.route('/')
.get(userController.findUsers)
.post(userController.createUser)
.put(userController.updateUser)
.delete(userController.deleteUser);

userRouter.route('/find/:id')
.get(userController.findUser);
userRouter.route('/all')
.get(userController.findUsers);


userRouter.route('/login')
.get(userController.loginUserDetails);
userRouter.route('/signup')
.post(userController.signUpUserDetails);
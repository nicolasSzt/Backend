import express from "express";
import userController from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", userController.getAll);
userRouter.post("/login", userController.login);
userRouter.post("/register", userController.registrer);
userRouter.get("/verify", userController.verify);

export default userRouter;

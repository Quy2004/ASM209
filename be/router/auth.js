import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  saveUser,
} from "../controller/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/save_user", saveUser);

export default authRouter;

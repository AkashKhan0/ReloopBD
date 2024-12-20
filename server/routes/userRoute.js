import exprees from "express";
import {
  userLogin,
  userRegister,
  adminLogin,
  getUserProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = exprees.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/admin", adminLogin);
userRouter.post("/profile", authUser, getUserProfile);

export default userRouter;

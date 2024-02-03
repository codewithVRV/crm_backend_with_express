import express from "express"
import user_controller from "../../conrollers/user_controller";
import { createUserValidator, signInValidator } from "../../validators/createUser_validator";

const userRouter = express.Router()

userRouter.post("/signup", [createUserValidator], user_controller.createUser)
userRouter.post("/signin", [signInValidator], user_controller.signin)
userRouter.get("/", user_controller.getAllUsers)
userRouter.get("/:id", user_controller.getUser)


export default userRouter;
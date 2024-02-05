"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../../conrollers/user_controller"));
const createUser_validator_1 = require("../../validators/createUser_validator");
const userRouter = express_1.default.Router();
userRouter.post("/signup", [createUser_validator_1.createUserValidator], user_controller_1.default.createUser);
userRouter.post("/signin", [createUser_validator_1.signInValidator], user_controller_1.default.signin);
userRouter.get("/", user_controller_1.default.getAllUsers);
userRouter.get("/:id", user_controller_1.default.getUser);
exports.default = userRouter;

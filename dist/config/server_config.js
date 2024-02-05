"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const dotenv = require("dotenv")
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    PORT: process.env.PORT,
    MAIL_FROM: process.env.MAIL_FROM,
    SENDGRID_API_KEY: (process.env.SENDGRID_API_KEY === undefined) ? "" : process.env.SENDGRID_API_KEY,
    SALT_ROUNDS: (process.env.SALT_ROUNDS == undefined) ? 10 : +process.env.SALT_ROUNDS,
    SECRET_KEY: (process.env.SECRET_KEY == undefined) ? "dummy" : process.env.SECRET_KEY,
    EXPIRE_TOKEN: (process.env.EXPIRE_TOKEN == undefined) ? "1h" : process.env.EXPIRE_TOKEN,
};

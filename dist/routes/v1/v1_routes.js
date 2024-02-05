"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./user_routes"));
const ticket_routes_1 = __importDefault(require("./ticket_routes"));
const v1Router = express_1.default.Router();
v1Router.use("/users", user_routes_1.default);
v1Router.use("/tickets", ticket_routes_1.default);
exports.default = v1Router;

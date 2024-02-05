"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_validator_1 = require("../../validators/auth_validator");
const ticket_controller_1 = __importDefault(require("../../conrollers/ticket_controller"));
const ticket_validator_1 = require("../../validators/ticket_validator");
const ticketRouter = express_1.default.Router();
ticketRouter.post("/", [auth_validator_1.isLoggedIn], ticket_controller_1.default.createTicket);
ticketRouter.patch("/:id", [auth_validator_1.isLoggedIn, auth_validator_1.isAdminOrEngineer, ticket_validator_1.updateTicketValidator], ticket_controller_1.default.updateTicket);
exports.default = ticketRouter;

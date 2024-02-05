"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const generic_1 = __importDefault(require("../errors/generic"));
const response_utils_1 = require("../utils/response.utils");
const ticket_service_1 = __importDefault(require("../services/ticket_service"));
const ticket_repository_1 = __importDefault(require("../repositories/ticket_repository"));
const user_repository_1 = __importDefault(require("../repositories/user_repository"));
const ticketService = new ticket_service_1.default(new ticket_repository_1.default(), new user_repository_1.default);
function createTicket(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const response = yield ticketService.createTicket(req.body, user.id);
            return res.status(201).json({
                success: true,
                error: {},
                message: "Ticket Created successfull",
                data: response
            });
        }
        catch (error) {
            if (error instanceof generic_1.default) {
                return res.status(error.statusCode).json({
                    message: 'Something went wrong',
                    data: {},
                    err: error,
                    success: true
                });
            }
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_utils_1.UnknownError);
        }
    });
}
function updateTicket(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const response = yield ticketService.updateTicket(req.params.id, req.body, user.id, user.email);
            return res.status(201).json({
                success: true,
                error: {},
                message: "Ticket Update successfull",
                data: response
            });
        }
        catch (error) {
            if (error instanceof generic_1.default) {
                return res.status(error.statusCode).json({
                    message: 'Something went wrong',
                    data: {},
                    err: error,
                    success: true
                });
            }
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(response_utils_1.UnknownError);
        }
    });
}
exports.default = {
    createTicket, updateTicket
};

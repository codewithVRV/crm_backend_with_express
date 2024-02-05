"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const generic_1 = __importDefault(require("./generic"));
class UnAuthorizedError extends generic_1.default {
    constructor(message) {
        const errorMessage = (message) ? message : "Invalid login credentials! Please try again later!";
        super(http_status_codes_1.StatusCodes.UNAUTHORIZED, http_status_codes_1.ReasonPhrases.UNAUTHORIZED, errorMessage, "UnAuthorizedError");
    }
}
exports.default = UnAuthorizedError;

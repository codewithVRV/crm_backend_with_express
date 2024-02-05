"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const generic_1 = __importDefault(require("./generic"));
class BadRequestError extends generic_1.default {
    constructor(reason = null) {
        const errorMessage = "There are some invalid or missing properties in the request";
        super(http_status_codes_1.StatusCodes.BAD_REQUEST, reason, errorMessage, "BadRequestError");
    }
}
exports.default = BadRequestError;

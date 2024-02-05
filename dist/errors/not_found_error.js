"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const generic_1 = __importDefault(require("./generic"));
class NotFoundError extends generic_1.default {
    constructor(resourceName, property, propertyValue) {
        const errorMessage = `The Resource: ${resourceName} with property ${property} : ${propertyValue} not Found!`;
        super(http_status_codes_1.StatusCodes.NOT_FOUND, http_status_codes_1.ReasonPhrases.NOT_FOUND, errorMessage, "NotFoundError");
    }
}
exports.default = NotFoundError;

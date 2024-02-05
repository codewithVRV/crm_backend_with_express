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
exports.updateTicketValidator = void 0;
const class_validator_1 = require("class-validator");
const updateTicket_dto_1 = __importDefault(require("../dtos/updateTicket_dto"));
const badRequest_1 = __importDefault(require("../errors/badRequest"));
const http_status_codes_1 = require("http-status-codes");
function updateTicketValidator(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const incomingRequestBody = Object.assign(new updateTicket_dto_1.default(), req.body);
        const errors = yield (0, class_validator_1.validate)(incomingRequestBody);
        if (errors.length > 0) {
            const errorResponse = errors.map(err => {
                return {
                    property: err.property,
                    constraints: err.constraints
                };
            });
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                err: new badRequest_1.default(errorResponse),
                data: {},
                success: false,
                message: 'Invalid parameters sent in the request'
            });
        }
        next();
    });
}
exports.updateTicketValidator = updateTicketValidator;

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
const user_repository_1 = __importDefault(require("../repositories/user_repository"));
const user_service_1 = __importDefault(require("../services/user_service"));
const response_utils_1 = require("../utils/response.utils");
const userService = new user_service_1.default(new user_repository_1.default());
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield userService.createUser(req.body);
            return res.status(201).json({
                success: true,
                error: {},
                message: "User Created successfull",
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
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield userService.signin(req.body);
            res.setHeader("x-access-token", response);
            return res.status(201).json({
                success: true,
                error: {},
                message: "User login successfull",
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
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield userService.getUser(req.params.id);
            return res.status(200).json({
                success: true,
                error: {},
                message: "Fetch details successfull",
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
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield userService.getAllUsers();
            return res.status(200).json({
                success: true,
                error: {},
                message: "Fetch all details successfull",
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
    getUser, getAllUsers, createUser, signin
};

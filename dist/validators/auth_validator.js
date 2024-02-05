"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminOrEngineer = exports.isEngineer = exports.isAdmin = exports.isLoggedIn = void 0;
const http_status_codes_1 = require("http-status-codes");
const auth_util_1 = require("../utils/auth_util");
const unauthorized_1 = __importDefault(require("../errors/unauthorized"));
const isLoggedIn = function (req, res, next) {
    if (!req.headers || !req.headers["x-access-token"]) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            sucess: false,
            data: {},
            message: "You are not valid to do this operation",
            err: new unauthorized_1.default(),
        });
    }
    let token = req.headers["x-access-token"].toString();
    let decodedToken;
    try {
        decodedToken = (0, auth_util_1.verifyToken)(token);
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            sucess: false,
            data: {},
            message: "You are not valid to do this operation",
            err: new unauthorized_1.default(),
        });
    }
    req.user = decodedToken;
    next();
};
exports.isLoggedIn = isLoggedIn;
const isAdmin = function (req, res, next) {
    try {
        const roles = req.user.role;
        console.log("user is", roles);
        if (roles.find((role) => role === "Admin")) {
            next();
        }
        else {
            throw new unauthorized_1.default();
        }
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            sucess: false,
            data: {},
            message: "You are not valid to do this operation",
            err: new unauthorized_1.default(),
        });
    }
};
exports.isAdmin = isAdmin;
const isEngineer = function (req, res, next) {
    try {
        const roles = req.user.role;
        console.log("user is", roles);
        if (roles.find((role) => role === "Engineer")) {
            next();
        }
        else {
            throw new unauthorized_1.default();
        }
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            sucess: false,
            data: {},
            message: "You are not valid to do this operation",
            err: new unauthorized_1.default(),
        });
    }
};
exports.isEngineer = isEngineer;
const isAdminOrEngineer = function (req, res, next) {
    try {
        const roles = req.user.role;
        console.log("user is", roles);
        if (roles.find((role) => (role === "Admin" || role === "Engineer"))) {
            next();
        }
        else {
            throw new unauthorized_1.default();
        }
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            sucess: false,
            data: {},
            message: "You are not valid to do this operation",
            err: new unauthorized_1.default(),
        });
    }
};
exports.isAdminOrEngineer = isAdminOrEngineer;

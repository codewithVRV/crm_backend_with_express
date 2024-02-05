"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_config_1 = __importDefault(require("../config/server_config"));
const unauthorized_1 = __importDefault(require("../errors/unauthorized"));
function generateJwtToken(obj) {
    return jsonwebtoken_1.default.sign(obj, server_config_1.default.SECRET_KEY, { expiresIn: server_config_1.default.EXPIRE_TOKEN });
}
exports.generateJwtToken = generateJwtToken;
function verifyToken(token) {
    try {
        const response = jsonwebtoken_1.default.verify(token, server_config_1.default.SECRET_KEY);
        return response;
    }
    catch (error) {
        throw new unauthorized_1.default();
    }
}
exports.verifyToken = verifyToken;

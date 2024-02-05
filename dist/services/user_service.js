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
const bcrypt_1 = __importDefault(require("bcrypt"));
const server_config_1 = __importDefault(require("../config/server_config"));
const auth_util_1 = require("../utils/auth_util");
const not_found_error_1 = __importDefault(require("../errors/not_found_error"));
const unauthorized_1 = __importDefault(require("../errors/unauthorized"));
class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    createUser(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // encrypt password here...
                const salts = bcrypt_1.default.genSaltSync(server_config_1.default.SALT_ROUNDS);
                userDetails.password = bcrypt_1.default.hashSync(userDetails.password, salts);
                const response = yield this.repository.createUser(userDetails);
                return response;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.getUser(id);
                if (!response) {
                    throw { error: "Not found" };
                }
                return response;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.repository.getAllUsers();
                if (!response) {
                    throw { error: "Not found" };
                }
                return response;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    signin(signinDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // if user is present or not
                const user = yield this.repository.getUserByEmail(signinDetails.email);
                if (!user) {
                    throw new not_found_error_1.default("User", "email", signinDetails.email);
                }
                // compare password with the hashed one in database
                const doesPasswordMatch = bcrypt_1.default.compareSync(signinDetails.password, user.password);
                if (!doesPasswordMatch) {
                    throw new unauthorized_1.default();
                }
                const jwt = (0, auth_util_1.generateJwtToken)({ id: user.id, email: user.email, role: user.roles });
                return jwt;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.default = UserService;

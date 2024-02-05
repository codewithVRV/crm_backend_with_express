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
const mail_1 = __importDefault(require("@sendgrid/mail"));
const server_config_1 = __importDefault(require("../config/server_config"));
class MailerService {
    constructor() {
        mail_1.default.setApiKey(server_config_1.default.SENDGRID_API_KEY);
    }
    sendEmail(to, subject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = {
                to: to,
                from: server_config_1.default.MAIL_FROM || "",
                subject: subject,
                text: body,
                html: body,
            };
            try {
                const response = yield mail_1.default.send(email);
                console.log(response);
                return {
                    message: 'MAIL SENT SUCCESSFULLY',
                    success: true
                };
            }
            catch (error) {
                console.log(error);
                return {
                    success: false
                };
            }
        });
    }
}
exports.default = MailerService;

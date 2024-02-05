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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const response_time_1 = __importDefault(require("response-time"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const server_config_1 = __importDefault(require("../src/config/server_config"));
const routes_1 = __importDefault(require("./routes"));
const auth_validator_1 = require("./validators/auth_validator");
app.use((0, cookie_parser_1.default)());
app.use((0, response_time_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.text());
app.use("/api", routes_1.default);
app.get("/api/v1/ping", [auth_validator_1.isLoggedIn, auth_validator_1.isAdmin], (req, res) => {
    return res.json({ mess: "validate request successfully" });
});
app.listen(server_config_1.default.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`App is listening port at no ${server_config_1.default.PORT}`);
    // const user = await prisma.user.create({
    //     data: {
    //         name: "vishnu kumar",
    //         email: "vk47@gmail.com",
    //         password: "12345",
    //     }
    // })
    // console.log("user is", user)
    // const user = await prisma.user.findMany()
}));

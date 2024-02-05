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
const client_1 = require("@prisma/client");
const not_found_error_1 = __importDefault(require("../errors/not_found_error"));
const prisma = new client_1.PrismaClient();
class UserRepository {
    createUser(userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield prisma.user.create({
                    data: {
                        name: userDetails.name,
                        email: userDetails.email,
                        password: userDetails.password
                    }
                });
                return response;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield prisma.user.findUnique({
                    where: {
                        id: userId
                    }
                });
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
                const response = yield prisma.user.findMany();
                return response;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield prisma.user.findUnique({
                    where: {
                        email: userEmail
                    }
                });
                return response;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    addCreatedTicket(id, ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.update({
                    where: {
                        id: id
                    },
                    data: {
                        ticketsCreated: {
                            push: ticketId
                        }
                    }
                });
                return user;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    addAssignedTicket(id, ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.update({
                    where: {
                        id: id,
                        roles: {
                            hasSome: ["Engineer"]
                        }
                    },
                    data: {
                        ticketsAssigned: {
                            push: ticketId
                        }
                    }
                });
                return user;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getEngineers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma.user.findMany({
                    where: {
                        roles: {
                            hasSome: ["Engineer"]
                        }
                    }
                });
                return users;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getAvailableEngineer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield prisma.user.aggregateRaw({
                    pipeline: [
                        {
                            $match: {
                                "roles": {
                                    "$in": ["Engineer"]
                                }
                            }
                        },
                        {
                            $project: {
                                id: 1,
                                email: 1,
                                ticketsAssignedCount: {
                                    $cond: {
                                        if: { $isArray: "$ticketsAssigned" },
                                        then: { $size: "$ticketsAssigned" },
                                        else: 1
                                    }
                                }
                            }
                        }, // include a new field in every document
                        {
                            $sort: {
                                ticketsAssignedCount: 1 // sorting the documents
                            }
                        },
                        {
                            $limit: 1 // limit the document 1
                        },
                    ]
                });
                console.log(response);
                if (typeof response[0] === "object" && response[0]._id && response[0].email && response[0].ticketsAssignedCount) {
                    const idObject = response[0]._id;
                    const engineer = {
                        id: idObject["$oid"],
                        email: response[0].email,
                        ticketsAssignedCount: response[0].ticketsAssignedCount
                    };
                    return engineer;
                }
                throw new not_found_error_1.default("User", "role", "Engineer");
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    isUserEngineer(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findUnique({
                    where: {
                        email: userEmail
                    }
                });
                if (!user)
                    return false;
                return user.roles.includes("Engineer");
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    isUserAdmin(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findUnique({
                    where: {
                        email: userEmail
                    }
                });
                if (!user)
                    return false;
                return user.roles.includes("Admin");
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.default = UserRepository;

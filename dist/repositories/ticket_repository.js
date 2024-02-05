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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TicketRepository {
    createTicket(ticketDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield prisma.ticket.create({
                    data: Object.assign({}, ticketDetails)
                });
                return response;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    get(ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield prisma.ticket.findUnique({
                where: {
                    id: ticketId
                }
            });
            return ticket;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const tickets = yield prisma.ticket.findMany();
            return tickets;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    updateTicket(id, updateDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield prisma.ticket.update({
                    where: {
                        id: id
                    },
                    data: Object.assign({}, updateDetails)
                });
                return response;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
}
exports.default = TicketRepository;

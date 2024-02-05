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
const not_found_error_1 = __importDefault(require("../errors/not_found_error"));
const badRequest_1 = __importDefault(require("../errors/badRequest"));
const internal_server_error_1 = __importDefault(require("../errors/internal_server_error"));
const mailer_service_1 = __importDefault(require("./mailer_service"));
const ticket_mailer_1 = require("../mailer/ticket_mailer");
class TicketService {
    constructor(repository, userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.mailer = new mailer_service_1.default();
    }
    createTicket(ticketDetails, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ticket = yield this.repository.createTicket(ticketDetails);
                const createdBy = yield this.userRepository.getUser(userId);
                if (!createdBy) {
                    throw new not_found_error_1.default("User", "id", userId);
                }
                const engineer = yield this.getEngineerToAllocateTicket();
                yield this.userRepository.addAssignedTicket(engineer.id, ticket.id);
                yield this.userRepository.addCreatedTicket(createdBy.id, ticket.id);
                ticket = yield this.repository.updateTicket(ticket.id, { createdBy: createdBy.email, assignedTo: engineer.email });
                const res = yield this.mailer.sendEmail(ticket.createdBy || "", `Successfully created Your ticket with ticketid ${ticket.id}`, (0, ticket_mailer_1.ticketCreatedMail)(ticket.id));
                console.log("response is", res);
                return ticket;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getEngineerToAllocateTicket() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const engineers = await this.userRepository.getEngineers()
                const engineer = yield this.userRepository.getAvailableEngineer();
                return engineer;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    updateTicket(ticketId, ticketDetails, userId, userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const areWeUpdatingAssignedTo = ticketDetails.assignedTo !== undefined;
                if (areWeUpdatingAssignedTo) {
                    if (!((yield this.userRepository.isUserAdmin(ticketDetails.assignedTo)) || (yield this.userRepository.isUserEngineer(ticketDetails.assignedTo)))) {
                        throw new badRequest_1.default("assignedTo email is not a vaild Admin or Engineer");
                    }
                }
                const updateObject = (areWeUpdatingAssignedTo) ? Object.assign(Object.assign({}, ticketDetails), { updatedAt: new Date(), assignee: userEmail }) : Object.assign(Object.assign({}, ticketDetails), { updatedAt: new Date() });
                const ticket = yield this.repository.updateTicket(ticketId, updateObject);
                return ticket;
            }
            catch (error) {
                console.log(error);
                if (error instanceof badRequest_1.default) {
                    throw error;
                }
                throw new internal_server_error_1.default();
            }
        });
    }
}
exports.default = TicketService;

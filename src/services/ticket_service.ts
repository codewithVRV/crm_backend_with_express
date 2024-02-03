import { Prisma, Ticket } from "@prisma/client"
import createUserDtos from "../dtos/createUser_dtos";
import bcrypt from "bcrypt"
import server_config from "../config/server_config";
import NotFoundError from "../errors/not_found_error";
import UnAuthorizedError from "../errors/unauthorized";
import TicketRepository from "../repositories/ticket_repository";
import createTicketDtos from "../dtos/createTicket_dto";
import UserRepository from "../repositories/user_repository";
import UpdateTicketDto from "../dtos/updateTicket_dto";
import BadRequestError from "../errors/badRequest";
import InternalServerError from "../errors/internal_server_error";
import MailerService from "./mailer_service";
import { ticketCreatedMail } from "../mailer/ticket_mailer";


class TicketService {
    private repository: TicketRepository
    private userRepository: UserRepository
    private mailer : MailerService
    constructor(repository : TicketRepository, userRepository: UserRepository) {
        this.repository = repository
        this.userRepository = userRepository;
        this.mailer = new MailerService()
    }

    async createTicket(ticketDetails: createTicketDtos, userId:string) : Promise<Ticket> {
        try{
            let ticket = await this.repository.createTicket(ticketDetails)
            const createdBy = await this.userRepository.getUser(userId)
            if(!createdBy){
                throw new NotFoundError("User", "id", userId)
            }
            const engineer = await this.getEngineerToAllocateTicket()
            await this.userRepository.addAssignedTicket(engineer.id, ticket.id)
            await this.userRepository.addCreatedTicket(createdBy.id, ticket.id)
            ticket = await this.repository.updateTicket(ticket.id, {createdBy: createdBy.email, assignedTo: engineer.email})
            const res = await this.mailer.sendEmail(ticket.createdBy || "", `Successfully created Your ticket with ticketid ${ticket.id}`,  ticketCreatedMail(ticket.id))
            console.log("response is", res)
            return ticket;
        }

        catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getEngineerToAllocateTicket() {
        try{
            // const engineers = await this.userRepository.getEngineers()
            const engineer = await this.userRepository.getAvailableEngineer()
            return engineer;
        }   
        
        catch(error) {
            console.log(error);
            throw error;
        }
    }


    async updateTicket(ticketId:string, ticketDetails: UpdateTicketDto, userId:string, userEmail:string) {
        try{

            const areWeUpdatingAssignedTo = ticketDetails.assignedTo !== undefined;
            if(areWeUpdatingAssignedTo) {
                if(!(await this.userRepository.isUserAdmin(ticketDetails.assignedTo) || await this.userRepository.isUserEngineer(ticketDetails.assignedTo))){
                    throw new BadRequestError("assignedTo email is not a vaild Admin or Engineer")
                }
            }
            const updateObject = (areWeUpdatingAssignedTo) ? {...ticketDetails, updatedAt: new Date(), assignee: userEmail} : {...ticketDetails, updatedAt: new Date()}
            const ticket = await this.repository.updateTicket(ticketId, updateObject as Partial<Prisma.TicketUpdateInput>)
            return ticket;
        }
        catch(error) {
            console.log(error);
            if(error instanceof BadRequestError) {
                throw error;
            }
            throw new InternalServerError();
        }
    }

}

export default TicketService;
import { StatusCodes } from "http-status-codes";
import GenericError from "../errors/generic";
import { Request, Response } from "express";
import { UnknownError } from "../utils/response.utils";
import TicketService from "../services/ticket_service";
import TicketRepository from "../repositories/ticket_repository";
import { RequestWithUser } from "../types/request_with_user";
import UserRepository from "../repositories/user_repository";


const ticketService: TicketService = new TicketService(new TicketRepository(), new UserRepository)

async function createTicket(req:Request, res:Response){
    try{
        const user = (req as RequestWithUser).user
        const response = await ticketService.createTicket(req.body, user.id);

        return res.status(201).json({
            success: true,
            error: {},
            message: "Ticket Created successfull",
            data: response
        })
    }
    catch(error) {
        if(error instanceof GenericError) {
            return res.status(error.statusCode).json({
                message: 'Something went wrong',
                data: {},
                err: error,
                success: true
            })
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(UnknownError)

    }
}
async function updateTicket(req:Request, res:Response){
    try{
        const user = (req as RequestWithUser).user
        const response = await ticketService.updateTicket(req.params.id, req.body, user.id, user.email);

        return res.status(201).json({
            success: true,
            error: {},
            message: "Ticket Update successfull",
            data: response
        })
    }
    catch(error) {
        if(error instanceof GenericError) {
            return res.status(error.statusCode).json({
                message: 'Something went wrong',
                data: {},
                err: error,
                success: true
            })
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(UnknownError)

    }
}


export default {
    createTicket, updateTicket
}
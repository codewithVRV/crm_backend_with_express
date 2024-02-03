import { validate } from "class-validator";
import UpdateTicketDto from "../dtos/updateTicket_dto";
import BadRequestError from "../errors/badRequest";
import { StatusCodes } from "http-status-codes";
import {Request, Response, NextFunction } from "express";

export async function updateTicketValidator(req: Request, res: Response, next: NextFunction) {

    const incomingRequestBody : UpdateTicketDto = Object.assign(new UpdateTicketDto(), req.body);
    const errors = await validate(incomingRequestBody)
    if(errors.length > 0) {
        const errorResponse = errors.map(err => {
            return {
                property: err.property,
                constraints: err.constraints
            }
        });
        return res.status(StatusCodes.BAD_REQUEST).json({
            err: new BadRequestError(errorResponse),
            data: {},
            success: false,
            message: 'Invalid parameters sent in the request'
        });
    }

    next();

}
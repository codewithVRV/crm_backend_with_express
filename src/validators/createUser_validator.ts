import { Request, Response, NextFunction } from "express";
import createUserDtos from "../dtos/createUser_dtos";
import { validate } from "class-validator";
import SigninDtos from "../dtos/signin_dtos";
import {StatusCodes} from "http-status-codes"
import BadRequest from "../errors/badRequest";

export async function createUserValidator (req : Request, res : Response, next: NextFunction) {

    const incomingRequestBody : createUserDtos = new createUserDtos(req.body.name, req.body.email, req.body.password)
    const errors = await validate(incomingRequestBody);
    if(errors.length > 0) {
        const errorResponse = errors.map(err => {
            return {
                property: err.property,
                constraints: err.constraints
            }
        })
        return res.status(StatusCodes.BAD_REQUEST).json({
            err: new BadRequest(errorResponse),
            data: {},
            success: false,
            message: 'Invalid parameters sent in the request'
        });
    }
    next()
}
export async function signInValidator(req: Request, res: Response, next: NextFunction) {

    const incomingRequestBody : SigninDtos = new SigninDtos(req.body.email, req.body.password);
    const errors = await validate(incomingRequestBody);
    if(errors.length > 0) {
        const errorResponse = errors.map(err => {
            return {
                property: err.property,
                constraints: err.constraints
            }
        })
        return res.status(StatusCodes.BAD_REQUEST).json({
            err: new BadRequest(errorResponse),
            data: {},
            success: false,
            message: 'Invalid parameters sent in the request'
        });
    }

    next();

}
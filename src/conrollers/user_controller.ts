import { StatusCodes } from "http-status-codes";
import GenericError from "../errors/generic";
import UserRepository from "../repositories/user_repository";
import UserService from "../services/user_service";
import { Request, Response } from "express";
import { UnknownError } from "../utils/response.utils";


const userService: UserService = new UserService(new UserRepository())

async function createUser(req:Request, res:Response){
    try{
        const response = await userService.createUser(req.body);

        return res.status(201).json({
            success: true,
            error: {},
            message: "User Created successfull",
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
async function signin(req:Request, res:Response){
    try{
        const response = await userService.signin(req.body);
        res.setHeader("x-access-token", response)

        return res.status(201).json({
            success: true,
            error: {},
            message: "User login successfull",
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

async function getUser(req:Request, res:Response){
    try{
        const response = await userService.getUser(req.params.id);
        return res.status(200).json({
            success: true,
            error: {},
            message: "Fetch details successfull",
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

async function getAllUsers(req:Request, res:Response){
    try{
        const response = await userService.getAllUsers();
        return res.status(200).json({
            success: true,
            error: {},
            message: "Fetch all details successfull",
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
    getUser, getAllUsers, createUser, signin
}
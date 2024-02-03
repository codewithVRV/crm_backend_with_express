import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import { verifyToken } from "../utils/auth_util"
import { RequestWithUser } from "../types/request_with_user"
import UnAuthorizedError from "../errors/unauthorized"
import JwtDecodeUser from "../types/jwt_decode_user"

export const isLoggedIn = function (req :Request, res:Response, next:NextFunction) {
    if(!req.headers || !req.headers["x-access-token"]){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            sucess: false,
            data: {},
            message: "You are not valid to do this operation",
            err: new UnAuthorizedError(),
        })
    }
    let token : string = req.headers["x-access-token"].toString();

    let decodedToken : JwtDecodeUser;
    try{
        decodedToken = verifyToken(token)
    }
    catch(error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            sucess: false,
            data: {},
            message: "You are not valid to do this operation",
            err: new UnAuthorizedError(),
        })
    }
    (req as RequestWithUser).user = decodedToken;
    next()
}

export const isAdmin = function (req:Request, res:Response, next:NextFunction) {
    try{

        const roles : string[] = (req as RequestWithUser).user.role
        console.log("user is", roles)
        if(roles.find((role) => role === "Admin")){
            next()
        }
        else{
            throw new UnAuthorizedError();
        }
    }   
    catch(error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            sucess: false,
            data: {},
            message: "You are not valid to do this operation",
            err: new UnAuthorizedError(),
        })
    }
}
export const isEngineer = function (req:Request, res:Response, next:NextFunction) {
    try{

        const roles : string[] = (req as RequestWithUser).user.role
        console.log("user is", roles)
        if(roles.find((role) => role === "Engineer")){
            next()
        }
        else{
            throw new UnAuthorizedError();
        }
    }   
    catch(error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            sucess: false,
            data: {},
            message: "You are not valid to do this operation",
            err: new UnAuthorizedError(),
        })
    }
}
export const isAdminOrEngineer = function (req:Request, res:Response, next:NextFunction) {
    try{

        const roles : string[] = (req as RequestWithUser).user.role
        console.log("user is", roles)
        if(roles.find((role) => (role === "Admin" ||role === "Engineer"))){
            next()
        }
        else{
            throw new UnAuthorizedError();
        }
    }   
    catch(error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            sucess: false,
            data: {},
            message: "You are not valid to do this operation",
            err: new UnAuthorizedError(),
        })
    }
}
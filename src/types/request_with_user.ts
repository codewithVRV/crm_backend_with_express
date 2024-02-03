import { Request } from "express";
import JwtDecodeUser from "./jwt_decode_user";

export interface RequestWithUser extends Request {
    user : JwtDecodeUser
}
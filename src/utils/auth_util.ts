
import  Jwt, { JwtPayload }  from "jsonwebtoken";
import server_config from "../config/server_config";
import UnAuthorizedError from "../errors/unauthorized";
import JwtDecodeUser from "../types/jwt_decode_user";

export function generateJwtToken (obj:any) : string {
    return Jwt.sign(obj, server_config.SECRET_KEY, {expiresIn: server_config.EXPIRE_TOKEN})
}

export function verifyToken (token :string) : JwtDecodeUser {
    try{
        const response =  Jwt.verify(token, server_config.SECRET_KEY)
        return (response as JwtDecodeUser)
    }
    catch(error) {
        throw new UnAuthorizedError()
    }
}
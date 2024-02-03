import { User } from "@prisma/client"
import UserRepository from "../repositories/user_repository"
import createUserDtos from "../dtos/createUser_dtos";
import bcrypt from "bcrypt"
import server_config from "../config/server_config";
import SigninDtos from "../dtos/signin_dtos";
import { generateJwtToken } from '../utils/auth_util';
import NotFoundError from "../errors/not_found_error";
import UnAuthorizedError from "../errors/unauthorized";


class UserService {
    private repository: UserRepository
    constructor(repository : UserRepository) {
        this.repository = repository
    }

    async createUser(userDetails: createUserDtos) : Promise<User> {
        try{
            // encrypt password here...
            const salts = bcrypt.genSaltSync(server_config.SALT_ROUNDS)
            userDetails.password = bcrypt.hashSync(userDetails.password, salts)
            const response : User = await this.repository.createUser(userDetails)
            return response;
        }
        catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getUser(id:string) : Promise<User> {
        try{
            const response : User | null = await this.repository.getUser(id)
            if(!response){
                throw {error: "Not found"}
            }
            return response;
        }
        catch(error) {
            console.log(error)
            throw error;
        }
    }
    async getAllUsers() : Promise<User[]> {
        try{
            const response : User[] = await this.repository.getAllUsers()
            if(!response){
                throw {error: "Not found"}
            }
            return response;
        }
        catch(error) {
            console.log(error)
            throw error;
        }
    }

    async signin(signinDetails : SigninDtos) : Promise<string>{
        try{
            // if user is present or not
            const user = await this.repository.getUserByEmail(signinDetails.email)
            if(!user){
                throw new NotFoundError("User", "email", signinDetails.email)
            }
            // compare password with the hashed one in database
            const doesPasswordMatch = bcrypt.compareSync(signinDetails.password, user.password)
            if(!doesPasswordMatch){
                throw new UnAuthorizedError()
            }
            const jwt = generateJwtToken({id:user.id, email: user.email, role: user.roles})
            return jwt;
        }
        catch(error) {
            console.log(error)
            throw error;
        }
    }
}

export default UserService;
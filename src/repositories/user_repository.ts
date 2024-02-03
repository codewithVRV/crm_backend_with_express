import {PrismaClient, User,} from "@prisma/client"
import createUserDtos from "../dtos/createUser_dtos";
import Engineer from "../types/engineer";
import { JsonObject } from "@prisma/client/runtime/library";
import NotFoundError from "../errors/not_found_error";
const prisma = new PrismaClient()

class UserRepository {
    async createUser(userDetails: createUserDtos) : Promise<User> {
        try{
            const response = await prisma.user.create({
                data:{
                    name: userDetails.name,
                    email: userDetails.email,
                    password:userDetails.password
                }
            })
            return response;
        }
        catch(error) {
            console.log(error)
            throw error;
        }
    }
    async getUser(userId:string) : Promise<User | null>{
        try{
            const response = await prisma.user.findUnique({
                where:{
                    id:userId
                }
            })
            return response;
        }
        catch(error) {
            console.log(error)
            throw error;
        }
    }
    async getAllUsers() : Promise<User[]>{
        try{
            const response = await prisma.user.findMany()
            return response;
        }
        catch(error) {
            console.log(error)
            throw error;
        }
    }
    async getUserByEmail(userEmail:string) : Promise<User | null> {
        try{
            const response = await prisma.user.findUnique({
                where:{
                    email:userEmail
                }
            })
            return response;
        }
        catch(error) {
            console.log(error)
            throw error;
        }
    }

    async addCreatedTicket (id:string, ticketId:string){
        try{
            const user = await prisma.user.update({
                where:{
                    id:id
                },
                data: {
                    ticketsCreated: {
                        push: ticketId
                    }
                }
            })
            return user;
        }
        catch(error){
            console.log(error)
            throw error;

        }
    }
    async addAssignedTicket (id:string, ticketId:string){
        try{
            const user = await prisma.user.update({
                where:{
                    id:id, 
                    roles: {
                        hasSome: ["Engineer"]
                    }
                },
                data: {
                    ticketsAssigned: {
                        push: ticketId
                    }
                }
            })
            return user;
        }
        catch(error){
            console.log(error)
            throw error;

        }
    }

    async getEngineers () : Promise<User[]> {
        try{
            const users = await prisma.user.findMany({
                where:{
                    roles: {
                        hasSome: ["Engineer"]
                    }
                }
            })
            return users;
        }
        catch(error){
            console.log(error)
            throw error;

        }
        
    }

    async getAvailableEngineer ()  : Promise<Engineer>{
        try{
            const response = await prisma.user.aggregateRaw({
                pipeline: [
                    {
                        $match:{
                            "roles":{
                                "$in":["Engineer"]
                            }
                        }
                    },
                    {
                        $project:{
                            id:1,
                            email:1,
                            ticketsAssignedCount:{
                                $cond:{
                                    if: { $isArray: "$ticketsAssigned"},
                                    then: { $size: "$ticketsAssigned"},
                                    else: 1
                                }
                            }
                        }
                    }, // include a new field in every document
                    {
                        $sort: {
                            ticketsAssignedCount : 1 // sorting the documents
                        }
                    },
                    {
                        $limit: 1 // limit the document 1
                    },

                ]
            })
            console.log(response)
            if(typeof response[0] === "object" && (response[0] as JsonObject)._id && (response[0] as JsonObject).email &&  (response[0] as JsonObject).ticketsAssignedCount){
                const idObject = ((response[0] as JsonObject)._id as {"$oid":string})
                const engineer: Engineer = {
                    id: idObject["$oid"],
                    email: (response[0] as JsonObject).email as string,
                    ticketsAssignedCount: (response[0] as JsonObject).ticketsAssignedCount as number

                }

                return engineer;
            }
            throw new NotFoundError("User", "role", "Engineer")
        }
        catch(error){
            console.log(error)
            throw error;

        }
    }

    async isUserEngineer(userEmail : string) : Promise<boolean> {
        try{
            const user = await prisma.user.findUnique({
                where: {
                    email: userEmail
                }
            })
            if(!user) return false;
            return user.roles.includes("Engineer")
        }
        catch(error){
            console.log(error)
            throw error;

        }
    }
    async isUserAdmin(userEmail : string) : Promise<boolean> {
        try{
            const user = await prisma.user.findUnique({
                where: {
                    email: userEmail
                }
            })
            if(!user) return false;
            return user.roles.includes("Admin")
        }
        catch(error){
            console.log(error)
            throw error;

        }
    }
}


export default UserRepository;
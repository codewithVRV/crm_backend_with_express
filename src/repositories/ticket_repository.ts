import {Prisma, PrismaClient, Ticket,} from "@prisma/client"
import createTicketDtos from "../dtos/createTicket_dto";
const prisma = new PrismaClient()

class TicketRepository {
    async createTicket(ticketDetails: createTicketDtos) : Promise<Ticket> {
        try{
            const response = await prisma.ticket.create({
                data:{
                    ...ticketDetails
                }
            })
            return response;
        }
        catch(error) {
            console.log(error)
            throw error;
        }
    }
    async get(ticketId: string) : Promise<Ticket | null> {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: ticketId
            }
        });
        return ticket;
    }

    async getAll() : Promise<Ticket[]> {
        const tickets = await prisma.ticket.findMany();
        return tickets;
    }

    async delete() {

    }

    async updateTicket(id:string, updateDetails: Partial<Prisma.TicketUpdateInput>) {
        try{
            const response = await prisma.ticket.update({
                where :{
                    id: id
                },
                data:{
                    ...updateDetails
                }
            })
            return response;
        }
        catch(error) {
            console.log(error)
            throw error;
        }
    }

}


export default TicketRepository;
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Status } from "@prisma/client";

export default class UpdateTicketDto {

    @IsString()
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    description:string

    @IsNumber()
    @IsOptional()
    ticketPriority:number

    @IsEnum(Status)
    @IsOptional()
    status:string

    @IsEmail()
    @IsString()
    @IsOptional()
    assignedTo:string

    @IsEmail()
    @IsString()
    @IsOptional()
    createdBy: string

    @IsString()
    @IsOptional()
    clientName:string
}
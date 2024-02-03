import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"
export default class createTicketDtos {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsEmail()
    @IsString()
    assignee: string;

    @IsEmail()
    @IsString()
    assignedTo: string;

    @IsString()
    @IsNotEmpty()
    clientName:string;

    @IsEmail()
    @IsString()
    createdBy : string;
 


    constructor(title:string, description:string,  clientName:string, ){
        this.title = title;
        this.clientName = clientName;
        this.description = description;
        this.assignee = "";
        this.assignedTo = "";
        this.createdBy = "";
    }
}
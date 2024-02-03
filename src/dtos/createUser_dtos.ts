import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"
export default class createUserDtos {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @Length(3, 50)
    password: string;

    constructor(name:string, email:string, password:string){
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
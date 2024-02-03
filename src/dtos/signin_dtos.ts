import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"
export default class SigninDtos {


    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @Length(3, 50)
    password: string;

    constructor(email:string, password:string){
        this.email = email;
        this.password = password;
    }
}
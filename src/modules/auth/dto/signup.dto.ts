import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    enrollment: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
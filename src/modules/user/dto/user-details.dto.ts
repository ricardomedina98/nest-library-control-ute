import { IsNotEmpty, IsEmail, IsString, IsDate } from "class-validator"

export class UserDetailsDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsString()
    secondName?: string;

}
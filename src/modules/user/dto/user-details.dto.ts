import { IsNotEmpty, IsEmail, IsString, IsDate } from "class-validator"

export class UserDetailsDto {
    @IsNotEmpty()
    id: number;



}
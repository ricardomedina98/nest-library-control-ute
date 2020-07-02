import { IsNotEmpty, IsEmail, IsString, IsDate } from "class-validator"
import { UserDetailsDto } from "./user-details.dto";

export class UserDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    deitals: UserDetailsDto

    @IsDate()
    @IsNotEmpty()
    createdAt: Date

    @IsDate()
    updatedAt: Date
}
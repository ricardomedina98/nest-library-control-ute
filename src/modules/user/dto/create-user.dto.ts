import { IsNotEmpty, IsEmail, IsString, IsEmpty } from "class-validator";
import { RoleType } from "src/modules/role/types/role-type.enum";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsString()
    secondName?: string;

    @IsEmpty()
    enrollment?: string;

    @IsNotEmpty()
    @IsString()
    role: RoleType;
}
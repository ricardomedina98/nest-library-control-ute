import { IsNotEmpty, IsEmail, IsString, IsEmpty } from "class-validator";
import { RoleType } from "src/modules/role/role-type.enum";

export class UpdateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

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
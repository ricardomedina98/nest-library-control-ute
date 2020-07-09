import { IsNotEmpty, IsEmail, IsString } from "class-validator";
import { RoleType } from "src/modules/role/role-type.enum";

export class UpdateUserDto {
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

    @IsNotEmpty()
    @IsString()
    role: RoleType;
}
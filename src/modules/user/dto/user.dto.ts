import { IsNotEmpty, IsEmail, IsDate, IsString } from "class-validator"
import { UserDetailsDto } from "./user-details.dto";
import { RoleType } from "src/modules/role/role-type.enum";
import { RoleDTO } from "src/modules/role/dto/role.dto";

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

    @IsNotEmpty()
    role: RoleDTO;
}
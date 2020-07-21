import { IsNotEmpty, IsString, IsDate, IsArray } from "class-validator";
import { UserDto } from "src/modules/user/dto/user.dto";

export class RoleDto {

    @IsNotEmpty()
    id_role: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    status?: string;

    @IsDate()
    @IsNotEmpty()
    createdAt?: Date;

    @IsDate()
    updatedAt?: Date;

    @IsArray()
    users?: UserDto[];
}
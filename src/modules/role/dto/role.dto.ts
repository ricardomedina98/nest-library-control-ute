import { IsNotEmpty, IsString, IsDate } from "class-validator";

export class RoleDTO {

    constructor() {
        this.name = this.name.toUpperCase();
    }

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
    status: string;

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}
import { IsNumber, IsString, IsNotEmpty, IsOptional } from "class-validator";

export class StatusDto {

    @IsNumber()
    id_status: number;

    @IsString()
    name: string;

    @IsString()
    key: string;

    @IsNotEmpty()
    createdAt?: Date;
    
}
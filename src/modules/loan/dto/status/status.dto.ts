import { IsNumber, IsString, IsNotEmpty } from "class-validator";

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
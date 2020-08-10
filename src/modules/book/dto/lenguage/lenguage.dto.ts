import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class LenguageDto {

    @IsNumber()
    @IsNotEmpty()
    id_lenguage: number;

    @IsString()
    @IsNotEmpty()
    name: string;
    
}
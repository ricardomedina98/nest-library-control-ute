import { IsNotEmpty, IsString } from "class-validator";

export class CreateLenguageDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    
}
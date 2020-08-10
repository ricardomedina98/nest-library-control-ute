import { IsNotEmpty, IsString } from "class-validator";

export class UpdateLenguageDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    
}
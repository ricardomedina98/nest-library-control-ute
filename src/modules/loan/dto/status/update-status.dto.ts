import { IsNumber } from "class-validator";

export class UpdateStatusDto {

    @IsNumber()
    id_book: number;
    
}
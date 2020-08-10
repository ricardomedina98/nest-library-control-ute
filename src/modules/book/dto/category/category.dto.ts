import { IsNumber, IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {

    @IsNumber()
    @IsNotEmpty()
    id_category: number;

    @IsString()
    @IsNotEmpty()
    name: string;
}
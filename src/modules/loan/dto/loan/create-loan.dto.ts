import { IsNumber, IsDate, IsNotEmpty, IsString, IsOptional, IsArray } from "class-validator";

export class CreateLoanDto {


    @IsString()
    @IsNotEmpty()
    reference: string; 

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;

    @IsOptional()
    @IsString()
    notes: string;

    @IsArray()
    @IsNotEmpty()
    books: [];

    @IsNumber()
    user: number;

    @IsNumber()
    student: number;


}
import { IsNumber, IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumberString } from "class-validator";

export class UpdateBookDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    handle: string;

    @IsString()
    @IsNotEmpty()
    author1: string;

    @IsString()
    @IsOptional()
    author2: string;

    @IsString()
    @IsOptional()
    omr: string;

    @IsString()
    @IsNotEmpty()
    editorial: string;

    @IsString()
    @IsNotEmpty()
    isbn: string;

    @IsString()
    @IsOptional()
    collection: string;

    @IsString()
    @IsOptional()
    edition: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsOptional()
    printed_place: string;

    @IsOptional()
    @IsNumber()
    printed_year: number;

    @IsOptional()
    @IsNumber()
    cost: number;

    @IsBoolean()
    @IsNotEmpty()
    can_borrow: boolean;

    @IsString()
    @IsOptional()
    notes: string;

    @IsNumber()
    @IsNotEmpty()
    category: number;

    @IsNumber()
    @IsNotEmpty()
    lenguage: number;

}
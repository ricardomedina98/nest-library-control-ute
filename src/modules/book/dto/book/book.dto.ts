import { IsNumber, IsString, IsNotEmpty, IsBoolean, IsOptional, IsEmpty } from "class-validator";
import { CategoryDto } from "../category/category.dto";
import { LenguageDto } from "../lenguage/lenguage.dto";

export class BookDto {

    @IsNumber()
    id_book: number;

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

    @IsEmpty()
    @IsOptional()
    @IsNumber()
    printed_year: number;

    @IsEmpty()
    @IsOptional()
    @IsNumber()
    cost: number;

    @IsBoolean()
    @IsNotEmpty()
    can_borrow: boolean;

    @IsString()
    @IsEmpty()
    notes: string;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;

    @IsNotEmpty()
    category: CategoryDto;

    @IsNotEmpty()
    lenguage: LenguageDto;

}
import { IsNumber, IsDate, IsNotEmpty, IsString, IsOptional } from "class-validator";
import { StatusDto } from "../status/status.dto";
import { BookDto } from "src/modules/book/dto/book/book.dto";
import { UserDto } from "src/modules/user/dto/user.dto";

export class LoanDto {

    @IsNumber()
    @IsNotEmpty()
    id_loan: number;
    
    @IsString()
    @IsNotEmpty()
    reference: string;

    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @IsOptional()
    @IsString()
    notes: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    @IsNotEmpty()
    books: BookDto[];

    @IsNotEmpty()
    statuses: StatusDto[];

    @IsNumber()
    user: UserDto;

    @IsNumber()
    student: UserDto;


}
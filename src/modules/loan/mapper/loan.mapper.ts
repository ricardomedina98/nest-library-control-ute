import { LoanEntity } from "../entities/loan.entity";
import { LoanDto } from "../dto/loan/loan.dto";
import { StatusDto } from "../dto/status/status.dto";
import { StatusesLoanEntity } from "../entities/status.entity";
import { toUserDto } from "src/shared/mapper";
import * as moment from 'moment';
import { BookDto } from "src/modules/book/dto/book/book.dto";
import { toDtoBook } from "src/modules/book/mapper/book.mapper";

export const toDtoLoan = (loan: LoanEntity): LoanDto => {

    const { id_loan,
        reference,
        startDate,
        endDate,
        notes,
        status,
        createdAt,
        updatedAt,
        user,
        student,
        books,
        statuses 
    } = loan;

    let studentDto = toUserDto(student);
    let userDto = toUserDto(user);

    let statusesDto: StatusDto[] = statuses.map(loanStatus => {
        return {
            id_status: loanStatus.status.id_status,
            name: loanStatus.status.name,
            key: loanStatus.status.key,
            createdAt: loanStatus.createdAt
        }
    });
    statusesDto = statusesDto.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    let booksDto: BookDto[] = books.map(loansBook => {
        let loansBookDto = toDtoBook(loansBook.book);
        loansBookDto.isReturn = loansBook.isReturn;
        return loansBookDto;
    });

    const loanDto: LoanDto = {
        id_loan,
        reference,
        startDate,
        endDate,
        notes,
        status,
        createdAt,
        updatedAt,
        books: booksDto,
        user: userDto,
        student: studentDto,
        statuses: statusesDto
    } 


    return loanDto;
}

export const toStatusDto = (status: StatusesLoanEntity) => {
    
    const { id_status, name, key } = status;

    let statusDto: StatusDto = {
        id_status,
        name,
        key
    }

    return statusDto;
}
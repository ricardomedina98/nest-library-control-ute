import { LoanEntity } from "../entities/loan.entity";
import { LoanDto } from "../dto/loan/loan.dto";
import { StatusDto } from "../dto/status/status.dto";
import { StatusesLoanEntity } from "../entities/status.entity";
import { toUserDto } from "src/shared/mapper";
import * as moment from 'moment';

export const toDtoLoan = (loan: LoanEntity): LoanDto => {

    const { id_loan,
        reference,
        startDate,
        endDate,
        notes,
        status,
        createdAt,
        updatedAt,
        books,
        user,
        student,
        loanStatuses 
    } = loan;

    let studentDto = toUserDto(student);
    let userDto = toUserDto(user);

    let statuses: StatusDto[] = loanStatuses.map(loanStatus => {
        return {
            id_status: loanStatus.status.id_status,
            name: loanStatus.status.name,
            key: loanStatus.status.key,
            createdAt: loan.createdAt
        }
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
        books,
        user: userDto,
        student: studentDto,
        statuses
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
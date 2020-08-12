import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { LoanRepository } from './repositories/loan.repository';
import { LoanEntity } from './entities/loan.entity';
import { toDtoLoan, toStatusDto } from './mapper/loan.mapper';
import { LoanDto } from './dto/loan/loan.dto';
import { CreateLoanDto } from './dto/loan/create-loan.dto';
import { CreateStatusDto } from './dto/status/create-status.dto';
import { StatusLoanRepository } from './repositories/status.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositry } from '../user/user.repository';
import { BookRepository } from '../book/repositories/book.repository';
import { LoansStatusesRepository } from './repositories/loans-statuses.entity';
import { StatusesLoan } from './types/statuses.enum';
import { RoleType } from '../role/types/role-type.enum';
import { RoleRepositry } from '../role/role.repository';
import * as moment from 'moment';

@Injectable()
export class LoanService {
    constructor(
        @InjectRepository(LoanRepository)
        private readonly _loanRepository: LoanRepository,
        @InjectRepository(StatusLoanRepository)
        private readonly _statusLoanRepository: StatusLoanRepository,
        @InjectRepository(UserRepositry)
        private readonly _userRepository: UserRepositry,
        @InjectRepository(BookRepository)
        private readonly _bookRepository: BookRepository,
        @InjectRepository(LoansStatusesRepository)
        private readonly _loansStatusesRepository: LoansStatusesRepository,
        @InjectRepository(RoleRepositry)
        private readonly _roleRepository: RoleRepositry,
    ) {}

    async getLoan(id: number): Promise<LoanDto> {
        const loan = await this._loanRepository.findOne(id);

        return toDtoLoan(loan);
    }

    async getLoans(): Promise<LoanDto[]> {
        const loans = await this._loanRepository.find();

        return loans.map(loan => toDtoLoan(loan));
    }
    
    async createLoan(createLoanDto: CreateLoanDto) {

        const { books, user, startDate, endDate, notes, reference, student } = createLoanDto;

        const existUser = await this._userRepository.findOne(user);

        if(!existUser) {
             throw new NotFoundException('User does not exist');
        }

        const roleStudent = await this._roleRepository.findOne({
            where: {
                name: RoleType.STUDENT
            }
        });
        const existStudent = await this._userRepository.findOne(student, {
            where: {
                role: roleStudent
            }
        });

        if(!existStudent) {
            throw new NotFoundException('Student does not exist');
        }

        const existBooks = await this._bookRepository.findByIds(books);

        if(!existBooks && books.length === existBooks.length) {
            throw new NotFoundException('Ones of books does not exist');
        }

        const status = await this._statusLoanRepository.findOne({
            where: {
                key: StatusesLoan.START_LOAN
            }
        });

        let loan = this._loanRepository.create({
            startDate: moment(startDate,'YYYY-MM-DD').toDate(),
            endDate:  moment(endDate,'YYYY-MM-DD').toDate(),
            notes,
            reference,
            user: existUser,
            student: existStudent,
            books: existBooks,
        });

        loan = await this._loanRepository.save(loan);

        let statusesLoan = this._loansStatusesRepository.create({
            loan,
            status
        });

        statusesLoan = await this._loansStatusesRepository.save(statusesLoan);

        loan.loanStatuses = [statusesLoan];
             

        return toDtoLoan(loan);
    }

    async createStatus(createStatusDto: CreateStatusDto) {

        const { name } = createStatusDto;

        const existStatus = await this._statusLoanRepository.findOne({
            where: {
                name
            }
        });

        if(existStatus) {
            throw new ConflictException('Al ready exist status');
        }

        let status = this._statusLoanRepository.create({
            name
        });

        status = await this._statusLoanRepository.save(status);

        return toStatusDto(status);

    }

    async getStatuses() {
        const statuses = await this._statusLoanRepository.find();

        return statuses.map(status => toStatusDto(status));
    }
}

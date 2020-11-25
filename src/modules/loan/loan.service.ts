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
import { LoansStatusesRepository } from './repositories/loans-statuses.repository';
import { StatusesLoan } from './types/statuses.enum';
import { RoleType } from '../role/types/role-type.enum';
import { RoleRepositry } from '../role/role.repository';
import * as moment from 'moment';
import { LoansBooksRepository } from './repositories/loans-books.repository';
import { LoansBooksEntity } from './entities/loans-books.entity';
import { Not } from 'typeorm';
import { UpdateStatusDto } from './dto/status/update-status.dto';
import { LoanStatus } from './types/loan-status.enum';

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
        @InjectRepository(RoleRepositry)
        private readonly _roleRepository: RoleRepositry,
        @InjectRepository(LoansStatusesRepository)
        private readonly _loansStatusesRepository: LoansStatusesRepository,
        @InjectRepository(LoansBooksRepository)
        private readonly _loansBooksRepository: LoansBooksRepository,
    ) {}

    async getLoan(id: number): Promise<LoanDto> {
        const loan = await this._loanRepository.findOne(id, {
            relations: [
                "statuses",
                "statuses.status",
                "books",
                "books.book"
            ]
        });

        if(!loan){
            throw new NotFoundException('Loan does not exist');
        }

        return toDtoLoan(loan);
    }

    async getLoans(): Promise<LoanDto[]> {
        const loans = await this._loanRepository.find({
            relations: [
                "statuses",
                "statuses.status",
                "books",
                "books.book"
            ]
        });

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
            student: existStudent
        });

        loan = await this._loanRepository.save(loan);

        let statusesLoan = this._loansStatusesRepository.create({
            loan,
            status
        });

        statusesLoan = await this._loansStatusesRepository.save(statusesLoan);

        loan.statuses = [statusesLoan];

        let booksLoan: LoansBooksEntity[] =  existBooks.map(book => {
            return this._loansBooksRepository.create({
                book,
                loan
            });
        });

        booksLoan = await this._loansBooksRepository.save(booksLoan);

        loan.books = booksLoan;
             

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

        const statuses = await this._statusLoanRepository.createQueryBuilder('statuses')
        .where("statuses.key != :status1", {
            status1: StatusesLoan.START_LOAN
        })
        .andWhere("statuses.key != :status2", {
            status2: StatusesLoan.FINISH_LOAN
        })
        .getMany()

        return statuses.map(status => toStatusDto(status));
    }

    async getStatusesKey() {
        
        const statuses = await this._statusLoanRepository.find({
            where: [ {
                key: StatusesLoan.START_LOAN
            }, {
                key: StatusesLoan.FINISH_LOAN
            }]
        });

        return statuses.map(status => toStatusDto(status));
    }

    async updateLoanStatuses(id: number, updateStatus: UpdateStatusDto) {

        const { id_book } = updateStatus;

        const existLoan = await this._loanRepository.findOne(id, {
            where: {
                status: LoanStatus.ACTIVE
            }
        });

        if(!existLoan) {
            throw new NotFoundException('Loan does not exist');
        }

        const existBook = await this._bookRepository.findOne(id_book, {
            where: {
                status: true
            }
        });
    
        if(!existBook) {
            throw new NotFoundException('Book does not exist');
        }

        let status = this._statusLoanRepository.create({
            name: existBook.title,
            
        });

        status = await this._statusLoanRepository.save(status);

        let statusLoan = this._loansStatusesRepository.create({
            loan: existLoan,
            status: status
        });

        statusLoan = await this._loansStatusesRepository.save(statusLoan);

        let loansStatus = await this._loansBooksRepository.findOne({
            where: {
                book: existBook,
                loan: existLoan
            },
            relations: ["loan", "book"]
        });

        loansStatus = this._loansBooksRepository.merge(loansStatus, {
            isReturn: true
        });

        loansStatus = await this._loansBooksRepository.save(loansStatus);

        let booksReturned = await this._loansBooksRepository.find({
            relations: ["book"], 
            where: {
                loan: existLoan,
                isReturn: false
            }
        });

        if(booksReturned.length === 0) {

            const statusFinish = await this._statusLoanRepository.findOne({
                where: {
                    key: StatusesLoan.FINISH_LOAN
                }
            });

            let createStatus = this._loansStatusesRepository.create({
                loan: existLoan,
                status: statusFinish
            });

            await this._loansStatusesRepository.save(createStatus);

        }

        const loanUpdated = await this._loanRepository.findOne(statusLoan.loan.id_loan, {
            relations: [
                "statuses",
                "statuses.status",
                "books",
                "books.book"
            ]
        });

        return toDtoLoan(loanUpdated);

    }
}

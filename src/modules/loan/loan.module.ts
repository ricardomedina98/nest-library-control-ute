import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanRepository } from './repositories/loan.repository';
import { StatusLoanRepository } from './repositories/status.repository';
import { LoansStatusesRepository } from './repositories/loans-statuses.repository';
import { UserRepositry } from '../user/user.repository';
import { BookRepository } from '../book/repositories/book.repository';
import { RoleRepositry } from '../role/role.repository';
import { LoansBooksRepository } from './repositories/loans-books.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LoanRepository, StatusLoanRepository, LoansStatusesRepository, UserRepositry, BookRepository, RoleRepositry, LoansBooksRepository])],
  controllers: [LoanController],
  providers: [LoanService]
})
export class LoanModule {}

import { Controller, Get, UsePipes, ValidationPipe, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/loan/create-loan.dto';
import { CreateStatusDto } from './dto/status/create-status.dto';

@Controller('loans')
@UsePipes(ValidationPipe)
export class LoanController {

    constructor(
        private readonly _loanService: LoanService
    ) {}

    @Get('status')
    async getStatuses() {
        return this._loanService.getStatuses();
    }

    @Post('status')
    async createStatus(@Body() createStatusDto: CreateStatusDto) {
        return this._loanService.createStatus(createStatusDto);
    }



    @Get(':id')
    async getLoan(@Param('id', ParseIntPipe) id: number) {
        return this._loanService.getLoan(id);
    }

    @Get()
    async getLoans() {
        return this._loanService.getLoans();
    }

    @Post()
    async createLoan(@Body() createLoanDto: CreateLoanDto) {
        return this._loanService.createLoan(createLoanDto);
    }

}

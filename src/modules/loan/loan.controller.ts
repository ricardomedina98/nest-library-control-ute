import { Controller, Get, UsePipes, ValidationPipe, Post, Body, Param, ParseIntPipe, Put } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/loan/create-loan.dto';
import { CreateStatusDto } from './dto/status/create-status.dto';
import { UpdateStatusDto } from './dto/status/update-status.dto';

@Controller('loans')
@UsePipes(ValidationPipe)
export class LoanController {

    constructor(
        private readonly _loanService: LoanService
    ) {}

    @Get('status/key')
    async getStatusesKey() {
        return this._loanService.getStatusesKey();
    }

    @Get('status')
    async getStatuses() {
        return this._loanService.getStatuses();
    }

    @Post('status')
    async createStatus(@Body() createStatusDto: CreateStatusDto) {
        return this._loanService.createStatus(createStatusDto);
    }

    @Put(':id/status')
    async updateLoanStatuses(@Param('id', ParseIntPipe) id: number, @Body() updateStatus: UpdateStatusDto) {
        return this._loanService.updateLoanStatuses(id, updateStatus);
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

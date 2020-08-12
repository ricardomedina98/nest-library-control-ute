import { BaseEntity, Entity, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { LoanEntity } from "./loan.entity";
import { StatusesLoanEntity } from "./status.entity";

@Entity('loans-statuses')
export class LoansStatusesEntity extends BaseEntity {

    @ManyToOne(() => LoanEntity, loan => loan.loanStatuses, { primary: true })
    @JoinColumn({name: 'id_loan'})
    loan: LoanEntity;

    @ManyToOne(() => StatusesLoanEntity, status => status.loanStatuses, { primary: true, eager: true })
    @JoinColumn({name: 'id_status'})
    status: StatusesLoanEntity;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date;
}
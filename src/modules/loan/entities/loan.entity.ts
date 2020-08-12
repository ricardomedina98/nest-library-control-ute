import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, JoinColumn, CreateDateColumn, Column, ManyToOne, BeforeInsert } from "typeorm";
import { BookEntity } from "src/modules/book/entities/book.entity";
import { UserEntity } from "src/modules/user/user.entity";
import { LoanStatus } from "../types/loan-status.enum";
import { LoansStatusesEntity } from "./loans-statuses.entity";


@Entity('loans')
export class LoanEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_loan: number;

    @Column({type: 'varchar', nullable: false})
    reference: string;

    @Column({type: 'date', nullable: false, name: 'start_date'})
    startDate: Date;

    @Column({type: 'date', nullable: false, name: 'end_date'})
    endDate: Date;

    @Column({type: 'text', nullable: true})
    notes: string;

    @Column({type: 'varchar', default: LoanStatus.ACTIVE, length: 8})
    status: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt?: Date;

    @CreateDateColumn({type: 'timestamp', name: 'updated_at'})
    updatedAt?: Date;
    
    @ManyToMany(() => BookEntity, book => book.id_book, { eager: true, nullable: false })
    @JoinTable()
    books: BookEntity[];

    @OneToMany(() => LoansStatusesEntity, loan => loan.loan, { eager: true, nullable: false })
    loanStatuses: LoansStatusesEntity[];

    @ManyToOne(() => UserEntity, user => user.id, { eager: true, nullable: false })
    @JoinColumn({name: 'id_user'})
    user: UserEntity;

    @ManyToOne(() => UserEntity, user => user.id, { eager: true, nullable: false })
    @JoinColumn({name: 'id_student'})
    student: UserEntity;

}
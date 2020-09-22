import { BaseEntity, Entity, CreateDateColumn, ManyToOne, JoinColumn, Column, UpdateDateColumn } from "typeorm";
import { LoanEntity } from "./loan.entity";
import { BookEntity } from "src/modules/book/entities/book.entity";

@Entity('loans-books')
export class LoansBooksEntity extends BaseEntity {

    @ManyToOne(() => LoanEntity, loan => loan.books, { primary: true })
    @JoinColumn({name: 'id_loan'})
    loan: LoanEntity;

    @ManyToOne(() => BookEntity, book => book.books, { primary: true })
    @JoinColumn({name: 'id_book'})
    book: BookEntity;

    @Column({type: 'boolean', nullable: false, default: false, name: 'is_return'})
    isReturn?: boolean;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt?: Date;
}
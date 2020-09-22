import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { LoansStatusesEntity } from "./loans-statuses.entity";

@Entity('status-loan')
export class StatusesLoanEntity extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id_status: number;

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: true})
    key: string;

    @OneToMany(() => LoansStatusesEntity, status => status.status)
    statuses: LoansStatusesEntity[];
    
}
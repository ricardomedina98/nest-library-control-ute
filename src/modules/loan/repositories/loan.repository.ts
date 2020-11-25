import { Repository, EntityRepository } from "typeorm";
import { LoanEntity } from "../entities/loan.entity";

@EntityRepository(LoanEntity)
export class LoanRepository extends Repository<LoanEntity> {

}
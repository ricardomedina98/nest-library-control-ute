import { Repository, EntityRepository } from "typeorm";
import { StatusesLoanEntity } from "../entities/status.entity";

@EntityRepository(StatusesLoanEntity)
export class StatusLoanRepository extends Repository<StatusesLoanEntity> {

}
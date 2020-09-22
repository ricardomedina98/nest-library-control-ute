import { Repository, EntityRepository } from "typeorm";
import { LoansStatusesEntity } from "../entities/loans-statuses.entity";

@EntityRepository(LoansStatusesEntity)
export class LoansStatusesRepository extends Repository<LoansStatusesEntity> {

}
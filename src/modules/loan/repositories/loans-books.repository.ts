import { Repository, EntityRepository } from "typeorm";
import { LoansBooksEntity } from "../entities/loans-books.entity";

@EntityRepository(LoansBooksEntity)
export class LoansBooksRepository extends Repository<LoansBooksEntity> {

}
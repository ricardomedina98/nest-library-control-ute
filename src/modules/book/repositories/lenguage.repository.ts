import { Repository, EntityRepository } from "typeorm";
import { LenguagesEntity } from "../entities/lenguage.entity";

@EntityRepository(LenguagesEntity)
export class LenguageRepository extends Repository<LenguagesEntity> {


}
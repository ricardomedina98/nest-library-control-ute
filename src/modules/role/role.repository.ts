import { Repository, EntityRepository } from "typeorm";
import { RoleEntity } from "./role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleStatus } from "./role-status.enum";

@EntityRepository(RoleEntity)
export class RoleRepositry extends Repository<RoleEntity> {

    async existRoleExceptById(name: string, id: number) {
        return await this.createQueryBuilder('role')
        .where("role.name = :name AND role.status = :status AND role.id_role != :id", {
            id,
            name,
            status: RoleStatus.ACTIVE
        })
        .getOne();
    }

}
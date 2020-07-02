import { Repository, EntityRepository } from "typeorm";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserStatus } from "./user-status.keys";

@EntityRepository(UserEntity)
export class UserRepositry extends Repository<UserEntity> {

    async existUsernameExceptById(id: number, username: string): Promise<UserEntity> {
        return await this.createQueryBuilder('user')
        .where("user.username = :username AND user.status = :status AND user.id != :id", {
            id,
            username,
            status: UserStatus.ACTIVE
        })
        .getOne();
    }

    async existEmailExceptById(id: number, email: string): Promise<UserEntity> {
        return await this.createQueryBuilder('user')
        .where("user.email = :email AND user.status = :status AND user.id != :id", {
            id,
            email,
            status: UserStatus.ACTIVE
        })
        .getOne();
    }

    async existUsernameAndEmail(username: string, email: string): Promise<UserEntity> {
        return await this.createQueryBuilder('user')
        .where("(user.email = :email OR user.username = :username) AND user.status = :status", {
            email,
            username,
            status: UserStatus.ACTIVE
        })
        .getOne();
    }
}
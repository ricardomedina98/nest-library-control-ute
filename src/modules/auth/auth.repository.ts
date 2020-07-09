import { Repository, EntityRepository, getConnection } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepositry } from "../user/user.repository";
import { IJwtPayload } from "./jwt-payload.interface";
import { toUserDto } from "src/shared/mapper";
import { UserDto } from "../user/dto/user.dto";
import { SignInDto } from "./dto/signin.dto";
import { UserStatus } from "../user/user-status.enum";
import { UnauthorizedException } from "@nestjs/common";
import { compare } from "bcryptjs";

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity> {


    async findByPayload({ id }: IJwtPayload): Promise<UserDto> {

        const user = await this.findOne(id, {
            where: {
                status: UserStatus.ACTIVE
            }
        });

        return toUserDto(user);
    }

    async findBySigIn({ username, password }: SignInDto) {
        const user = await this.findOne({
            where: {
                username,
                status: UserStatus.ACTIVE
            }
        });

        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const areEqual =  await compare(password, user.password);

        if(!areEqual) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return toUserDto(user);
    }

}
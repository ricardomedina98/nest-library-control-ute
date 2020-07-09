import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositry } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { RoleRepositry } from '../role/role.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepositry, RoleRepositry]), AuthModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UsersModule {}

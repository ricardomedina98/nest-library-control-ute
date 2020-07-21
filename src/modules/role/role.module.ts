import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepositry } from './role.repository';
import { AuthModule } from '../auth/auth.module';
import { UserRepositry } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepositry, UserRepositry]), AuthModule],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {

}

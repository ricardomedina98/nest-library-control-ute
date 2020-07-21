import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepositry } from './role.repository';
import { RoleDto } from './dto/role.dto';
import { RoleEntity } from './role.entity';
import { RoleStatus } from './role-status.enum';
import { toRoleDto, toRolesDto, toRolesUsersDto } from 'src/shared/mapper';
import { CreateRoleDTO } from './dto/create-role.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { UserStatus } from '../user/user-status.enum';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleRepositry)
        private readonly _roleRepository: RoleRepositry
    ) {

    }

    async getAll(): Promise<RoleDto[]> {

        const roles = await this._roleRepository.find({ where: { status: RoleStatus.ACTIVE } });

        return toRolesDto(roles);
        
    }

    async getRolesUsers() {

        const roles = await this._roleRepository.createQueryBuilder("roles")
        .leftJoinAndSelect("roles.users", "user", "roles.status = :statusr AND user.status = :statusu", {
            statusr: RoleStatus.ACTIVE,
            statusu: UserStatus.ACTIVE
        })
        .leftJoinAndSelect("user.details", "detials")
        .getMany();

        return toRolesUsersDto(roles);

    }

    async getById(id: number): Promise<RoleDto> {

        if(!id) {
            throw new BadRequestException('Id must be sent');
        }

        const role: RoleEntity = await this._roleRepository.findOne(id, {
            where: {
                status: RoleStatus.ACTIVE
            }
        });

        if(!role) {
            throw new NotFoundException('Role does not exist');
        }

        return toRoleDto(role);
    }

    async create(createDto: CreateRoleDTO) {

        const { name, description } = createDto;

        const existRole = await this._roleRepository.findOne({
            name
        });

        if(existRole) {
            throw new ConflictException('Role already exist');
        }

        const role: RoleEntity = this._roleRepository.create({ name, description });

        this._roleRepository.save(role);

        return toRoleDto(role);

    }

    async update(id:number, updateDto: UpdateRoleDTO) {
        const { name, description } = updateDto;

        const existRole = await this._roleRepository.findOne({
            where: {
                name,
                status: RoleStatus.ACTIVE
            }
        });

        if(!existRole) {
            throw new BadRequestException('Role does not exist');
        }

        const roleDb = await this._roleRepository.existRoleExceptById(name, id);

        if(roleDb) {
            throw new ConflictException('Role already exist');
        }

        const role = this._roleRepository.merge(existRole, {
            name,
            description
        });

        this._roleRepository.save(role);

        return toRoleDto(role);

        
    }
}

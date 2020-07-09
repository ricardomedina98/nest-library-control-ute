import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, UseGuards } from '@nestjs/common';
import { RoleDTO } from './dto/role.dto';
import { RoleService } from './role.service';
import { CreateRoleDTO } from './dto/create-role.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { ParseNameUpdatePipe } from './pipes/pipe-update.touppercase';
import { ParseNameCreatePipe } from './pipes/pipe-create.touppercase';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './decorators/role.decorator';
import { RoleType } from './role-type.enum';
@UseGuards(AuthGuard(), RoleGuard)
@Controller('roles')
export class RoleController {

    constructor(
        private readonly _roleService: RoleService
    ) {}

    @Get(':id')
    @Roles(RoleType.MASTER)
    async getRoleById(@Param('id', ParseIntPipe) id: number): Promise<RoleDTO> {
        return await this._roleService.getById(id);
    }

    @Get()
    @Roles(RoleType.MASTER)
    async getRoles(): Promise<RoleDTO[]> {
        return await this._roleService.getAll();
    }

    @Post()
    @Roles(RoleType.MASTER)
    async createRole(@Body(new ParseNameCreatePipe()) createDto: CreateRoleDTO): Promise<RoleDTO> {
        return await this._roleService.create(createDto);
    }

    @Put(':id')
    @Roles(RoleType.MASTER)
    async updateRole(@Param('id', ParseIntPipe) id: number,@Body(new ParseNameUpdatePipe()) updateDto: UpdateRoleDTO) {
        return await this._roleService.update(id, updateDto);
    }
}

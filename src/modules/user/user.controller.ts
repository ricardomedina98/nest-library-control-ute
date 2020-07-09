import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { Roles } from '../role/decorators/role.decorator';
import { RoleType } from '../role/role-type.enum';

@UseGuards(AuthGuard(), RoleGuard)
@Controller('users')
export class UserController {
    constructor(
        private readonly _userService: UserService
    ) {}

    @Get(':id')
    @Roles(RoleType.MASTER)
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
        const user = await this._userService.getById(id);
        return user;
    }

    
    @Get()
    @Roles(RoleType.MASTER)
    async getUsers(): Promise<UserDto[]> {
        return await this._userService.getAll();;
    }

    @Post()
    @Roles(RoleType.MASTER)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        return this._userService.create(createUserDto)
    }

    @Put(':id')
    @Roles(RoleType.MASTER)
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<UserDto> {
        return this._userService.update(id, updateUserDto);
    }
}

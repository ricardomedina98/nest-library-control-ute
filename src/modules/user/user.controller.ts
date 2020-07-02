import { Controller, Get, Param, ParseIntPipe, Post, Body, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('users')
export class UserController {
    constructor(
        private readonly _userService: UserService
    ) {}

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
        const user = await this._userService.getById(id);
        return user;
    }

    
    @Get()
    async getUsers(): Promise<UserDto[]> {
        const users = await this._userService.getAll();
        return users;
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        return this._userService.create(createUserDto)
    }

    @Put(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<UserDto> {
        return this._userService.update(id, updateUserDto);
    }
}

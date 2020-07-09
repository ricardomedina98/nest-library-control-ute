import { Injectable, BadRequestException, NotFoundException, HttpException, HttpStatus, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserRepositry } from './user.repository';
import { InjectRepository, } from '@nestjs/typeorm';
import { UserEntity  } from './user.entity';
import { UserStatus } from './user-status.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { toUserDto } from 'src/shared/mapper';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { RoleRepositry } from '../role/role.repository';
import { RoleType } from '../role/role-type.enum';
import { RoleEntity } from '../role/role.entity';
import { RoleStatus } from '../role/role-status.enum';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepositry)
        private readonly _userRepository: UserRepositry,
        @InjectRepository(RoleRepositry)
        private readonly _roleRepository: RoleRepositry
    ) {}

    async getById(id: number): Promise<UserDto> {
        if(!id) {
            throw new BadRequestException('Id must be sent');
        }

        const user: UserEntity = await this._userRepository.findOne(id ,{
            where: {
                status: UserStatus.ACTIVE
            }
        });

        if(!user) {
            throw new NotFoundException();
        }

        return toUserDto(user);
    }

    async getAll(): Promise<UserDto[]> {

        const users: UserEntity[] = await this._userRepository.find({
            where: {
                status: UserStatus.ACTIVE
            }
        });

        return users.map(user => toUserDto(user));
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {
        const { email, username, password, name, firstName, secondName } = userDto;

        const userDb = await this._userRepository.existUsernameAndEmail(username, email);

        if(userDb) {
            throw new ConflictException('User already exists');
        }

        const role: RoleEntity = await this._roleRepository.findOne({
            where: {
                name: userDto.role,
                status: RoleStatus.ACTIVE
            }
        });

        if(!role) {
            throw new NotFoundException('Role does not exist');
        }


        let user: UserEntity = this._userRepository.create({
            email, username, password, details: { name, firstName, secondName}, role
        });

        await this._userRepository.save(user);

        return toUserDto(user);

    }

    async update(id: number, userDto: UpdateUserDto): Promise<UserDto> {

        const { email, username, password, name, firstName, secondName } = userDto;

        const existUser = await this._userRepository.findOne({
            where: {
                id,
                status: UserStatus.ACTIVE
            }
        });

        if(!existUser) {
            throw new BadRequestException('User does not exit');
        }

        const existUsername: UserEntity = await this._userRepository.existUsernameExceptById(id, username);

        if(existUsername) {
            throw new ConflictException("Username already exist");
        }

        const existEmail: UserEntity = await this._userRepository.existEmailExceptById(id, email);

        if(existEmail) {
            throw new ConflictException("Email already exist");
        }

        const role: RoleEntity = await this._roleRepository.findOne({
            where: {
                name: userDto.role,
                status: RoleStatus.ACTIVE
            }
        });

        if(!role) {
            throw new NotFoundException('Role does not exist');
        }

        const user = this._userRepository.merge(existUser, {
            email,
            username,
            password,
            details: {
                name,
                firstName,
                secondName
            },
            role
        });

        await this._userRepository.save(user);

        return toUserDto(user);
        
    }

}

import { Injectable, BadRequestException, NotFoundException, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UserRepositry } from './user.repository';
import { InjectRepository, } from '@nestjs/typeorm';
import { Equal } from "typeorm";
import { UserEntity  } from './user.entity';
import { UserStatus } from './user-status.keys';
import { CreateUserDto } from './dto/create-user.dto';
import { toUserDto } from 'src/shared/mapper';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { IJwtPayload } from '../auth/jwt-payload.interface';
import { SignInDto } from '../auth/dto/signin.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepositry)
        private readonly _userRepository: UserRepositry,
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

        const userDb = await this._userRepository.existUsernameAndEmail(email, username);

        if(userDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }


        const user: UserEntity = await this._userRepository.create({
            email, username, password, details: { name, firstName, secondName}
        });

        await this._userRepository.save(user);

        return toUserDto(user);

    }

    async update(id: number, userDto: UpdateUserDto): Promise<UserDto> {

        const { email, username, password, name, firstName, secondName } = userDto;

        const existUsername: UserEntity = await this._userRepository.existUsernameExceptById(id, username);

        if(existUsername) {
            throw new HttpException("Username already exist", HttpStatus.CONFLICT);
        }

        const existEmail: UserEntity = await this._userRepository.existEmailExceptById(id, email);

        if(existEmail) {
            throw new HttpException("Email already exist", HttpStatus.CONFLICT);
        }

        const existUser = await this._userRepository.findOne({
            where: {
                id,
                status: UserStatus.ACTIVE
            }
        });

        const user = this._userRepository.merge(existUser, {
            email,
            username,
            password,
            details: {
                name,
                firstName,
                secondName
            }
        });

        await this._userRepository.save(user);

        return toUserDto(user);
        
    }

}

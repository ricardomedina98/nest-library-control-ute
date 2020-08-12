import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { UserRepositry } from './user.repository';
import { InjectRepository, } from '@nestjs/typeorm';
import { UserEntity  } from './user.entity';
import { UserStatus } from './user-status.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { toUserDto } from 'src/shared/mapper';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { RoleRepositry } from '../role/role.repository';
import { RoleType } from '../role/types/role-type.enum';
import { RoleEntity } from '../role/entities/role.entity';
import { RoleStatus } from '../role/types/role-status.enum';
import { SignUpDto } from '../auth/dto/signup.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepositry)
        private readonly _userRepository: UserRepositry,
        @InjectRepository(RoleRepositry)
        private readonly _roleRepository: RoleRepositry
    ) {}

    async getStudents() {

        const role = await this._roleRepository.findOne({
            where: {
                name: RoleType.STUDENT
            }
        });

        if(!role) {
            throw new NotFoundException('Role student does not exist');
        }

        const students = await this._userRepository.find({
            where: {
                role,
                status: UserStatus.ACTIVE
            }
        });

        return students.map(student => toUserDto(student));
    }

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
        let { email, username, password, name, firstName, secondName, enrollment } = userDto;

        const existUser = await this._userRepository.findOne({
            where: {
                username,
                status: UserStatus.ACTIVE
            }
        });

        if(existUser) {
            throw new ConflictException('User already exists');
        }

        const existEmail = await this._userRepository.findOne({
            where: {
                email,
                status: UserStatus.ACTIVE
            }
        });

        if(existEmail) {
            throw new ConflictException('Email already exists');
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

        if(role.name === RoleType.STUDENT) {
            enrollment = username;
        }


        let user: UserEntity = this._userRepository.create({
            email, username, password, details: { name, firstName, secondName, enrollment}, role
        });

        await this._userRepository.save(user);

        return toUserDto(user);

    }

    async update(id: number, userDto: UpdateUserDto): Promise<UserDto> {

        const { email, username, password, name, firstName, secondName, enrollment } = userDto;

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

        let user: UserEntity = this._userRepository.merge(existUser, {
            email,
            username,
            details: {
                name,
                firstName,
                secondName
            },
            role
        });

        if(role.name === RoleType.STUDENT) {
            user = this._userRepository.merge(user, {
                details: {
                    enrollment: username
                }
            })
        } else {
            user = this._userRepository.merge(user, {
                details: {
                    enrollment: null
                }
            })
        }

        if(password) {
            user = this._userRepository.merge(user, {
                password
            })
        }

        await this._userRepository.save(user);

        return toUserDto(user);
        
    }

    async delete(id: number): Promise<UserDto> {
        const existUser = await this._userRepository.findOne(id);

        if(!existUser) {
            throw new NotFoundException('User does not exist');
        }

        const userDelete = this._userRepository.merge(existUser, {
            status: UserStatus.INACTIVE
        });

        this._userRepository.save(userDelete);

        return toUserDto(userDelete);
    }

    async register(signUpDto: SignUpDto): Promise<UserDto> {
        
        const { enrollment, name, firstName, email, password } = signUpDto;

        const existEnrollment = await this._userRepository.findOne({
            where: {
                username: enrollment,
                status: UserStatus.ACTIVE
            }
        });

        if(existEnrollment) {
            throw new ConflictException('Enrollment already exists');
        }

        const existEmail = await this._userRepository.findOne({
            where: {
                email,
                status: UserStatus.ACTIVE
            }
        });

        if(existEmail) {
            throw new ConflictException('Email already exists');
        }

        const role: RoleEntity = await this._roleRepository.findOne({
            where: {
                name: RoleType.STUDENT,
                status: RoleStatus.ACTIVE
            }
        });

        if(!role) {
            throw new NotFoundException('Role by defualt does not exist');
        }

        let user: UserEntity = this._userRepository.create({
            email, username: enrollment, password, details: { name, firstName, enrollment }, role
        });

        await this._userRepository.save(user);

        return toUserDto(user);
    }

}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { IJwtPayload } from './jwt-payload.interface';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService
    ) {

    }

    async signIn(signInDto: SignInDto): Promise<{token: string}> {
        const user = await this._authRepository.findBySigIn(signInDto);

        const token = await this._createToken(user);

        return token;
    }

    async validateUser(payload: IJwtPayload) {
        const user = await this._authRepository.findByPayload(payload);

        if(!user) {
            throw new UnauthorizedException('Invalid token');
        }

        return user;
    }

    private async _createToken({ id, email, username, name, firstName, secondName, role}: UserDto) {
        const payload: IJwtPayload = {
            id, 
            email,
            username,
            name,
            firstName,
            secondName,
            role
        }
        const token: string = await this._jwtService.sign(payload);

        return { token };
    }

    
}

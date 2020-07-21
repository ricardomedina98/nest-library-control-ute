import { Controller, Body, Post, ValidationPipe, UsePipes } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {

    constructor(
        private readonly _authService: AuthService,
        private readonly _userService: UserService
    ) {}

    @Post('/signin')
    async signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
        return this._authService.signIn(signInDto);
    }

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto): Promise<UserDto> {
        return this._userService.register(signUpDto);
    }
}

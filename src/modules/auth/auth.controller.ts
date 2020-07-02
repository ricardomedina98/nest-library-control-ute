import { Controller, Body, Post, ValidationPipe, UsePipes } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly _authService: AuthService) {}

    @Post('/signin')
    @UsePipes(ValidationPipe)
    async signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
        return this._authService.signIn(signInDto);
    }
}

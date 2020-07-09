import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/modules/user/dto/user.dto';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: UserDto = request.user;

        const hasRole = () => roles.includes(user.role.name);

        return user && user.role && hasRole();
    }
}


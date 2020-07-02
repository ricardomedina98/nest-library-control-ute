import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "src/config/config.service";
import { Configuration } from "src/config/config.keys";

import { IJwtPayload } from "../jwt-payload.interface";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _configService: ConfigService,
        private readonly _authService: AuthService
    ) {
       super({
           jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
           secretOrKey: _configService.get(Configuration.JWT_SECRET)
       });
    }

    async validate(payload: IJwtPayload) {
        const user = await this._authService.validateUser(payload);

        if(!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return payload;
    }
}
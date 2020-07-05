import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { ConfigService } from "src/config/config.service";
import { Configuration } from "src/config/config.keys";

import { IJwtPayload } from "../jwt-payload.interface";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _configService: ConfigService,
        private readonly _authService: AuthService
    ) {
       super({
           jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
           ignoreExpiration: false,
           secretOrKey: _configService.get(Configuration.JWT_SECRET)
       });
    }

    async validate(payload: IJwtPayload, done: VerifiedCallback) {
        const user = await this._authService.validateUser(payload);

        if(!user) {
            done(new UnauthorizedException(), false);
        }

        return done(null, user);
    }
}
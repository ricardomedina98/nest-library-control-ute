import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/user/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { BookModule } from './modules/book/book.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UsersModule, AuthModule, RoleModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;
  
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.APP_PORT);
  }
}

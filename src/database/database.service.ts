import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from 'src/config/config.keys';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                ssl: false,
                type: 'mysql' as 'mysql',
                host: config.get(Configuration.MYSQL_HOST),
                username : config.get(Configuration.MYSQL_USERNAME),
                port: Number(config.get(Configuration.MYSQL_PORT)),
                database: config.get(Configuration.MYSQL_DATABASE),
                password : config.get(Configuration.MYSQL_PASSWORD),
                logging: true,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,.js}']
            } as ConnectionOptions;
        } 
    })
]
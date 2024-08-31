import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '../user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configurations from 'src/configurations'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '../user/models/user.model'
import { AuthModule } from '../auth/auth.module'
import { TokenModule } from '../token/token.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configurations]
		}),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				dialect: configService.get('db.type'),
				host: configService.get('db.host'),
				port: configService.get('db.port'),
				username: configService.get('db.username'),
				password: configService.get('db.password'),
				database: configService.get('db.database'),
				autoLoadModels: true,
				synchronize: true,
				models: [User]
			})
		}),
		UserModule,
		AuthModule,
		TokenModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './models/user.model'
import { UserController } from './user.controller';

@Module({
	imports: [SequelizeModule.forFeature([User])],
	providers: [UserService],
	exports: [UserService],
	controllers: [UserController]
})
export class UserModule {}

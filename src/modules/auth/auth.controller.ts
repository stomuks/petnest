import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDTO } from '../user/dto'
import { UserLoginDTO } from './dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthUserResponse } from './response'
import { JwtAuthGuard } from 'src/guards/jwt-guard'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiTags('API')
	@ApiResponse({ status: 201, type: CreateUserDTO })
	@Post('register')
	async registerUsers(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
		return await this.authService.registerUsers(dto)
	}

	@ApiTags('API')
	@ApiResponse({ status: 200, type: AuthUserResponse })
	@Post('login')
	async loginUsers(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
		return await this.authService.loginUsers(dto)
	}

	@ApiTags('API')
	@UseGuards(JwtAuthGuard)
	@Post('test')
	async test() {
		return 'islogged'
	}
}

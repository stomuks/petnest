import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { CreateUserDTO } from '../user/dto'
import { AppError } from 'src/common/constants/errors'
import { UserLoginDTO } from './dto'
import { compare } from 'bcrypt'
import { TokenService } from '../token/token.service'
import { AuthUserResponse } from './response'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService
	) {}

	async registerUsers(dto: CreateUserDTO): Promise<AuthUserResponse> {
		const existUser = await this.userService.findUserByEmail(dto.email)
		if (existUser) {
			throw new BadRequestException(AppError.USER_EXISTS)
		}
		await this.userService.createUser(dto)
		const token = await this.tokenService.createToken(dto.email)
		const user = await this.userService.publicUser(dto.email)
		return { ...user, token }
	}

	async loginUsers(dto: UserLoginDTO): Promise<AuthUserResponse> {
		const existUser = await this.userService.findUserByEmail(dto.email)
		if (!existUser) {
			throw new BadRequestException(AppError.USER_NOT_FOUND)
		}

		const isPasswordValid = await compare(dto.password, existUser.password)

		if (!isPasswordValid) {
			throw new BadRequestException(AppError.INVALID_CREDENTIALS)
		}
		const userData = {
			name: existUser.name,
			username: existUser.username,
			email: existUser.email
		}
		const token = await this.tokenService.createToken(userData)
		const user = await this.userService.publicUser(dto.email)
		return { ...user, token }
	}
}

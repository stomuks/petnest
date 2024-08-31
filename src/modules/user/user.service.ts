import { Injectable } from '@nestjs/common'
import { User } from './models/user.model'
import { InjectModel } from '@nestjs/sequelize'
import { hash } from 'bcrypt'
import { CreateUserDTO, UpdateUserDto } from './dto'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private readonly userRepository: typeof User
	) {}

	async hashPassword(password: string) {
		return hash(password, 10)
	}

	async findUserByEmail(email: string) {
		return this.userRepository.findOne({ where: { email } })
	}

	async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
		dto.password = await this.hashPassword(dto.password)
		await this.userRepository.create({ ...dto })
		return dto
	}

	async publicUser(email: string) {
		return this.userRepository.findOne({
			where: { email },
			attributes: { exclude: ['password'] }
		})
	}

	async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
		console.log('email', email)
		await this.userRepository.update({ ...dto }, { where: { email } })
		return dto
	}

	async deleteUser(email: string): Promise<boolean> {
		await this.userRepository.destroy({ where: { email } })
		return true
	}
}

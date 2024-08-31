import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateUserDTO {
	@ApiProperty()
	@IsString()
	name: string

	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	password: string

	@ApiProperty()
	@IsString()
	email: string
}

export class UpdateUserDto {
	@ApiProperty()
	@IsString()
	name: string

	@ApiProperty()
	@IsString()
	username: string

	@ApiProperty()
	@IsString()
	email: string
}

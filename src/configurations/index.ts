export default () => ({
	port: process.env.PORT || 3000,
	db: {
		type: process.env.DB_TYPE || 'postgres',
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 5432,
		username: process.env.DB_USERNAME || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		database: process.env.DB_DATABASE || 'postgres'
	},
	secret_jwt: process.env.SECRET_JWT,
	expire_jwt: process.env.EXPIRE_JWT
})

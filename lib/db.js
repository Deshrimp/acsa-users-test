const setupDatabase = require('../services/sequelize');

// MODELS
const setupUserModel = require('../services/sequelize/models/users');
const setupUser = require('../services/sequelize/methods/users');

module.exports = async function DB(config) {
	config = {
		database: process.env.PSQL_DB_NAME,
		username: process.env.PSQL_DB_USER,
		password: process.env.PSQL_DB_PASS,
		host: process.env.PSQL_DB_HOST,
		port: process.env.PSQL_DB_PORT,
		dialect: 'postgres',
		timezone: '+00:00',
		logging: s => debug(s)
	};

	const sequelize = setupDatabase(config);

	await sequelize.authenticate();

	//MODELS
	const userModel = setupUserModel(config);

	// ASSOSIATIONS

	const User = setupUser(config, userModel);

	return {
		User
	};
};

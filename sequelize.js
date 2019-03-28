const Sequelize = require('sequelize');
const usersInfo = require('./models/usersInfo');
const usersProf = require('./models/usersProfile');

const configmysql = {
	database: process.env.PSQL_DB_NAME,
	username: process.env.PSQL_DB_USER,
	password: process.env.PSQL_DB_PASS,
	host: process.env.PSQL_DB_HOST,
	port: process.env.PSQL_DB_PORT,
	dialect: 'postgres',
	timezone: '+00:00',
	logging: s => debug(s)
};

// const sequelize = new Sequelize('users', 'root', 'password', {
// 	host: 'localhost',
// 	dialect: 'mysql',
// 	pool: {
// 		max: 10,
// 		min: 0,
// 		acquire: 30000,
// 		idle: 10000
// 	}
// });

const sequelize = new Sequelize(configmysql);

const usersInformation = usersInfo(sequelize, Sequelize);
const usersProfile = usersProf(sequelize, Sequelize);

//usersInformation.belongsTo(usersProfile)
sequelize.sync({ force: false }).then(() => {
	console.log('Database and tables created');
});

module.exports = {
	usersInformation,
	usersProfile
};

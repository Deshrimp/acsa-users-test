const Sequelize = require('sequelize');
const usersInfo = require('./models/usersInfo');
const usersProf = require('./models/usersProfile');
// --------------------------------(database, username(root), password)-------------
const sequelize = new Sequelize('tf2jn7sb12i2qgfg', 'vfpv66nks439h0o9', 'ydwyp1oe1vu4f8ph', {
	// ------hostname (localhost)----------------
	host: 'mwgmw3rs78pvwk4e.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	port: 3306,
	dialect: 'mysql',
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

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

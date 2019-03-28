const Sequelize = require('sequelize');
const setupDatabase = require('..');

module.exports = function setupUserModel(config) {
	const sequelize = setupDatabase(config);

	const user = sequelize.define(
		'users',
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			last_login: {
				type: Sequelize.DATE
			},
			status: {
				type: Sequelize.ENUM('active', 'inactive'),
				defaultValue: 'active'
			}
		},
		{
			underscored: true,
			freezeTableName: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	);

	return user;
};

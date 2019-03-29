module.exports = (sequelize, type) => {
	return sequelize.define(
		'usersInfo',
		{
			name: {
				type: type.STRING,
				allowNull: false
			},
			password: {
				type: type.STRING,
				allowNull: false
			},
			last_login: {
				type: type.DATE
			},
			status: {
				type: type.ENUM('active', 'inactive'),
				defaultValue: 'active'
			}
		},
		{
			// don't add the timestamp attributes (updatedAt, createdAt)
			timestamps: false,

			// disable the modification of tablenames; By default, sequelize will automatically
			// transform all passed model names (first parameter of define) into plural.
			// if you don't want that, set the following
			freezeTableName: true
		}
	);
};

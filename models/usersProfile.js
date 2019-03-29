module.exports = (sequelize, type) => {
	return sequelize.define(
		'userProfile',
		{
			name: {
				type: type.STRING,
				allowNull: false,
				validate: {
					len: [5, 50]
				}
			},
			age: {
				type: type.INTEGER,
				allowNull: false,
				validate: {
					max: 90,
					min: 10
				}
			},
			gender: {
				type: type.STRING,
				allowNull: true,
				defaultValue: 'Non-binary'
			},
			role: {
				type: type.STRING,
				allowNull: false,
				defaultValue: 'normal'
			},
			code: {
				type: type.STRING,
				//:TODO: Change this to false
				allowNull: true,
				validate: {
					len: [10]
				}
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

const Sequelize = require('sequelize');
const { Op } = Sequelize;

module.exports = function setupUser(config, userModel) {
	function create(userData) {
		return userData.create(userData);
	}
	function getAll() {
		return userModel.findAll();
	}

	return {
		create,
		getAll
	};
};

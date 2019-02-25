module.exports = (sequelize, type) => {
  return sequelize.define("usersInfo", {
    username: {
      type: type.STRING,
      allowNull: false
    },
    password: {
      type: type.STRING,
      allowNull: false
    }
  })
}

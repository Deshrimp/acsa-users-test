module.exports = (sequelize, type) => {
  return sequelize.define("usersInfo", {
    username: {
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
      type: type.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  })
}

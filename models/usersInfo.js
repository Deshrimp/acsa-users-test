module.exports = (sequelize, type) => {
  return sequelize.define("usersInfo", {
    name: {
      type: type.STRING,
      allowNull: true,
      defaultValue: "thisIsADefault"
    },
    password: {
      type: type.STRING,
      defaultValue: "thisIsADefault"
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

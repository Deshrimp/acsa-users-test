module.exports = (sequelize, type) => {
  return sequelize.define("userProfile", {
    nombre: {
      type: type.STRING,
      allowNull: false
    },
    edad: {
      type: type.INTEGER,
      allowNull: false
    },
    username: {
      type: type.STRING,
      allowNull: false
    },
    correo: {
      type: type.STRING,
      allowNull: false
    },
    rol: {
      type: type.STRING,
      allowNull: false,
      defaultValue: "normal"
    }
  })
}

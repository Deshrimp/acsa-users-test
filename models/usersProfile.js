module.exports = (sequelize, type) => {
  return sequelize.define("userProfile", {
    name: {
      type: type.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
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
      defaultValue: "Non-binary"
    },
    role: {
      type: type.STRING,
      allowNull: false,
      defaultValue: "normal"
    },
    code: {
      type: type.STRING,
      //:TODO: Change this to false
      allowNull: true,
      validate: {
        len: [10]
      }
    }
  })
}

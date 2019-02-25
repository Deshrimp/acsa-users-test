const Sequelize = require("sequelize")
const usersInfo = require("./models/usersInfo")
const usersProf = require("./models/usersProfile")

const sequelize = new Sequelize("users", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const usersInformation = usersInfo(sequelize, Sequelize)
const usersProfile = usersProf(sequelize, Sequelize)

//usersInformation.belongsTo(usersProfile)
sequelize.sync({ force: true }).then(() => {
  console.log("Database and tables created")
})

module.exports = {
  usersInformation,
  usersProfile
}

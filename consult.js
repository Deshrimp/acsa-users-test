var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "users"
})

connection.connect(function(err) {
  if (err) throw err
  console.log("Connected as id: " + connection.threadId)
  menuOptions()
})

function menuOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Escoge una opcion:",
        choices: [
          "Crear un usuario nuevo",
          "Ver usuarios",
          "Ver usuario por id"
        ],
        name: "menuOption"
      }
    ])
    .then(function(inquirerResponde) {
      switch (inquirerResponde.menuOption) {
        case "Crear un usuario nuevo":
          newUser()
          break
        case "Ver usuarios":
          consultUsers()
          break
        default:
          console.log("Opcion no valida")
      }
    })
}
function newUser() {
  console.log("Creating new user")
}
function consultUsers() {
  console.log("Consulting users")
}

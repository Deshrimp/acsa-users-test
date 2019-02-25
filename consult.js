const express = require("express")
const bodyParser = require("body-parser")
const inquirer = require("inquirer")
const { usersInformation, usersProfile } = require("./sequelize")

const app = express()
app.use(bodyParser.json())

app.post("/api/users", (req, res) => {
  console.log(req.body)
  /* const testDatabase = {
    nombre: "Michael",
    edad: 26,
    correo: "giraffesyo@gmail.com",
    username: "giraffesyo"
  }*/
  const { nombre, edad, correo, username, password } = req.body
  usersInformation
    .create({ username, password })
    .then(user =>
      usersProfile.create({ userId: user.id, nombre, edad, correo, username })
    )
    .then(userProfile => {
      console.log("made it to user profile")
      return res
        .status(200)
        .json({ message: `User ${userProfile.correo} created succesfully` })
    })
})

app.get("/api/users", (req, res) => {
  usersProfile.findAll().then(users => res.json(users))
})
const PORT = 3000
app.listen(PORT, () => {
  console.log("Running on port " + PORT)
})

//menuOptions()

// function menuOptions() {
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         message: "Escoge una opcion:",
//         choices: [
//           "Crear un usuario nuevo",
//           "Ver usuarios",
//           "Ver usuario por id"
//         ],
//         name: "menuOption"
//       }
//     ])
//     .then(function(inquirerResponse) {
//       switch (inquirerResponse.menuOption) {
//         case "Crear un usuario nuevo":
//           newUser()
//           break
//         case "Ver usuarios":
//           consultUsers()
//           break
//         default:
//           console.log("Opcion no valida")
//       }
//     })
// }
// function newUser() {
//   console.log("Creating new user")
//   inquirer.prompt([
//     {
//       type: "input",
//       name: "inputName",
//       message: "Por favor ingresa tu nombre: "
//     },
//     {
//       type: "input",
//       name: "inputAge",
//       message: "Por favor ingresa tu edad: "
//     },
//     {
//       type: "input",
//       name: "inputUsername",
//       message: "Por favor ingresa tu nombre de usuario: "
//     },
//     {
//       type: "input",
//       name: "inputMail",
//       message: "Por favor ingresa tu correo electronico: "
//     }.then(function(inquirerResponse) {
//       const name = inquirerResponse.inputName
//       const age = parseInt(inquirerResponse.inputAge)
//       const username = inquirerResponse.inputUsername
//       const mail = inquirerResponse.inputMail
//       connection.query("INSERT INTO usersProfile SET ?", {
//         nombre: name,
//         edad: age,
//         username: username,
//         mail: mail
//       })
//     })
//   ])
// }
// function consultUsers() {
//   console.log("Consulting users")
// }

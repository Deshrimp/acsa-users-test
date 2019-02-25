const express = require("express")
const bodyParser = require("body-parser")
const passport = require("passport")
const bcrypt = require("bcrypt")

//const env = require("dotenv").load()

const LocalStrategy = require("passport-local").Strategy

const { usersInformation, usersProfile } = require("./sequelize")

// extend our model to contain the password check method
const validPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

//const models = require("./models")
const app = express()
//const authRoute = require("./routes/auth")(app)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

passport.use(
  new LocalStrategy((username, password, done) => {
    usersInformation
      .findOne({ where: { username: username } })
      .then(user => {
        console.log("made it to call in check login")
        if (!user) {
          return done(null, false, { message: "Incorrect username!" })
        }
        if (!validPassword(password, user.password)) {
          return done(null, false, { message: "Incorrect password!" })
        }
        return done(null, user)
      })
      .catch(err => done(err))
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  usersInformation
    .findById(id)
    .then(user => {
      done(null, user)
    })
    .catch(err => done(err))
})

app.use(passport.initialize())
app.use(passport.session())

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  console.log("The authenticated user is: ")
  console.log(req.user.username)
  res.status(200).json({ message: "Authenticated succesfully" })
})

// app.use(
//   session({ secret: "arcsa test", resave: true, saveUninitialized: true })
// )
// app.use(passport.initialize())
// app.use(passport.session())
// models.sequelize
//   .sync()
//   .then(function() {
//     console.log("Databse created")
//   })
//   .catch(function(err) {
//     console.log(err, "Error")
//   })
app.post("/api/users", (req, res) => {
  const { nombre, edad, correo, username, password } = req.body
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  usersInformation
    .create({ username, password: hashedPassword })
    .then(user =>
      usersProfile.create({ userId: user.id, nombre, edad, correo, username })
    )
    .then(userProfile => {
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

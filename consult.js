const express = require("express")
const bodyParser = require("body-parser")
const passport = require("passport")
const bcrypt = require("bcrypt")
const passwordValidator = require("password-validator")

const LocalStrategy = require("passport-local").Strategy

const { usersInformation, usersProfile } = require("./sequelize")

const schema = new passwordValidator()
schema
  .is()
  .min(10)
  .is()
  .max(60)
  .has()
  .lowercase()
  .has()
  .uppercase()
  .has()
  .digits()
  .has()
  .symbols()
// extend our model to contain the password check method
const validPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

passport.use(
  new LocalStrategy((username, password, done) => {
    usersInformation
      .findOne({ where: { username: username } })
      .then(user => {
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

app.post(
  "/api/login",
  passport.authenticate("local", {
    successRedirect: "/api/users",
    failureRedirect: "/api/login",
    failureFlash: true
  }),
  (req, res) => {
    console.log("The authenticated user is: ")
    console.log(req.user.username)
    res.status(200).json({ message: "Authenticated succesfully" })
  }
)

app.post("/api/users", (req, res) => {
  const { nombre, edad, correo, username, password } = req.body
  if (schema.validate(password)) {
    console.log("Good password")
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
  } else {
    console.log(
      "Password must contain lower case, upper case, numers and symbols. Must be at least 10 characters long"
    )
  }
})

app.get("/api/users", (req, res) => {
  usersProfile.findAll().then(users => res.json(users))
})
const PORT = 3000
app.listen(PORT, () => {
  console.log("Running on port " + PORT)
})

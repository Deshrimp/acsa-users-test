const express = require("express")
const bodyParser = require("body-parser")
//FOR LOGIN
const passport = require("passport")
//TO ENCRYPT PASSWORD
const bcrypt = require("bcrypt")
//VALIDATE PASSWORD MEETS REQUIREMENT
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
  new LocalStrategy((name, password, done) => {
    usersInformation
      .findOne({ where: { name: name } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect name!" })
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

//TODO: NOT working
//ROUTE FOR LOGGING IN
app.post(
  "/api/login",
  passport.authenticate("local", {
    successRedirect: "/api/users",
    failureRedirect: "/api/login",
    failureFlash: true
  }),
  (req, res) => {
    console.log("The authenticated user is: ")
    console.log(req.user.name)
    res.status(200).json({ message: "Authenticated succesfully" })
  }
)
//ROUTE FOR CREATING A NEW USER
app.post("/api/users", (req, res) => {
  const { name, age, gender, password } = req.body
  console.log(password)
  if (schema.validate(password)) {
    console.log("Good password")
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    usersInformation
      .create({ name, password: hashedPassword })
      .then(user =>
        usersProfile.create({
          userId: user.id,
          name,
          age,
          gender
        })
      )
      .then(userProfile => {
        return res
          .status(200)
          .json({ message: `User ${userProfile.name} created succesfully` })
      })
  } else {
    console.log(
      "Password must contain lower case, upper case, numers and symbols. Must be at least 10 characters long"
    )
  }
})
//ROUTE FOR GETTING USERS
app.get("/api/users", (req, res) => {
  usersProfile.findAll().then(users => res.json(users))
})
//ROUTE FOR GETTING A USER
app.get("/api/users/:id", function(req, res) {
  usersProfile
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbUser) {
      res.json(dbUser)
    })
})

//ROUTE FOR DELETING USERS
app.delete("/api/users/:id", function(req, res) {
  usersProfile
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(
      usersInformation
        .destroy({
          where: {
            id: req.params.id
          }
        })
        .then(function(dbPost) {
          res.json(dbPost)
        })
    )
})
//ROUTE FOR UPDATING USERS
app.put("/api/users", function(req, res) {
  usersProfile
    .update(
      {
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
    .then(
      usersInformation.update(
        {
          name: req.body.name
        },
        {
          where: {
            id: req.body.id
          }
        }
      )
    )
    .then(function(user) {
      res.json(user)
    })
})
const PORT = 3000
app.listen(PORT, () => {
  console.log("Running on port " + PORT)
})

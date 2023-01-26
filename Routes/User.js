const express = require('express')
const User = require('../Models/User')
const UserRouter = express.Router()
const bcrypt = require ('bcrypt')
var jwt = require('jsonwebtoken')
const { exists } = require('../Models/User')
const { signUp, signIn, ReadAllUsers, ReadOneUser, UpdateUser, deleteUser } = require('../Controllers/User')
const { validationSignUp, validation, validationSignIn } = require('../Middlewares/Validator')
const isAuth = require('../Middlewares/IsAuth')


UserRouter.post ('/signUp',validationSignUp,validation,signUp)


UserRouter.post ('/signIn',validationSignIn,validation,signIn)

UserRouter.get ('/currentUser',isAuth,(req,res)=>{res.send(req.user)})


UserRouter.get ('/ReadAllUsers',ReadAllUsers)

UserRouter.get ('/ReadOneUser/:id',ReadOneUser)

UserRouter.put ('/UpdateUser/:id',UpdateUser)

UserRouter.delete ('/deleteUser/:id',deleteUser) 











module.exports = UserRouter
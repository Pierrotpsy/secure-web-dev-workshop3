const router = require('express').Router()
const userService = require('./users.service')
const passport = require("passport");
const LoginStrategy = require('../middlewares/LoginStrategy');
const AuthStrategy = require('../middlewares/AuthStrategy');
const accessMiddleware = require('../middlewares/AccessMiddleware');
const jwt = require('jsonwebtoken');

passport.use('login',LoginStrategy);
passport.use('auth', AuthStrategy);

//
// Business logic tested using Postman
//

// /POST for /users/register --> Adds a new user
// http://localhost:3000//users/register
// username = pierrotpsy
// password = pass
// role = superAdmin
router.post('/users/register', async (req, res) => {
    try {
        const user = await userService.addUser(req.query)
        return res.status(200).send(user)
    } catch (e) {
        return res.status(400).send("Bad Request")
    }
})

// /POST for /users/login --> Log in an existing user
// http://localhost:3000//users/login
// username = pierrotpsy
// password = pass
router.post('/users/login', passport.authenticate('login',{session: false, failureMessage: true}),async(req,res)=>{
    if(req.user == "403") {
        return res.status(403).send("Wrong password")
    } else if(req.user == "404") {
        return res.status(404).send("Wrong username")
    } else { 
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
        return res.status(200).send(req.user + '\n JWT Token : ' + token)
    }
})

// /GET for /users/me --> Get current user info
// http://localhost:3000//users/me
// token = ?
router.get('/users/me', passport.authenticate('auth',{session: false, failureMessage: true}), async (req, res) => {
    if(!req.user) {
        return res.status(404).send("Invalid JWT")
    } else {
        return res.status(200).send(req.user)
    }
})

// /PUT for /users/me --> Updates the current user
// http://localhost:3000//users/me
// password = something
// token = ?
router.put('/users/me', passport.authenticate('auth',{session: false, failureMessage: true}), async (req, res) => {
    try{
        if(!req.user) {
            return res.status(404).send("Invalid JWT")
        } else {
            const user = await userService.updateUser(req.user._id, req.query)
            return res.status(200).send(user)
        }
    } catch(e) {
        return res.status(400).send(e)
    }
})

// /DELETE for /users/me --> Deletes the current user
// http://localhost:3000//users/me
// password = something
// token = ?
router.delete('/users/me', passport.authenticate('auth',{session: false, failureMessage: true}), async (req, res) => {
    try{
        if(!req.user) {
            return res.status(404).send("Invalid JWT")
        } else {
            const user = await userService.deleteUser(req.user._id)
            return res.status(200).send(user)
        }
    } catch(e) {
        return res.status(400).send(e)
    }
})

// /GET for /users --> Gets all users
// http://localhost:3000//users
// token = ?
router.get('/users', passport.authenticate('auth',{session: false, failureMessage: true}), accessMiddleware.access(['superAdmin', 'admin']), async (req, res) => {
    try{
        if(!req.user) {
            return res.status(404).send("Invalid JWT")
        } else {
            const users = await userService.findAll()
            return res.status(200).send(users)
        }
    } catch(e) {
        return res.status(400).send(e)
    }
})

module.exports = router
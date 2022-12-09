const router = require('express').Router()
const userService = require('./users.service')
const passport = require("passport");
const LoginStrategy = require('../passport-strat/LoginStrategy');
const AuthStrategy = require('../passport-strat/AuthStrategy');
const jwt = require('jsonwebtoken');

passport.use('login',LoginStrategy);
passport.use('auth', AuthStrategy);

// /GET for /locations --> get all the locations 
// http://localhost:3000/locations
router.post('/users/register', async (req, res) => {
    try {
        const user = await userService.addUser(req.query)
        return res.status(200).send(user)
    } catch (e) {
        return res.status(400).send("Bad Request")
    }
})
//, passport.authenticate('auth',{session: false, failureMessage: true})
router.post('/users/login', passport.authenticate('login',{session: false, failureMessage: true}),async(req,res)=>{
    if(req.user == "403") {
        return res.status(403).send("Wrong password")
    } else if(req.user == "404") {
        return res.status(404).send("Wrong username")
    } else { 
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
        return res.status(200).send(req.user + token)
    }
})

router.get('/users/me', passport.authenticate('auth',{session: false, failureMessage: true}), async (req, res) => {
    if(!req.user) {
        return res.status(404).send("Invalid JWT")
    } else {
        const user = await userService.findOne(req.query.username)
        return res.status(200).send(user)
    }
})
router.put('/users/me', passport.authenticate('auth',{session: false, failureMessage: true}), (req, res) => {
    return res.status(200).send()
})
router.delete('/users/me', passport.authenticate('auth',{session: false, failureMessage: true}), (req, res) => {
    return res.status(200).send()
})
router.get('/users', async (req, res) => {
    return res.status(200).send({users: await userService.findAll()})
})

module.exports = router
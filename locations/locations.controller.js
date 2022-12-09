// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service');
const passport = require("passport");
const AuthStrategy = require('../passport-strat/AuthStrategy');
passport.use('auth', AuthStrategy);
//
// Business logic tested using Postman
//


router.get('/', (req, res) => {
    res.send('Hello World!');
}); 


// /GET for /locations --> get all the locations 
// http://localhost:3000/locations
router.get('/locations', passport.authenticate('auth',{session: false, failureMessage: true}), async (req, res) => {
    try {
        const loc = await locationsService.getAllLocations()
        return res.status(200).send(loc)
    } catch (e) {
        if (e.message === "Resource not found") {
            return res.status(404).send(e.message)
        }
        return res.status(101).send("Bad Request")
    }
})

// /GET for /locations with /:id path variable --> get the matching location
// http://localhost:3000/locations/:id
// id = 63924e75df0409fce6781588
router.get('/locations/:id', passport.authenticate('auth',{session: false, failureMessage: true}), async (req, res) => {
    try {
        const loc = await locationsService.getLocationbyID(req.params.id)
        return res.status(200).send(loc)
    } catch (e) {
        if (e.message === "Resource not found") {
            return res.status(404).send(e.message)
        }
        return res.status(101).send("Bad Request")
    }
})

// /POST for /locations --> Add a new location using query parameters
// http://localhost:3000/locations?filmName=Les cités d'or&district=00000
router.post('/locations', passport.authenticate('auth',{session: false, failureMessage: true}), async (req, res) => {
    try {
        const loc = await locationsService.addLocation(req.query)
        return res.status(200).send(loc)
    } catch (e) {
        return res.status(101).send("Bad Request")
    }
})

// /DELETE for /locations with /:id path variable--> delete the matching location
// http://localhost:3000/locations/:id
// id = 63924e75df0409fce6781588
router.delete('/locations/:id', passport.authenticate('auth',{session: false, failureMessage: true}), async (req, res) => {
    try {
        const loc = await locationsService.deleteLocationByID(req.params.id)
        return res.status(200).send(loc)
    } catch (e) {
        if (e.message === "Resource not found") {
            return res.status(404).send(e.message)
        }
        return res.status(101).send("Bad Request")
    }
})

// /PUT for /locations with /:id path variable--> update the matching location using query parameters
// http://localhost:3000/locations/:id?filmName="Albator"&district=11111
// id = 63924e75df0409fce6781589
router.put('/locations/:id', passport.authenticate('auth',{session: false, failureMessage: true}), async (req, res) => {
	try {
		const loc = await locationsService.updateLocation(req.params.id, req.query)
		return res.status(200).send(loc)
	} catch(e) {
		if (e.message === "Resource not found") {
            return res.status(404).send(e.message)
        }
        return res.status(101).send("Bad Request")
	}
})


module.exports = router

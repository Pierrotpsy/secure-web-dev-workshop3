const express = require('express')
const userController = require('./users/users.controller')
const locationController = require('./locations/locations.controller')
const app = express()
const port = 3000
const mongoose = require('mongoose')
require('dotenv').config()

app.use(userController)
app.use(locationController)

app.listen(port, async () => {
	await mongoose.connect(process.env.MONGO_URI)
    console.log("Connection established")
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})

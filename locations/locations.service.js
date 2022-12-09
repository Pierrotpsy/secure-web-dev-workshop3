// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function getAllLocations() {
	const location = await Location.find()
	if(!location){
		throw new Error("Resource not found");
	}
	return location
}

async function getLocationbyID(idInMongo){
	const location = await Location.findById(idInMongo)
	if(!location){
		throw new Error("Resource not found");
	}
	return location
}
async function addLocation(location){
	const loc = await new Location(location)
	return loc.save();
}
async function deleteLocationByID(id) {
	return Location.findOneAndDelete({_id:id})
}

async function updateLocation(id,update){
	return Location.updateOne({_id: id}, {$set:update})
}

module.exports.getAllLocations = getAllLocations
module.exports.getLocationbyID = getLocationbyID
module.exports.addLocation = addLocation
module.exports.deleteLocationByID= deleteLocationByID
module.exports.updateLocation = updateLocation
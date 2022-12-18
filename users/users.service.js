const User = require('./users.model')
const bcrypt = require('bcrypt')

function findAll(){
    return User.find({}).select("-password")
}

async function getUserByName(name) {
    return User.find({username : name})
  }

async function getUserByID(id){
	const user = await User.findById(id)
	if(!user){
		throw new Error("Resource not found");
	}
	return user
}

async function addUser(data) {
    try {
        const hash = await bcrypt.hash(data.password, 12)
        const user = new User({username: data.username, password: hash, role: data.role})
        return await user.save();
    } catch (e) {
        console.log(e)
        throw new Error("Username already used")
    }
}
async function verifyPassword(name,password){
    const user = await User.findOne({username:name})
    if(!user){
        return "404"
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        return "403"
    }
    return user
}

async function updateUser(id, data) {
    try {
        if(!data.password) {
            const hash = await bcrypt.hash(data.password, 10)
            data.password = hash
        }
        return User.updateOne({_id: id},{$set: data});
    } catch (e) {
        throw new Error("Error when updating")
    }
}

async function deleteUser(id) {
    try {
        return User.findOneAndDelete({_id:id});
    } catch (e) {
        throw new Error("Error when deleting")
    }
}

module.exports.addUser = addUser
module.exports.getUserByName = getUserByName
module.exports.findAll = findAll
module.exports.verifyPassword = verifyPassword
module.exports.getUserByID = getUserByID
module.exports.updateUser = updateUser
module.exports.deleteUser = deleteUser
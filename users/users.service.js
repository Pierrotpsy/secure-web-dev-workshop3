const User = require('./users.model')
const bcrypt = require('bcrypt')

function findAll(){
    return User.find({})
}

async function findOne(name) {
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
        const hash = await bcrypt.hash(data.password, 10)
        const user = new User({username: data.username, password: hash})
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
module.exports.addUser = addUser
module.exports.findOne = findOne
module.exports.findAll = findAll
module.exports.verifyPassword = verifyPassword
module.exports.getUserByID = getUserByID
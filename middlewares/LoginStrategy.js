const LocalStrategy = require("passport-local");
const userService = require("../users/users.service")
require('dotenv').config()

const loginStrategy = (new LocalStrategy({session: false},
    async function(username,password,done){
        try{
            const user = await userService.verifyPassword(username, password)
            if (user == "403") { return done(null, "403"); }
            if (user == "404") { return done(null, "404"); }
            return done(null, user);
        } catch(err) {
            if(err) { return done(err); }
        }
    }
));

module.exports = loginStrategy
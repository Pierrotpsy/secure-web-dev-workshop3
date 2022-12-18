const JwtStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const userService = require("../users/users.service")
require('dotenv').config()

authStrategy = new JwtStrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token'),
  }, 
    async function(token, done) {
        try {
            if(!token) {
                return done(null, false)
            }
            const user = await userService.getUserByID(token.id)
            if (!user) { return done(null, false); }
            return done(null, user);
        } catch(err) {
            if(err) { return done(err); }
        }
    }
);

module.exports = authStrategy
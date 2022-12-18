require('dotenv').config()

const passport = require('passport');
const User = require('../users/users.model');

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(options,
        function(token, done) {
            User.findOne({_id: token.sub}, function(err, user) {
                if (err){
                    return done(err, false);
                }
                if (user){
                    return done(null, {
                        _id:user?._id,
                        role:user?.role
                    });
                }
                return done(null, false);
            });
        }
    )
);

module.exports = passport;
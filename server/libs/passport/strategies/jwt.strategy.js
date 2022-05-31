const { JWT_SECRET } = require('../../../config');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const JwtStrategy = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
},
async (payload, done) => {
    return done(null, payload);
});

module.exports = JwtStrategy
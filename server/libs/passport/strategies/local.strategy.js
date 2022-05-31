const { Strategy } = require('passport-local');
const { models } = require('../../sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');

const LocalStrategy = new Strategy({
    'usernameField': 'email',
    'passwordField': 'password'
},
async (email, password, done) => {
    try {
        const user = await models.User.findOne({
            where: {
                email: email
            }
        });
        
        if(!user) {
            throw boom.unauthorized();
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if(!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

module.exports = LocalStrategy
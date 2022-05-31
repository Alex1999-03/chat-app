const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');

class AuthService {
    signToken(user) {
        const payload = {
            sub: user.id,
            name: `${user.firstName} ${user.lastName}`
        }
        const token = jwt.sign(payload, JWT_SECRET);
        return {
            user,
            token
        }
    }
}


module.exports = AuthService
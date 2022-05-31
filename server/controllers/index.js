const MessagesController = require('./messages.controller')
const AuthController = require('./auth.controller');

function ConfigController(app) {
    app.use('/messages', MessagesController);
    app.use('/auth', AuthController);
}

module.exports = ConfigController
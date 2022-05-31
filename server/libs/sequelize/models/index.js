const { Message, MessageSchema } = require('./message.model');
const { User, UserSchema } = require('./user.model');

function SetupModels(sequelize) {
    Message.init(MessageSchema, Message.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    
    Message.associate(sequelize.models);
    User.associate(sequelize.models);
}

module.exports = SetupModels
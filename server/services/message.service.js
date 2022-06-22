const { User } = require('../libs/sequelize/models/user.model');
const { models } = require("../libs/sequelize");

const getMessages = async () => {
  return (
    await models.Message.findAll({
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    })
  ).map((message) => {
    return {
      id: message.id,
      text: message.text,
      createdAt: message.createdAt,
      userId: message.userId,
      firstName: message.user.firstName,
      lastName: message.user.lastName,
    };
  });
};

const getMessageById = async (id) => {
    return await models.Message.findByPk(id);
}

const createMessage = async (values) => {
    return await models.Message.create(values);
}

const updateMessage = async (message, values) => {
    return message.update(values);
}

const deleteMessage = async (message) => {
    await message.destroy();
}

module.exports = {
    getMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage,
}
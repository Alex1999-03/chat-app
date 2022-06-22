const { models } = require("../libs/sequelize");

const getUsers = async () => {
  return (await models.User.findAll()).map((user) => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  });
};

const getUserById = async (id) => {
    const user = await models.User.findByPk(id);
    delete user.dataValues.password;
    return user;
}

const updateUser = async (user, values) => {
    await user.update(values);
    delete user.dataValues.password;
    return user;
}

module.exports = {
    getUsers,
    getUserById,
    updateUser
}
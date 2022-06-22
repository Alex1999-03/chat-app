const MessagesController = require("./messages.controller");
const AuthController = require("./auth.controller");
const UserController = require("./user.controller");

function ConfigController(app) {
  app.use("/messages", MessagesController);
  app.use("/users", UserController);
  app.use("/auth", AuthController);
}

module.exports = ConfigController;

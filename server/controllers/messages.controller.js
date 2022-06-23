const { io } = require("../libs/socketio");
const passport = require("passport");
const {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
} = require("../services/message.service");
const { getUserById } = require("../services/user.service");
const {
  getMessageSchema,
  createMessageSchema,
  editMessageSchema,
} = require("../schemas/message.schema");
const validatorHandler = require("../middlewares/validator.handler");
const boom = require("@hapi/boom");
const express = require("express");
const router = express.Router();

router.get(
  "/",
  // passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      let messages = await getMessages();
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  validatorHandler(getMessageSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await getMessageById(id);
      if (!message) {
        boom.notFound("Message not found.");
      }
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createMessageSchema, "body"),
  async (req, res, next) => {
    try {
      let newMessage = await createMessage(req.body);
      const user = await getUserById(req.body.userId);
      newMessage = {
        id: newMessage.id,
        text: newMessage.text,
        createdAt: newMessage.createdAt,
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      io.socket.emit("message", newMessage);
      res.status(201).json(newMessage);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getMessageSchema, "params"),
  validatorHandler(editMessageSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      let editedMessage = await getMessageById(id);
      if (!editedMessage) {
        throw boom.notFound("Message not found.");
      }
      editedMessage = await updateMessage(editedMessage, req.body);
      res.status(200).json(editedMessage);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getMessageSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await getMessageById(id);
      if (!message) {
        throw boom.notFound("Message not found.");
      }
      await deleteMessage(message);
      res.status(200).json({ id: req.params.id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

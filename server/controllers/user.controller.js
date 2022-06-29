const {
  getUsers,
  getUserById,
  updateUser,
} = require("../services/user.service");
const { getUserSchema, editUserSchema } = require("../schemas/user.schema");
const validatorHandler = require("../middlewares/validator.handler");
const passport = require("passport");
const boom = require("@hapi/boom");
const express = require("express");
const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let users = await getUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      if (!user) {
        throw boom.notFound("El usuario no existe.");
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getUserSchema, "params"),
  validatorHandler(editUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      let user = await getUserById(id);
      if (!user) {
        throw boom.notFound("El usuario no existe.");
      }
      user = await updateUser(user, req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;

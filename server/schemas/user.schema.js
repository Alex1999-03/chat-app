const Joi = require("joi");

const id = Joi.number().integer();
const firstName = Joi.string()
  .pattern(/^[A-za-z\u00C0-\u00FF]+$/)
  .message("firstName must contain only letters")
  .min(4);
const lastName = Joi.string()
  .pattern(/^[A-za-z\u00C0-\u00FF]+$/)
  .message("lastName must contain only letters")
  .min(4);
const email = Joi.string().email();
const password = Joi.string().min(8);

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
});

const editUserSchema = Joi.object({
  firstName,
  lastName,
  email,
});

const changePasswordSchema = Joi.object({
  password: password.required(),
});

module.exports = {
  getUserSchema,
  createUserSchema,
  editUserSchema,
  changePasswordSchema,
};

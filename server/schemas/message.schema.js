const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const text = Joi.string().min(1).max(500);

const createMessageSchema = Joi.object({
    userId: userId.required(),
    text: text.required()
});

const editMessageSchema = Joi.object({
    userId: userId.required(),
    text: text.required()
});

const getMessageSchema = Joi.object({
    id: id.required()
});

module.exports = {
    createMessageSchema,
    editMessageSchema,
    getMessageSchema
}
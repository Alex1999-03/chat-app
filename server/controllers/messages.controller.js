const { io } = require('../libs/socketio');
const passport = require('passport');
const { models } = require('../libs/sequelize');
const { User } = require('../libs/sequelize/models/user.model');
const {
    getMessageSchema,
    createMessageSchema,
    editMessageSchema
} = require('../schemas/message.schema');
const validatorHandler = require('../middlewares/validator.handler');
const boom = require('@hapi/boom');
const express = require('express');
const router = express.Router();

router.get('/', 
// passport.authenticate('jwt', { session: false }),
async (req, res, next) => {
    try {
        let messages = await models.Message.findAll({
            order: [
                ['createdAt', 'ASC']
            ],
            include: [{
                model: User,
                as: "user"
            }]
        });
        messages = messages.map((message) => {
            return {
                id: message.id,
                text: message.text,
                createdAt: message.createdAt,
                userId: message.userId,
                firstName: message.user.firstName,
                lastName: message.user.lastName
            }
        });
        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getMessageSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const message = await models.Message.findByPk(id);
            if (!message) {
                boom.notFound('Message not found.');
            }
            res.status(200).json(message);
        } catch (error) {
            next(error)
        }
    });

router.post('/',
    validatorHandler(createMessageSchema, 'body'),
    async (req, res, next) => {
        try {
            let newMessage = await models.Message.create(req.body);
            const user = await models.User.findByPk(req.body.userId);
            newMessage = {
                id: newMessage.id,
                text: newMessage.text,
                createdAt: newMessage.createdAt,
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            }
            io.socket.emit('message', newMessage);
            res.status(201).json(newMessage);
        } catch (error) {
            next(error);
        }
    });

router.put('/:id',
    validatorHandler(getMessageSchema, 'params'),
    validatorHandler(editMessageSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const editedMessage = await models.Message.findByPk(id);
            if (!editedMessage) {
                throw boom.notFound('Message not found.');
            }
            editedMessage.update(req.body);
            res.status(200).json(editedMessage);
        } catch (error) {
            next(error);
        }
    });

router.delete('/:id',
    validatorHandler(getMessageSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const message = await models.Message.findByPk(id);
            if (!message) {
                throw boom.notFound('Message not found.');
            }
            message.destroy();
            res.status(200).json({ id: req.params.id })
        } catch (error) {
            next(error);
        }
    });

module.exports = router;
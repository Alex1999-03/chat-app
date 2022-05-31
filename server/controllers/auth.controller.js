const passport = require('passport');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcryptjs');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema } = require('../schemas/user.schema');
const express = require('express');
const router = express.Router();

const AuthService = require('../services/auth.service');
const service = new AuthService();


router.post('/register',
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const hashPassword = bcrypt.hashSync(req.body.password, 10);
            const user = {
                ...req.body,
                password: hashPassword
            };
            const newUser = await models.User.create(user);
            delete newUser.dataValues.password;
            res.status(201).json(service.signToken(newUser));
        } catch (error) {
            next(error);
        }
    });

router.post('/login', 
passport.authenticate('local', { session: false }),
async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json(service.signToken(user));
    } catch (error) {
        next(error);
    }
})

module.exports = router
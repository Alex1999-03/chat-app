const { ValidationError } = require('sequelize');

function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
}

function httpErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        return res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

function sequelizeErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(409).json({
            message: err.message,
            errors: err.errors
        });
    }
    next(err);
}



module.exports = {
    errorHandler,
    httpErrorHandler,
    sequelizeErrorHandler
}
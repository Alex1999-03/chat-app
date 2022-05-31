require('dotenv').config();

const APP_PORT = process.env.APP_PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
    APP_PORT,
    DATABASE_URL,
    JWT_SECRET
}
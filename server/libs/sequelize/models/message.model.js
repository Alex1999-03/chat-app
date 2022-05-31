const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const MESSAGE_TABLE = 'messages';

const MessageSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    text: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
}

class Message extends Model {

    static associate(models) {
        this.belongsTo(models.User, {
            as: 'user'
        })
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: MESSAGE_TABLE,
            modelName: 'Message',
            timestamps: false
        }
    }
}

module.exports = { Message, MessageSchema, MESSAGE_TABLE };
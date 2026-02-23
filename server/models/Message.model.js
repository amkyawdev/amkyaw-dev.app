const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const Message = sequelize.define('Message', {
    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    receiver_type: {
        type: DataTypes.ENUM('user', 'group'),
        allowNull: false
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'messages',
    timestamps: true,
    createdAt: 'sent_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            fields: ['receiver_type', 'receiver_id', 'sent_at']
        },
        {
            fields: ['sender_id', 'sent_at']
        }
    ]
});

module.exports = Message;

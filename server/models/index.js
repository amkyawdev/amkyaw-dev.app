const { sequelize } = require('../config/db.config');
const User = require('./User.model');
const Message = require('./Message.model');
const Group = require('./Group.model');
const GroupMember = require('./GroupMember.model');
const Friend = require('./Friend.model');
const MessageImage = require('./MessageImage.model');

// Define associations
User.hasMany(Message, { foreignKey: 'sender_id' });
Message.belongsTo(User, { foreignKey: 'sender_id' });

User.belongsToMany(User, {
    through: Friend,
    as: 'friends',
    foreignKey: 'user_id1',
    otherKey: 'user_id2'
});

Group.belongsTo(User, { foreignKey: 'created_by' });
Group.belongsToMany(User, { through: GroupMember, foreignKey: 'group_id' });
User.belongsToMany(Group, { through: GroupMember, foreignKey: 'user_id' });

Message.hasMany(MessageImage, { foreignKey: 'message_id', onDelete: 'CASCADE' });
MessageImage.belongsTo(Message, { foreignKey: 'message_id' });

module.exports = {
    sequelize,
    User,
    Message,
    Group,
    GroupMember,
    Friend,
    MessageImage
};

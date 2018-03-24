const constants = require('./constants')

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    receiverID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'senderID cannot be empty',
        },
        isNumeric: {
          msg: 'senderID must be an integer',
        },
      },
    },
    senderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'senderID cannot be empty',
        },
        isNumeric: {
          msg: 'senderID must be an integer',
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      set(val) {
        this.setDataValue('content', val.trim())
      },
      validate: {
        notEmpty: {
          msg: 'Message cannot be empty',
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: constants.SMS_STATUS_UNREAD,
      validate: {
        isIn: {
          args: [constants.SMS_STATUSES],
          msg: `SMS status must be one of ${constants.SMS_STATUSES.join(', ')}.`,
        },
      },
    },
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.Contact, { as: 'Senders', foreignKey: 'senderID', })
    Message.belongsTo(models.Contact, { as: 'Receivers', foreignKey: 'receiverID', })
  };
  return Message;
};

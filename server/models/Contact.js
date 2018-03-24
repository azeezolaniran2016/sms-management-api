'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First name cannot be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last name cannot be empty'
        }
      }
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Mobile number already registered'
      },
      validate: {
        notEmpty: {
          msg: 'Mobile number cannot be empty'
        }
      }
    }
  }, {});
  Contact.associate = function(models) {
    Contact.hasMany(models.Message, { as: 'Senders', foreignKey: 'senderID' })
    Contact.hasMany(models.Message, { as: 'Receivers', foreignKey: 'receiverID' })
  };
  return Contact;
};

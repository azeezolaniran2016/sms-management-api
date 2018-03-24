'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      receiverID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Contacts',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      senderID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Contacts',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages');
  }
};

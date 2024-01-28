'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("history_send_mails", "token_expiration", {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("history_send_mails", "token_expiration")
  }
};


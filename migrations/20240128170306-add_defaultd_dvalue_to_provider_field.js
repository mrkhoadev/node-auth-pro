'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'provider', {
      type: Sequelize.STRING,
      defaultValue: 'local', 
    });
  },
  down: async (queryInterface, Sequelize) => {
  }
};
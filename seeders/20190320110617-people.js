'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('people', [
      {
        first_name: 'Sara', last_name: 'Alawfi', created_at: new Date, updated_at: new Date
      },
      {
        first_name: 'Moroj', last_name: 'Alawfi', created_at: new Date, updated_at: new Date
      },
      {
        first_name: 'Alaa', last_name: 'Alawfi', created_at: new Date, updated_at: new Date
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('people', null, {});
  }
};

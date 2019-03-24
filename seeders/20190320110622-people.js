'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('people', [
      { first_name: 'Saja', last_name: 'ALi', created_at: new Date, updated_at: new Date },
      { first_name: 'Anfal', last_name: 'jafrai', created_at: new Date, updated_at: new Date },
      { first_name: 'Ghadeer', last_name: 'ALkhathlan', created_at: new Date, updated_at: new Date },
      { first_name: 'Me', last_name: 'Me', created_at: new Date, updated_at: new Date },
      { first_name: 'Usman', last_name: 'Bashir', created_at: new Date, updated_at: new Date }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('people', null, {});

  }
};

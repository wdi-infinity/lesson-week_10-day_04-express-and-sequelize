'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('people', [
      { first_name: 'Rawan', last_name: 'Alahmmadi', created_at: new Date, updated_at: new Date },
      { first_name: 'Rawan1', last_name: 'Alahmmadi', created_at: new Date, updated_at: new Date },
      { first_name: 'Rawan2', last_name: 'Alahmmadi', created_at: new Date, updated_at: new Date },
      { first_name: 'Rawan3', last_name: 'Alahmmadi', created_at: new Date, updated_at: new Date },
      { first_name: 'Rawan4', last_name: 'Alahmmadi', created_at: new Date, updated_at: new Date },
      { first_name: 'Rawan5', last_name: 'Alahmmadi', created_at: new Date, updated_at: new Date }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('people', null, {});

  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkInsert('people', [
      { first_name: 'fajer', last_name: 'saleh', created_at: new Date, updated_at: new Date },
      { first_name: 'fajer', last_name: 'saleh', created_at: new Date, updated_at: new Date },
      { first_name: 'fajer', last_name: 'saleh', created_at: new Date, updated_at: new Date },
      { first_name: 'fajer', last_name: 'saleh', created_at: new Date, updated_at: new Date }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('people', null, {});
  }
};

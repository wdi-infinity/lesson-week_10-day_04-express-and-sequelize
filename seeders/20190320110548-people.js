'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.    
      Example:

*/
    return queryInterface.bulkInsert('people', [
      { first_name: 'Hes', last_name: 'Aqeel', created_at: new Date, updated_at: new Date },
      { first_name: 'Hal', last_name: 'Maimoni', created_at: new Date, updated_at: new Date },
      { first_name: 'Sara', last_name: 'Yahya', created_at: new Date, updated_at: new Date },
      { first_name: 'Rawan', last_name: 'Ahmadi', created_at: new Date, updated_at: new Date }

    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('people', null, {});
  }
};

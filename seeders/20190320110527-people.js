'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('people', [
      { first_name: 'Usman', last_name: 'Bashir', created_at: new Date, updated_at: new Date },
      { first_name: 'Michael', last_name: 'Finneran', created_at: new Date, updated_at: new Date },
      { first_name: 'Ghadeer', last_name: 'Alkhathlan', created_at: new Date, updated_at: new Date },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('people', null, {});


  }
};

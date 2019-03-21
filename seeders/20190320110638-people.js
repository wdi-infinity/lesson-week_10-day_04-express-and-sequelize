'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */

    return queryInterface.bulkInsert('people', [
      { first_name: 'Nawaf', last_name: 'Moahmmed', created_at: new Date, updated_at: new Date },
      { first_name: 'jaser', last_name: 'yonis', created_at: new Date, updated_at: new Date },
      { first_name: 'Aser', last_name: 'yonis', created_at: new Date, updated_at: new Date },
      { first_name: 'Aser', last_name: 'yonis', created_at: new Date, updated_at: new Date }
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

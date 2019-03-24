'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('people', [
      {
        first_name: 'SARA', last_name: 'ALYAHYA', created_at: new Date, updated_at: new Date
      },
      {
        first_name: 'Hessa', last_name: 'ALAQIL', created_at: new Date, updated_at: new Date
      },
      {
        first_name: 'Fajer', last_name: 'ALBAKIRI', created_at: new Date, updated_at: new Date
      }
    ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('people', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('people', [
        { fist_name: 'Mohammed', last_name: 'Rashidi', created_at: new Date, updated_at: new Date },
        { fist_name: 'Michael', last_name: 'Finneran', created_at: new Date, updated_at: new Date },
        { fist_name: 'Ghadeer', last_name: 'Alkhathlan', created_at: new Date, updated_at: new Date },
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

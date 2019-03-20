'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('people', [
        { first_name: "Hala", last_name: "Almaimoni", created_at: new Date, updated_at: new Date },
        { first_name: "hessa", last_name: "Alaqeel", created_at: new Date, updated_at: new Date },
        { first_name: "sara", last_name: "alyahya", created_at: new Date, updated_at: new Date },
        { first_name: "abdullah", last_name: "alfehaid", created_at: new Date, updated_at: new Date }
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
     */
      Example:
      return queryInterface.bulkDelete('people', null, {});
    
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    
    */

   return queryInterface.bulkInsert('people', [
     {
      first_name: 'John',
      last_name: 'Doe',
      created_at: new Date , 
      updated_at:  new Date
  }], {});
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

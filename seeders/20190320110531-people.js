'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:

      return queryInterface.bulkInsert('people', [
       { first_name: 'ahmad', last_name: 'ali', created_at: new Date, updated_at: new Date},
       { first_name: 'abdullah', last_name: 'ahmad', created_at: new Date, updated_at: new Date},
       { first_name: 'saad', last_name: 'saud', created_at: new Date, updated_at: new Date},
       { first_name: 'mohammad', last_name: 'usman', created_at: new Date, updated_at: new Date}
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {

      
      return queryInterface.bulkDelete('people', null, {});
    
  }
};

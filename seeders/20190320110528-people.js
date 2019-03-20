'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('people', [
       {first_name:'Salem', last_name:'Turki', created_at: new Date, updated_at: new Date},
       {first_name:'Mohammad', last_name:'Jameel', created_at: new Date, updated_at: new Date},
       {first_name:'Usman', last_name:'Basheer', created_at: new Date, updated_at: new Date}
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

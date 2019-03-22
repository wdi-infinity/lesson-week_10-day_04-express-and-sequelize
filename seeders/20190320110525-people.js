'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkInsert('people', [
        { first_name: 'faraj' ,last_name:'jojat',created_at: new Date, updated_at: new Date},
        { first_name: 'defos' ,last_name:'cabor',created_at: new Date, updated_at: new Date},
        { first_name: 'dana' ,last_name:'dasan',created_at: new Date, updated_at: new Date}
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkDelete('people', null, {});
    
  }
};

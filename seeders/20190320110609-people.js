'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    //Add People Sequelize Model with Seed Data
    return queryInterface.bulkInsert('people', [
      {first_name:'C',last_name:'CA',created_at:new Date,updated_at:new Date},
      {first_name:'A',last_name:'AB',created_at:new Date,updated_at:new Date},
      {first_name:'B',last_name:'BA',created_at:new Date,updated_at:new Date}
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('people', null, {});
    
  }
};

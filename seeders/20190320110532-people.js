'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
     // Add altering commands here.
      //Return a promise to correctly handle asynchronicity.

    
      return queryInterface.bulkInsert('people', [
      
      {first_name:'Majeed',last_name:'ALamoi',created_at:new Date,updated_at:new Date },
      {first_name:'Majd',last_name:'ALamoi',created_at:new Date,updated_at:new Date },
      {first_name:'MUSAED',last_name:'Bahazeq',created_at:new Date,updated_at:new Date }

    ],{});
  },

  down: (queryInterface, Sequelize) => {
    
     // Add reverting commands here.
     // Return a promise to correctly handle asynchronicity.

      
      return queryInterface.bulkDelete('people', null, {});
    
  }
};

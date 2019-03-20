'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('people', [
      {first_name: 'saud', last_name: 'almutairi', created_at: new Date, updated_at: new Date},
      {first_name: 'ahmed', last_name: 'alqhtani', created_at: new Date, updated_at: new Date},
      {first_name: 'nors', last_name: 'abdullah', created_at: new Date, updated_at: new Date}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('people',null,{})
  }
};

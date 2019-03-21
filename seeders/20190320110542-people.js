'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    //   return queryInterface.bulkInsert('people', [
    //     {first_name: 'John Doe',last_name: 'Alsharhan', created_at: new Date, updated_at: new Date},
    //     {first_name: 'Abdulmohsin',last_name: 'Alqhtani', created_at: new Date, updated_at: new Date},
    //     {first_name: 'Dummy',last_name: 'Dummy', created_at: new Date, updated_at: new Date},
    //     {first_name: 'Another name',last_name: 'last name', created_at: new Date, updated_at: new Date}
    // ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkDelete('people', null, {});
    
  }
};

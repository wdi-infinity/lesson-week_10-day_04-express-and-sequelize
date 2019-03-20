'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('people', [
        { first_name: 'Ahmad', last_name: 'Yaseen', created_at: new Date, updated_at: new Date },
        { first_name: 'Abdulrahman', last_name: 'Alibrahim', created_at: new Date, updated_at: new Date },
        { first_name: 'Usman', last_name: 'Bashir', created_at: new Date, updated_at: new Date },
        { first_name: 'Micheal', last_name: 'Finneran', created_at: new Date, updated_at: new Date },
        { first_name: 'Ghadeer', last_name: 'Alkhathlan', created_at: new Date, updated_at: new Date },
        { first_name: 'Saja', last_name: 'Alghadi', created_at: new Date, updated_at: new Date },
        { first_name: 'Ahmad', last_name: 'Alghahtani', created_at: new Date, updated_at: new Date }
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

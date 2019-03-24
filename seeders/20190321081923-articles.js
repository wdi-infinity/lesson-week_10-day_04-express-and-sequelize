'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
         return queryInterface.bulkInsert('articles', [{
        title: 'Hello World!',
        content: 'This is a test article',
        created_at: new Date,
        updated_at: new Date
      }], { tableName: "articles" });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

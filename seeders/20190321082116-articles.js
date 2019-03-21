'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:  */
      return queryInterface.bulkInsert('articles', [{
        title: 'title',
        content: 'tyrtytht',
        updated_at: new Date,
        created_at: new Date,

      }], {});
  
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:   */
      return queryInterface.bulkDelete('articles', null, {});
 
  }
};

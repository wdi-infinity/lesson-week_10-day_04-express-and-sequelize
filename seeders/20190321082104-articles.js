'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('articles', [{
        title: 'Hello World',
        content: 'test',
        created_at: new Date,
        updated_at: new Date
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
  

    
      return queryInterface.bulkDelete(articles, null, {});
    
  }
};

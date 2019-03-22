"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "people",
      [
        {
          first_name: "Ayman",
          last_name: "Faisal",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: "Abdullah",
          last_name: "Alfehaid",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: "Yasser",
          last_name: "Faisal",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("people", null, {});
  }
};

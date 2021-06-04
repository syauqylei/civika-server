"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Classes", [
      {
        LectureId: 1,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        LectureId: 1,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        LectureId: 2,
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        LectureId: 2,
        UserId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        LectureId: 3,
        UserId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        LectureId: 3,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Classes");
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

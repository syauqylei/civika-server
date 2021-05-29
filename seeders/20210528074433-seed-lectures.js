"use strict";

const fs = require("fs");
const data = fs.readFileSync("./db.json", "utf8");
const dataParsed = JSON.parse(data);
const lectures = dataParsed.lecture;
lectures.forEach((el) => {
  delete el.id;
  el.createdAt = new Date();
  el.updatedAt = new Date();
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Lectures", lectures);
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
    await queryInterface.bulkDelete("Lectures");
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

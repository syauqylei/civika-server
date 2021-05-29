"use strict";
const fs = require("fs");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(8);
const data = fs.readFileSync("./db.json", "utf8");
const dataParsed = JSON.parse(data);
const users = dataParsed.user;

users.forEach((el) => {
  delete el.id;
  el.password = bcrypt.hashSync(el.password, salt);
  el.createdAt = new Date();
  el.updatedAt = new Date();
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", users);
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
    await queryInterface.bulkDelete("Users");
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

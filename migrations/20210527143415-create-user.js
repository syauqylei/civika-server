"use strict";
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            fullName: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            birthdate: {
                type: Sequelize.DATEONLY,
            },
            ipk: {
                type: Sequelize.DOUBLE,
            },
            password: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            sks: {
                type: Sequelize.INTEGER,
            },
            ukt: {
                type: Sequelize.INTEGER,
            },
            uktStatus: {
                type: Sequelize.BOOLEAN,
            },
            role: {
                type: Sequelize.STRING,
            },
            phoneNumber: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("Users");
    },
};
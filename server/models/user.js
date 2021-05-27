"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Lecture);
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      birthdate: DataTypes.DATEONLY,
      ipk: DataTypes.DOUBLE,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      sks: DataTypes.INTEGER,
      ukt: DataTypes.INTEGER,
      uktStatus: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};


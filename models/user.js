"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Lecture, { through: models.Class });
      User.hasMany(models.Class);
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      address: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Alamat tidak boleh kosong",
          },
        },
      },
      birthdate: DataTypes.DATEONLY,
      phoneNumber: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Nomor telepon tidak boleh kosong",
          },
        },
      },
      ipk: DataTypes.DOUBLE,
      password: {
        type: DataTypes.STRING,
        validate: {
          is6More(value) {
            if (value.length < 8) {
              new Error("Kata sandi minimal memiliki 8 karakter");
            }
          },
          notEmpty: { msg: "Kata sandi tidak boleh kosong" },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "Isian harus berupa email",
          },
          notEmpty: {
            msg: "Harus berupa email",
          },
        },
      },
      sks: DataTypes.INTEGER,
      ukt: DataTypes.INTEGER,
      uktStatus: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = hash(instance.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

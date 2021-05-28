const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { encrypt } = require("../helpers/jwt");

class UserControllers {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const foundUser = await User.findAll({
        where: {
          email: email,
        },
      });
      if (foundUser) {
        const comparePass = compare(pass, foundUser.password);
        if (comparePass) {
          const access_token = encrypt({
            id: foundUser.id,
            email: foundUser.email,
          });
          res.status(200).json({ access_token });
        } else {
          next({ name: "error_login", message: "email atau password salah" });
        }
      } else {
        next({ name: "error_login", message: "email atau password salah" });
      }
    } catch (err) {
      next(err);
    }
  }
  static async getAll(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
  static async getById(req, res, next) {
    const id = +req.params.id;
    try {
      const user = await User.findByPk({
        where: {
          id: id,
        },
      });
      if (user) {
        res.status(200).json(user);
      } else {
        next({ name: "error_user", message: "pengguna tidak ditemukan" });
      }
    } catch (err) {
      next(err);
    }
  }
  static async editUser(req, res, next) {
    const id = +req.params.id;
    try {
      const foundUser = await User.findByPk({
        where: {
          id: id,
        },
      });
      if (foundUser) {
        res.status(200).json(foundUser);
      } else {
        next({ name: "error_user", message: "pengguna tidak ditemukan" });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserControllers;

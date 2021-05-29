const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { encrypt } = require("../helpers/jwt");
const payment = require("../helpers/duitku");

class UserControllers {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const foundUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (foundUser) {
        const comparePass = compare(password, foundUser.password);
        if (comparePass) {
          const access_token = encrypt({
            id: foundUser.id,
            email: foundUser.email,
          });
          res.status(200).json({ access_token });
        } else {
          next({ name: "error_login", message: "email atau kata sandi salah" });
        }
      } else {
        next({ name: "error_login", message: "email atau kata sandi salah" });
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
      const user = await User.findByPk(id);
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
    const id = +req.query.id;
    try {
      const foundUser = await User.findByPk(id);
      // if (foundUser) {
      await User.update(req.body, {
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: "data pengguna telah diupdate" });
    } catch (err) {
      next(err);
    }
  }

  static async payTuition(req, res, next) {}
}

module.exports = UserControllers;

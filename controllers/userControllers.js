const { User, Class, Lecture } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { encrypt } = require("../helpers/jwt");
const { Expo } = require("expo-server-sdk");
const payment = require("../helpers/duitku");
const db = require("../firestore");
const notif = db.collection("notification");

class UserControllers {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const foundUser = await User.findOne({
        where: {
          email: email,
        },
        include: {
          model: Class,
          include: [Lecture],
        },
      });
      if (foundUser) {
        const comparePass = compare(password, foundUser.password);
        if (comparePass) {
          const access_token = encrypt({
            id: foundUser.id,
            email: foundUser.email,
          });
          res
            .status(200)
            .json({ access_token, userId: foundUser.id, foundUser });
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

  static async forwardToDuitku(req, res, next) {
    const id = req.loggedUser.id;
    try {
      const user = await User.findByPk(id);
      let pay = await payment(user.ukt, req.body.method);
      res.status(201).json(pay);
    } catch (err) {
      next(err);
    }
  }

  static async uktStatus(req, res, next) {
    const id = req.loggedUser.id;
    try {
      const foundUser = await User.findByPk(id);
      if (foundUser.uktStatus) {
        next({ name: "err_ukt", message: "Ukt sudah dibayar" });
      } else {
        await User.update(
          {
            uktStatus: true,
          },
          {
            where: {
              id: id,
            },
          }
        );
        res.status(200).json({ message: "Ukt telah dibayar" });
      }
    } catch (err) {
      next(err);
    }
  }
  static async pushNotifExpo(req, res, next) {
    const { title, message, pushToken } = req.body.pushToken;
    let expo = new Expo();
    let messages = [];
    try {
      for (let token of pushToken) {
        if (!Expo.isExpoPushToken(token)) {
          console.log("invalid Expo pushToken");
          continue;
        }
        messages.push({
          to: token,
          title: title,
          body: message,
        });
      }
      for (let chunk of chunks) {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getAnouncement(req, res, next) {
    try {
      const snapshot = await notif.get();
      const notification = [];
      snapshot.forEach((doc) => {
        const id = doc.id;
        const { message, title } = doc.data();
        const data = {
          id,
          message,
          title,
        };
        notification.push(data);
      });
      res.send(notification);
    } catch (error) {
      next(error);
    }
  }

  static async addAnnouncement(req, res, next) {
    const { teacher, title, message } = req.body;
    const data = { teacher, title, message };
    try {
      await notif.add(data);
      res.status(200);
    } catch (error) {
      next(error);
    }
  }

  static async deleteAnnouncement(req, res, next) {
    const { id } = req.params;
    try {
      await notif.doc(id).delete();
      res.status(200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserControllers;

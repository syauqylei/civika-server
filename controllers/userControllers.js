const { User, Class, Lecture } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { encrypt } = require("../helpers/jwt");
const { Expo } = require("expo-server-sdk");
const payment = require("../helpers/duitku");
const db = require("../firestore");
const announce = db.collection("announcement");
const dataPushNotif = db.collection("dataUserLogin");
const fetch = require("node-fetch");

class UserControllers {
  static async login(req, res, next) {
    const { email, password, pushToken } = req.body;
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
          // await dataPushNotif.add({ pushToken });
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

  static async getAnouncement(req, res, next) {
    try {
      const snapshot = await announce.get();
      const notification = [];
      snapshot.forEach((doc) => {
        const id = doc.id;
        const { message, title, teacher } = doc.data();
        const data = {
          id,
          message,
          title,
          teacher,
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
    const snapshotToken = await dataPushNotif.get();
    const data = { teacher, title, message };
    try {
      //! For add data to firestore
      let announcementPosted = await announce.add(data);

      //! For push notification to user if users is login
      snapshotToken.forEach((token) => {
        const { pushToken } = token.data();
        const messageToPushNotif = {
          to: pushToken,
          title,
          body: message,
          data: { data: "ini data" },
        };

        fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
            "cache-control": "no-cache",
          },
          body: JSON.stringify(messageToPushNotif),
        });

        res.status(200).json({
          id: announcementPosted.id,
          message: "Pengumuman berhasil dikirim",
        });
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAnnouncement(req, res, next) {
    const { id } = req.params;
    try {
      await announce.doc(id).delete();
      res.status(200).json({ message: "Pengumuman berhasil dihapus" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserControllers;

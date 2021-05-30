const { Class, Lecture, User } = require("../models");

class ClassControllers {
  static async getAll(req, res, next) {
    try {
      const classes = await Class.findAll({
        include: [Lecture, User],
      });
      res.status(200).json(classes);
    } catch (err) {
      next(err);
    }
  }
  static async getById(req, res, next) {
    const id = +req.params.id;
    try {
      const foundClass = await Class.findOne({
        where: { id },
        include: [Lecture, User],
      });
      if (foundClass) {
        res.status(200).json(foundClass);
      } else {
        next({ name: "error_getById", message: "kelas tidak ditemukan" });
      }
    } catch (err) {
      next(err);
    }
  }
  static async getByLectureId(req, res, next) {
    const id = +req.params.id;
    try {
      const foundClass = await Class.findAll({
        where: { lectureId: id },
        include: [Lecture, User],
      });
      if (foundClass) {
        res.status(200).json(foundClass);
      } else {
        next({ name: "error_getById", message: "kelas tidak ditemukan" });
      }
    } catch (err) {
      next(err);
    }
  }
  static async getByUserId(req, res, next) {
    const id = +req.params.id;
    try {
      const foundClass = await Class.findAll({
        where: { userId: id },
        include: [Lecture, User],
      });
      if (foundClass) {
        res.status(200).json(foundClass);
      } else {
        next({ name: "error_getById", message: "kelas tidak ditemukan" });
      }
    } catch (err) {
      next(err);
    }
  }
  static async addClass(req, res, next) {
    const { lectureId } = req.body;
    const userId = req.loggedUser.id;
    try {
      const pickedLectured = await Lecture.findByPk(lectureId);
      const listClass = await Class.findAll({
        where: {
          userId: userId,
        },
      });
      if (listClass.length < pickedLectured.quota) {
        const newClass = await Class.create({
          userId: userId,
          lectureId: lectureId,
        });
        res
          .status(201)
          .json({ message: "Kuliah telah dibuat", id: newClass.id });
      } else {
        next({
          name: "error_quota",
          message: "batas kuota kelas telah mencapai maksimum",
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async rmClass(req, res, next) {
    const id = +req.params.id;
    const userId = req.loggedUser.id;
    try {
      const foundClass = await Class.findByPk(id);
      if (foundClass) {
        if (foundClass.userId === userId) {
          await Class.destroy({
            where: {
              id: id,
            },
          });
          res.status(200).json({ message: "Kelas telah dihapus" });
        } else {
          next({ name: "error_authUserDelete", message: "Unauthorized" });
        }
      } else {
        next({ name: "error_rmClass", message: "Kelas tidak ditemukan" });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ClassControllers;

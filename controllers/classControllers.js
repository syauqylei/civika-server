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
      const foundClass = await Class.findByPk(id);
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
    const { userId, lectureId } = req.body;
    try {
      const pickedLectured = await Lecture.findByPk(lectureId);
      const listClass = await Class.findAll({
        where: {
          userId: userId,
        },
      });
      console.log(pickedLectured.quota, listClass.length);
      if (listClass.length <= pickedLectured.quota) {
        await Class.create({
          userId: userId,
          lectureId: lectureId,
        });
        res.status(201).json({ message: "Kuliah telah dibuat" });
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
    try {
      const foundClass = await Class.findByPk(id);

      if (foundClass) {
        await Class.destroy({
          where: {
            id: id,
          },
        });
        res.status(200).json({ message: "Kelas telah dihapus" });
      } else {
        next({ name: "error_rmClass", message: "Kelas tidak ditemukan" });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ClassControllers;

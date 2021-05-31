const { Lecture, Class } = require("../models");

class LecturesControllers {
    static async getAll(req, res, next) {
        try {
            const lectures = await Lecture.findAll();
            res.status(200).json(lectures);
        } catch (err) {
            next(err);
        }
    }
    static async getById(req, res, next) {
        const id = +req.params.id;
        try {
            const lecture = await Lecture.findByPk(id);
            if (lecture) {
                res.status(200).json(lecture);
            } else {
                next({ name: "error_getById", message: "Kuliah tidak ditemukan" });
            }
        } catch (err) {
            next(err);
        }
    }








}

module.exports = LecturesControllers;
const { Class } = require("../models");

class ClassControllers {
  static async getAll(req, res, next) {
    try {
      const classes = await Class.findAll();
      res.status(200).json(classes);
    } catch (err) {
      next(err);
    }
  }
  static getById(req, res, next) {
    const id = +req.params.id
    try {
      const foundClass =  await Class.findByPk( {
        where: {
          id: id
        }
      } )
      if (foundClass) { 
        res.status(200).json(foundClass)
      } else {
        next({ name: "error_getById", message: "class not found" })
      }
    } catch(err) {
      next(err)
    }
  }
  static addClass(req, res, next) {
    const { userId, lectureId } = req.body
    try{
      const createdClass = await Class.create({
        userId, lectureId
      })
    } catch (err) {
      next(err)
    }
  }
  static rmClass(req, res, next) {
    const id = +req.params.id
    try {
      const deleted = await Class.destroy({
        where: {
          id: id
        }
      })
    } catch(err) { next(err)
    }
  }
  static editClass(req, res, next) {}
}

module.exports = ClassControllers;

const router = require("express").Router();
const ClassControllers = require("../controllers/classControllers.js");

router.get("/class", ClassControllers.getAll);
router.post("/class/", ClassControllers.addClass);
router.get("/class/:id", ClassControllers.getById);
router.get("/class/user/:id", ClassControllers.getByUserId);
router.get("/class/lecture/:id", ClassControllers.getByLectureId);
router.delete("/class/:id", ClassControllers.rmClass);
router.post("/classes", ClassControllers.addClasses)
router.get("/krs", ClassControllers.filterKrs)

module.exports = router;
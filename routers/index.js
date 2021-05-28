const router = require("express").Router();
const UserRouter = require("./userRouters");
const LectureRouter = require("./LectureRouter");
const UserRouter = require("./ClassRouter");

router.use("/user", UserRouter);
router.use("/lecture", LectureRouter);
router.use("/class", ClassRouter);
//router.post("/login", UserController.login);
//router.get("/lecture", LecturesController.getAll);
//router.get("/lecture/:id", LecturesController.getById);
//router.put("/lecture/:id", LecturerController.updateById);
//router.delete("/lecture/:id", LecturerController.removeById);

module.exports = router;

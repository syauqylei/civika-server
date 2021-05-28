const router = require("express").Router();
const UserRouter = require("./userRouters");
const LectureRouter = require("./lectureRouters");
const ClassRouter = require("./classRouters");

router.use("/", UserRouter);
router.use("/", LectureRouter);
router.use("/", ClassRouter);

module.exports = router;

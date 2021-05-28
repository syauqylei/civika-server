const router = require("express").Router();
const UserRouter = require("./userRouters");
const LectureRouter = require("./lectureRouters");
const ClassRouter = require("./classRouters");
const {
  authentication,
  authorizationUserEdit,
} = require("../middlewares/auth");

router.use(authentication);
router.use("/", authorizationUserEdit, UserRouter);
router.use("/", LectureRouter);
router.use("/", ClassRouter);

module.exports = router;

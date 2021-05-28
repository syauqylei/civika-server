const router = require("express").Router();
const lectureControllers = require("../controllers/lectureControllers");

router.get("/lectures", lectureControllers.getAll);

module.exports = router;

const router = require("express").Router();
const lectureControllers = require("../controllers/lectureControllers");

router.get("/lectures", lectureControllers.getAll);
router.get("/lectures/:id", lectureControllers.getById);

module.exports = router;
const router = require("express").Router();
const LecturesRouter = require("../controllers/LecturesController.js");

router.get("/", LecturesController.getAll);

module.exports = router;

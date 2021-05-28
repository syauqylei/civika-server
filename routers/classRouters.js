const router = require("express").Router();
const ClassControllers = require("../controllers/classControllers.js");

router.get("/", ClassControllers.getAll);

module.exports = router;

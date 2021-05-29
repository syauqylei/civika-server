const router = require("express").Router();
const ClassControllers = require("../controllers/classControllers.js");



router.get("/class", ClassControllers.getAll);
router.post("/class/", ClassControllers.addClass);
router.get("/class/:id", ClassControllers.getById);
router.delete("/class/:id", ClassControllers.rmClass);

module.exports = router;

const router = require("express").Router();
const ClassControllers = require("../controllers/classControllers.js");

router.get("/class", ClassControllers.getAll);
router.get("/class/:id", ClassControllers.getById);
router.post("/class/:id", ClassControllers.addClass);
router.delete("/class/:id", ClassControllers.rmClass);

module.exports = router;

const router = require("express").Router();
const ClassControllers = require("../controllers/classControllers.js");

router.get("/class", ClassControllers.getAll);
router.get("/class/:id", ClassControllers.getAll);
router.post("/class/:id", ClassControllers.getAll);
router.put("/class/:id", ClassControllers.getAll);
router.delete("/class/:id", ClassControllers.getAll);

module.exports = router;

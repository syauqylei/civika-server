const router = require("express").Router();
const UserControllers = require("../controllers/userControllers.js");

router.get("/users", UserControllers.getAll);
router.get("/users/:id", UserControllers.getById);
router.put("/users/:id", UserControllers.editUser);
router.post("/login", UserControllers.login);
module.exports = router;

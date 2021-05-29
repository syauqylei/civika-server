const router = require("express").Router();
const UserControllers = require("../controllers/userControllers.js");
const {
  authentication,
  authorizationUserEdit,
} = require("../middlewares/auth");

router.post("/login", UserControllers.login);
router.use(authentication);
router.get("/users", UserControllers.getAll);
router.get("/users/:id", UserControllers.getById);
router.put("/users/edit", authorizationUserEdit, UserControllers.editUser);
//router.post("/users/:id/payTuition")
module.exports = router;

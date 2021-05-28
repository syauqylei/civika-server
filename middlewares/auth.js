const { User } = require("../models");
const { decrypt } = require("../helpers/bcrypt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (access_token) {
      const decrypted = decrypt(access_token);
      const foundUser = await User.findOne({
        where: {
          id: decrypted.id,
        },
      });
      if (foundUser) {
        req.loggedUser = {
          id: decrypted.id,
          email: decrypted.email,
        };
        next();
      } else {
        next({ name: "authentication", message: "User is not found" });
      }
    } else {
      next({ name: "authentication", message: "You must login first" });
    }
  } catch (err) {
    next(err);
  }
};

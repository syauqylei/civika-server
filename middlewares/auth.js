const { User } = require("../models");
const { decrypt } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  console.log(req.headers);
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

const authorizationUserEdit = async (req, res, next) => {
  const { access_token } = req.headers;
  const decrypted = decrypt(access_token);
  const userId = decrypted.id;
  const id = +req.query.id;
  const isSame = id === userId;

  if (isSame) {
    next();
  } else {
    next({ name: "error_authUserEdit", message: "Unauthorize" });
  }
};

module.exports = {
  authentication,
  authorizationUserEdit,
};

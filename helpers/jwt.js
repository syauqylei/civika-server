const jwt = require("jsonwebtoken");

const encrypt = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY);
};

const decrypt = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = {
  encrypt,
  decrypt,
};

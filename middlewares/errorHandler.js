const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "error_login":
    case "error_quota":
    case "err_ukt":
      res.status(400).json({ message: err.message });
      break;
    case "SequelizeValidationError":
      let error = [];
      let splittedError = err.message.split(",\n");
      splittedError.forEach((el) => {
        let result = el.substring(18, el.length);
        error.push(result);
      });
      res.status(400).json({ message: error });
      break;
    case "authentication":
    case "error_authUserEdit":
    case "error_authUserDelete":
      res.status(401).json({ message: err.message });
      break;
    case "error_user":
    case "error_getById":
    case "error_rmClass":
      res.status(404).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

module.exports = errorHandler;

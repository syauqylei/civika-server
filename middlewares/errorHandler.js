const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "error_login":
    case "error_quora":
    case "SequelizeValidationError":
      res.status(400).json({ message: err.message });
      break;
    case "authentication":
      res.status(401).json({ message: err.message });
      break;
    case "error_user":
    case "error_getById":
    case "error_rmClass":
      res.status(404).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandler;

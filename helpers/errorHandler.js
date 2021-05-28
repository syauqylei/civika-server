const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    default:
      res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandler;

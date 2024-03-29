const errorHandle = (err, req, res, next) => {
  err.status = err.status || 500;
  //handle error sequelize
  if (err.name === "SequelizeUniqueConstraintError") {
    if (err.original.sqlState === "23000") {
      err.status = 400;
      err.message = err.original.sqlMessage;
    }
  }

  //res to client
  res.status(err.status).json({
    error: {
      status: "fail",
      message: err.message,
    },
  });
};

module.exports = errorHandle;

function handleError() {
  return (error, req, res, next) => {
    //  TODO: error handle better
    res.status(error.status || 500);
    res.json({
      status: error.status,
      message: error.message,
    });
  };
}

module.exports = handleError;

function sendError(statusCode, message, catchError) {
  return (req, res, next) => {
    const error = new Error(message);
    error.status = statusCode;
    if (catchError) {
      error.catchError = catchError;
    }
    next(error);
  };
}

module.exports = sendError;

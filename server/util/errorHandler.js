const logger = require('./loggerWrapper');

function handleError() {
  return (error, req, res, next) => {
    logger.log(error, 'error');
    if (error.name === 'UnauthorizedError') {
      return res.status(401).json({
        status: 401,
        message: error.message,
      });
    }
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.resMessage || 'Unexpected Error',
    });
  };
}

module.exports = handleError;

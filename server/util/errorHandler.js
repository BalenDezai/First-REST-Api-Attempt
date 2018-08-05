const logger = require('./loggerWrapper');

function handleError() {
  return (error, req, res, next) => {
    logger.log(error, 'error');
    const status = res.status || 500;
    const resMessage = res.resMessage || 'Error proccessing the request';
    if (error.name === 'UnauthorizedError') {
      return res.status(401).json({
        status: 401,
        message: error.message,
      });
    }
    return res.status(status).json({
      status,
      message: resMessage,
    });
  };
}

module.exports = handleError;

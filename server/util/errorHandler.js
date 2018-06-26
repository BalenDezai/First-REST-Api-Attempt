const logger = require('./loggerWrapper');

function handleError() {
  return (error, req, res, next) => {
    //  TODO: error handle better
    logger.log(error, 'error');
    res.status(error.status || 500);
    res.json({
      status: error.status || 500,
      message: error.resMessage || 'Unexpected Error',
    });
  };
}

module.exports = handleError;

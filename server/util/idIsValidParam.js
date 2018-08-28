const { isValid } = require('mongoose').Types.ObjectId;

function idisValidParam(req, res, next) {
  //  make sure user put req.params.id is avalid mongoose object
  if (!isValid(req.params.id)) {
    const error = new Error();
    error.status = 404;
    error.resMessage = 'Invalid ID';
    next(error);
  }
  next();
}

module.exports = idisValidParam;

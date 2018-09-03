const { isValid } = require('mongoose').Types.ObjectId;

function idisValidParam(...params) {
  //  make sure user put req.params.id is avalid mongoose object
  return new Promise((resolve, reject) => {
    for (let i = 0; i < params.length; i += 1) {
      if (!isValid(params[i])) {
        reject(new Error('Invalid mongoose ID'));
      }
    }
    resolve();
  });
}

const paramHandler = params => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    await idisValidParam(...boundParams);
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = paramHandler;

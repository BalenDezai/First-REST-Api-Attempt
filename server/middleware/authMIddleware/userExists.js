const User = require('../../api/user/userModel');

function userExists() {
  return async (req, res, next) => {
    try {
      const [foundUser, foundEmail] = Promise.all([
        User.findOne({ username: req.body.username }).lean(),
        User.findOne({ email: req.body.email }).lean(),
      ]);
      if (foundUser) {
        return res.status(409).json({
          status: 409,
          message: 'Username already exists',
        });
      }
      if (foundEmail) {
        return res.status(409).json({
          status: 409,
          message: 'Email already exists',
        });
      }
      return next();
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error processing the request';
      return next(error);
    }
  };
}

module.exports = userExists;

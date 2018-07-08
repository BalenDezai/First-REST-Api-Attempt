function verifyFields() {
  return async (req, res, next) => {
    if (!req.body.username) {
      return res.status(400).json({
        status: 400,
        message: 'Username field must not be empty',
      });
    }
    if (!req.body.email) {
      return res.status(400).json({
        status: 400,
        message: 'email field must not be empty',
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
        status: 400,
        message: 'password field must not be empty',
      });
    }
    return next();
  };
}

module.exports = verifyFields;

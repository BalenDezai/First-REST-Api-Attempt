const User = require('../../api/user/userModel');

function getFullUser() {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      if (!user) {
        return res.status(401).json({
          status: 401,
          message: 'Authorization Failed',
        });
      }
      user.SetUpHyperLinks(req.headers.host, req.originalUrl);
      req.user = user.removePassword();
      return next();
    } catch (error) {
      error.status = 401;
      error.message = 'Authorization Failed';
      return next(error);
    }
  };
}

module.exports = getFullUser;

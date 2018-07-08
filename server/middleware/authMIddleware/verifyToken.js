const expressJwt = require('express-jwt');
const config = require('../../config/config');

const checkToken = expressJwt({ secret: config.jwt.secret });

function verifyToken() {
  return async (req, res, next) => {
    //  in case the token is in the body
    //  set it back to the authorization header
    if (req.query && Object.prototype.hasOwnProperty.call(req.query, 'access_token')) {
      req.headers.authorization = `Bearer ${req.query.access_token}`;
    }
    if (!req.headers.authorization) {
      res.status(401).json({
        status: 401,
        message: 'No token was found',
      });
    } else {
      checkToken(req, res, next);
    }
  };
}

module.exports = verifyToken;

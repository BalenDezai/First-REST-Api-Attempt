function verifyContentType() {
  return (req, res, next) => {
    if (!req.accepts('application/json')) {
      res.status(406).json({
        status: 406,
        message: 'Not Acceptable',
      });
    }
    next();
  };
}

module.exports = verifyContentType;

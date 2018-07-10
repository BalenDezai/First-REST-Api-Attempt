function verifyRole() {
  return async (req, res, next) => {
    if (req.user.role === 'Master Administrator') {
      return next();
    } else if (req.user.role === 'Administrative') {
      return next();
    }
    return res.status(403).json({
      status: 403,
      message: 'Not authorized to perform this action',
    });
  };
}

module.exports = verifyRole;

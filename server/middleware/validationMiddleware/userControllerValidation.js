const { body } = require('express-validator/check');

exports.createFields = [
  body('username', 'Must specify a valid username').exists().isString(),
  body('email', 'Must specify a valid email').exists().isString().isEmail(),
  body('role', 'Must specify a valid role').isString().custom((value) => {
    const check = ['employee', 'administrator', 'master administrator'];
    return check.includes(value.toLowerString());
  }),
  body('password', 'Must specify a valid string').exists().isString(),
];

exports.updateFields = [
  body('username', 'Must specify a valid username').isString(),
  body('email', 'Must specify a valid email').isString().isEmail(),
  body('role', 'Must specify a valid role').isString(),
  body('password', 'Must specify a valid string').isString(),
];

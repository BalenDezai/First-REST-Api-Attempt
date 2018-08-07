const { body } = require('express-validator/check');

exports.createFields = [
  body('username')
    .exists().withMessage('username must not be empty')
    .isString().withMessage('username must be a string'),

  body('email')
    .exists().withMessage('email must not be empty')
    .isString().withMessage('email mus be a string')
    .isEmail().withMessage('email must be a valid email'),

  body('role', 'Must specify a valid role')
    .isString().withMessage('role must be a string')
    .custom((value) => {
      const check = ['employee', 'administrator', 'master administrator'];
      return check.includes(value.toLowerCase());
    })
    .withMessage('role must be a valid role'),

  body('password', 'Must specify a valid string')
    .exists().withMessage('password must not be empty')
    .isString().withMessage('password must be a string'),
];

exports.updateFields = [
  body('username')
    .isString().withMessage('username must be a string')
    .optional(),

  body('email')
    .isString().withMessage('email mus be a string')
    .isEmail().withMessage('email must be a valid email')
    .optional(),

  body('role')
    .isString().withMessage('role must be a string')
    .custom((value) => {
      const check = ['employee', 'administrator', 'master administrator'];
      return check.includes(value.toLowerCase());
    })
    .withMessage('role must be a valid role')
    .optional(),

  body('password')
    .isString().withMessage('password must be a string')
    .optional(),
];

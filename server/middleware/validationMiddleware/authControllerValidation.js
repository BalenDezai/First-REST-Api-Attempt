const { body } = require('express-validator/check');

exports.registrationFields = [
  body('username')
    .exists().withMessage('username must not be empty')
    .isString().withMessage('username must be a string'),

  body('email')
    .exists().withMessage('email must not be empty')
    .isString().withMessage('email must be a string')
    .isEmail().withMessage('email must be a valid email'),

  body('role')
    .isString().withMessage('role must be a string')
    .custom((value) => {
      const check = ['employee', 'administrator', 'master administrator'];
      return check.includes(value.toLowerCase());
    })
    .withMessage('must be a valid role'),

  body('password')
    .exists().withMessage('password must not be empty')
    .isString().withMessage('password must be a string'),
];

exports.signinFields = [
  body('username')
    .exists().withMessage('username must not be empty')
    .isString().withMessage('username must be a string'),


  body('password')
    .exists().withMessage('password must not be empty')
    .isString().withMessage('password must be a string'),
];

exports.updateFields = [
  body('username')
    .isString().withMessage('username must be a string')
    .withMessage('username already exists')
    .optional(),

  body('email')
    .isString().withMessage('email must be a string')
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

const { body } = require('express-validator/check');

exports.updateFields = [
  body('jobTitle')
    .isString().withMessage('jobTitle must be a string')
    .optional(),

  body('description')
    .isString().withMessage('description must be a string')
    .optional(),

  body('_Owner')
    .isEmpty().withMessage('_Owner must be empty'),
];

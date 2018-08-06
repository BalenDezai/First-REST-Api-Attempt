const { body } = require('express-validator/check');

exports.createFields = [
  body('start')
    .exists().withMessage('start must not be empty')
    .isISO8601().withMessage('start must be a valid ISO date format'),

  body('end')
    .exists().withMessage('end must not be empty')
    .isISO8601().withMessage('end must be a valid ISO date format'),

  body('holiday')
    .isBoolean().withMessage('holiday must be a boolean')
    .optional(),

  body('weekend')
    .isBoolean().withMessage('weekend must be a boolean')
    .optional(),
];

exports.updateFields = [
  body('_id')
    .isEmpty().withMessage('_id must be empty'),

  body('start')
    .isISO8601().withMessage('start must be a valid ISO date format')
    .optional(),

  body('end')
    .isISO8601().withMessage('end must be a valid ISO date format')
    .optional(),

  body('holiday')
    .isBoolean()
    .optional(),

  body('weekend')
    .isBoolean()
    .optional(),
];

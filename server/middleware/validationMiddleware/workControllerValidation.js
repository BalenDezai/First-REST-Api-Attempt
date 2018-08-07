const { body } = require('express-validator/check');

exports.updateFields = [

  body('started')
    .isISO8601().withMessage('started must be a valid ISO date format')
    .optional(),

  body('ended')
    .isISO8601().withMessage('ended must be a valid ISO date format')
    .optional(),

  body('hoursThisYear')
    .isNumeric().withMessage('hoursThisYear must be a number')
    .optional(),

  body('hoursTotal')
    .isNumeric().withMessage('hoursTotal must be a number')
    .optional(),
];

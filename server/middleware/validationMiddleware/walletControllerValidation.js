const { body } = require('express-validator/check');

exports.updateFields = [

  body('salary', 'Must be a valid number')
    .isNumeric().withMessage('salary must be a number')
    .optional(),

  body('wage', 'Must be a valid wage type')
    .isString().withMessage('wage must be a string')
    .custom((value) => {
      const values = ['monthly', 'hourly'];
      return values.includes(value.toLowerCase());
    })
    .withMessage('wage must be a valid wage')
    .optional(),
];

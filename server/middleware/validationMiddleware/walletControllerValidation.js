const { body } = require('express-validator/check');

exports.updateFields = [
  body('_id', 'Must be empty').isEmpty(),
  body('salary', 'Must be a valid number').isNumeric(),
  body('wage', 'Must be a valid wage type').isString().custom((value) => {
    const values = ['monthly', 'hourly'];
    return values.includes(value.toLowerCase());
  }),
  body('_Owner', 'Must be empty').isEmpty(),
  body('lastChanged', 'Must be empty').isEmpty(),
];

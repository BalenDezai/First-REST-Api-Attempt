const { body } = require('express-validator/check');

exports.updateFields = [
  body('_id', 'Must be empty').isEmpty(),
  body('wage', 'Must ').isNumeric(),
  body('description', 'Must specify a last name').isString(),
  body('_Owner', 'Must be empty').isEmpty(),
];

const { body } = require('express-validator/check');

exports.updateFields = [
  body('_id', 'Must be empty').isEmpty(),
  body('jobTitle', 'Must specify a valid string').isString(),
  body('description', 'Must specify a valid string').isString(),
  body('_Owner', 'Must be empty').isEmpty(),
];

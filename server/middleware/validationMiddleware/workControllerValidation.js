const { body } = require('express-validator/check');

exports.updateFields = [
  body('_id', 'Must be empty').isEmpty(),
  body('work_start_date', 'Must be a valid date').isISO8601(),
  body('work_end_date', 'Must be a valid date').isISO8601(),
  body('work_hours_this_year', 'Must be a valid number').isNumeric(),
  body('TotalHours', 'Must be a valid number').isNumeric(),
  body('_Owner', 'Must be empty').isEmpty(),
];

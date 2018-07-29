const { body } = require('express-validator/check');

exports.createFields = [
  body('work_date', 'Must specify a valid date').exists().isISO8601().isBefore(Date.now().toString()),
  body('start_work_hour', 'Must specify a valid date').exists().isISO8601().isBefore(Date.now().toString()),
  body('end_work_hour', 'Must specify a valid date').exists().isISO8601().isBefore(Date.now().toString()),
  body('is_holiday', 'Must specify a boolean').isBoolean(),
  body('is_weekend', 'Must specify a boolean').isBoolean(),
];

exports.updateFields = [
  body('_id', 'must not be specified').isEmpty(),
  body('work_date', 'must specify a valid date').isISO8601().isBefore(Date.now().toString()),
  body('start_work_hour', 'must specify a valid date').isISO8601().isBefore(Date.now().toString()),
  body('end_work_hour', 'must specify a valid date').isISO8601().isBefore(Date.now().toString()),
  body('is_holiday', 'must specify a valid boolean').isBoolean(),
  body('is_weekend', 'must specify a valid boolean').isBoolean(),
];

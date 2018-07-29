const { body } = require('express-validator/check');

exports.createFields = [
  body('firstName', 'Must specify a valid string').exists().isString(),
  body('lastName', 'Must specify a valid string').exists().isString(),
  body('birthday', 'Must specify a valid birthday').isISO8601().isBefore(Date.now().toString()),
  body('email', 'Must specify a valid email').isString().isEmail(),
  body('city', 'Must specify a valid string').exists().isString(),
  body('country', 'Must specify a valid string').exists().isString(),
  body('street', 'Must specify a valid string').exists().isString(),
  body('phoneNumber', 'Must specify a valid phone number').isNumeric().isMobilePhone(),
  body('startDate', 'Must specify a valid date').isISO8601(),
  body('lastChanged', 'Must specify a valid date').isISO8601().isBefore(Date.now().toString()),
];

exports.updateFields = [
  body('_id', 'Must be empty').isEmpty(),
  body('firstName', 'Must specify a valid string').isString(),
  body('lastName', 'Must specify a valid string').isString(),
  body('birthday', 'Must specify a valid birthday').isISO8601().isBefore(Date.now().toString()),
  body('email', 'Must specify a valid email').isString().isEmail(),
  body('city', 'Must specify a valid string').isString(),
  body('user', 'Must be empty').isEmpty(),
  body('country', 'Must specify a valid string').isString(),
  body('street', 'Must specify a valid string').isString(),
  body('phoneNumber', 'Must specify a valid phone number').isNumeric().isMobilePhone(),
  body('startDate', 'Must specify a valid date').isISO8601(),
  body('lastChanged', 'Must specify a valid date').isISO8601().isBefore(Date.now().toString()),
];

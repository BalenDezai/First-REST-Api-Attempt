module.exports = function getDate(options) {
  const opts = options || {};
  const date = new Date();
  const offset = (new Date().getTimezoneOffset() / 60 * -1);
  const test = new Date(date.getTime() + offset);
  if (opts.ISOFormat === true) {
    return test.toISOString();
  }
  const dateString = test.toString();
  return dateString.substring(0, dateString.indexOf('(') - 1);
};

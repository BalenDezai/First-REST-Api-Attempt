/**
 * @param {string} str stirng to capitalize first letter of
 * @returns {string} capitalized first letter string
 */
function capitalizeFirstLetter(str) {
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1, str.length).toLowerCase()}`;
}

module.exports = capitalizeFirstLetter;

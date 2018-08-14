
module.exports = function cloneProperties(objectToCopy, excludeProps) {
  const args = excludeProps.split(' ');
  const keys = Object.keys(objectToCopy);
  const newObj = {};
  for (let i = 0; i < keys.length; i += 1) {
    if (!args.includes(keys[i])) {
      newObj[keys[i]] = objectToCopy[keys[i]];
    }
  }
  return newObj;
};

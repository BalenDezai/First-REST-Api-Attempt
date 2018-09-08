const User = require('./userModel');

module.exports = class UserService {
  static findAllUsers(conditions) {
    return new Promise((resolve, reject) => {
      if (typeof conditions !== 'object') reject(new Error(`${typeof conditions} is not an object`));

      if (Array.isArray(conditions)) reject(new Error('array is not an object'));

      resolve(User.find(conditions, 'username email links employee'));
    });
  }

  static findUserById(id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));
      resolve(User.findOne({ _id: id }, 'username email links role employee')
        .populate('employee', 'firstName lastName email phoneNumber links'));
    });
  }
};

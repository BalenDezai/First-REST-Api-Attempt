const User = require('./userModel');
const { capitalizeFirstLetter, populate } = require('../../util/utils');

module.exports = class UserService {
  /**
   * find users by a condition
   * @param {object} conditions to find user by
   */
  static findAllUsers(conditions) {
    return new Promise((resolve, reject) => {
      if (typeof conditions !== 'object') reject(new Error(`${typeof conditions} is not an object`));

      if (Array.isArray(conditions)) reject(new Error('array is not an object'));

      resolve(User.find(conditions, 'username email links employee'));
    });
  }

  /**
   * finds a user by id
   * @param {string} id id to find the user by
   */
  static findUserById(id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      resolve(User.findOne({ _id: id }, 'username email links role employee'));
    });
  }

  /**
   * creates a user
   * @param {object} obj user object to create
   */
  static createUser(obj) {
    return new Promise((resolve, reject) => {
      if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not an object`));
      if (Array.isArray(obj)) reject(new Error('array is not an object'));

      resolve(User.create(obj));
    });
  }

  /**
   *  updates a user by id
   * @param {object} obj object to update it with
   * @param {string} id id of the user to update
   */
  static updateUserById(obj, id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      if (typeof obj !== 'object') reject(new Error(`${typeof obj} is not an object`));

      if (Array.isArray(obj)) reject(new Error('array is not an object'));

      resolve(User.findOneAndUpdate({ _id: id }, { $set: obj }, { new: true, fields: 'username email role links' }));
    });
  }

  /**
   * deletes a user by id
   * @param {string} id the id of the user to delete
   */
  static deleteUserById(id) {
    return new Promise((resolve, reject) => {
      if (typeof id !== 'string') reject(new Error(`${typeof id} is not a string`));

      resolve(User.findOneAndRemove({ _id: id }));
    });
  }

  /**
   *  populates a user object
   * @param {string} obj the user object to populate
   * @param {string} path what field to populate
   * @param {string} select what to populate it with
   */
  static populate(obj, path, select) {
    return populate(User, obj, path, select);
  }

  /**
   * creates a user object
   * @param {object} obj the object to create with
   */
  static createUserObject(obj) {
    return {
      username: obj.username,
      email: obj.email,
      role: capitalizeFirstLetter(obj.role),
      password: obj.password,
    };
  }
};

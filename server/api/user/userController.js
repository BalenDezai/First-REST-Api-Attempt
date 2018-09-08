const { cloneProperties, hasKeys } = require('../../util/utils');
const {
  findAllUsers,
  findUserById,
  createUser,
  updateUserById,
  deleteUserById,
  populate,
  createUserObject,
} = require('./userService');

module.exports = class UserController {
  /**
   * gets all users that match a condition
   * @param {object} obj the condition to find it by
   * @param {string} host the host name portion of the requested url
   * @param {string} url the requested url after the hostname
   */
  static async getAllUsers(obj, host, url) {
    const isQueryString = hasKeys(obj);
    const foundUsers = await findAllUsers(obj);
    if (foundUsers.length > 0) {
      for (let i = 0; i < foundUsers.length; i += 1) {
        foundUsers[i].SetUpHyperLinks(host, url, { queryString: isQueryString });
      }
      return {
        result: {
          count: foundUsers.length,
          users: foundUsers,
        },
      };
    }
    return {
      status: 204,
      result: null,
    };
  }

  /**
   * gets one user with a watching ID
   * @param {string} id the id to find the user by
   * @param {string} host the host name portion of the requested url
   * @param {string} url the requested url after the hostname
   */
  static async getOneUser(id, host, url) {
    const foundUser = await findUserById(id);
    if (foundUser) {
      await populate(foundUser, 'employee', 'firstName lastName email phoneNumber links');
      foundUser.setupHyperLinks(host, url);
      foundUser.employee.SetUpHyperLinks(host, '/api/v1/employees/');
      return {
        result: foundUser,
      };
    }
    return {
      status: 204,
      result: null,
    };
  }

  /**
   * creates a user
   * @param {object} obj the user object to create
   * @param {string} host the host name portion of the requested url
   * @param {string} url the requested url after the hostname
   */
  static async createOneUser(obj, host, url) {
    const userObj = createUserObject(obj);
    const createdUser = await createUser(userObj);
    createdUser.setupHyperLinks(host, url);
    return {
      status: 201,
      result: createdUser.removePassword(),
    };
  }

  /**
   * finds a user by an id and updates the user
   * @param {object} obj the user object to update with
   * @param {string} id the id of the user to update
   * @param {string} host the host name portion of the requested url
   * @param {string} url the requested url after the hostname
   */
  static async updateOneUser(obj, id, host, url) {
    const newObj = cloneProperties(obj, '_id employee');
    const updatedUser = await updateUserById(newObj, id);
    updatedUser.SetUpHyperLinks(host, url);
    return {
      result: updatedUser,
    };
  }

  /**
   *  finds a user by id and deletes the user
   * @param {string} id the id to find the user by
   */
  static async deleteOneUser(id) {
    await deleteUserById(id);
    return {
      status: 200,
      message: 'Successfully deleted user',
    };
  }
};

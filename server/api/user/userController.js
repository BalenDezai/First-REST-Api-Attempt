const User = require('./userModel');
const { isValid } = require('mongoose').Types.ObjectId;

module.exports = class UserController {
  static idValidParam(req, res, next) {
    //  make sure user put req.params.id is avalid mongoose object
    if (!isValid(req.params.id)) {
      const error = new Error();
      error.status = 404;
      error.resMessage = 'Invalid ID';
      next(error);
    }
    next();
  }

  static async getAllUsers(req, res, next) {
    try {
      const foundUsers = await User.find(req.query, 'username email links employee');
      const documents = {
        count: foundUsers.length,
        users: foundUsers,
      };
      if (documents.count > 0) {
        for (let i = 0; i < foundUsers.length; i += 1) {
          foundUsers[i].SetUpHyperLinks(req.headers.host, req.originalUrl);
        }
        res.status(200).json(documents);
      } else {
        res.status(204).json(documents);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getOneUser(req, res, next) {
    try {
      const foundUser = await User.findOne({ _id: req.params.id }, 'username email links role employee').populate('employee', 'firstName lastName email phoneNumber links');
      foundUser.SetUpHyperLinks(req.headers.host, req.originalUrl);
      foundUser.employee.SetUpHyperLinks(req.headers.host, '/api/v1/employees/');
      res.status(200).json(foundUser);
    } catch (error) {
      next(error);
    }
  }

  static async createOneUser(req, res, next) {
    try {
      const [foundUser, foundEmail] = Promise.all([
        User.findOne({ username: req.body.username }).lean(),
        User.findOne({ email: req.body.email }).lean(),
      ]);
      if (foundUser) {
        return res.status(409).json({
          status: 409,
          message: 'Username already exists',
        });
      }
      if (foundEmail) {
        return res.status(409).json({
          status: 409,
          message: 'Email already exists',
        });
      }
      const role = `${req.body.role.substring(0, 1).toUpperCase()}${req.body.role.substring(1, req.body.role.length).toLowerCase()}`;
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        role,
        password: req.body.password,
      };
      const createdUser = await User.create(newUser);
      createdUser.SetUpHyperLinks(req.headers.host, req.originalUrl);
      return res.status(201).json(createdUser.removePassword());
    } catch (error) {
      return next(error);
    }
  }

  static async updateOneUser(req, res, next) {
    try {
      //  performance might be worse than other options
      //  TODO: reconsider
      delete req.body._id;
      const updatedUser = await User
        .findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, fields: 'username email role links' });
      updatedUser.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  static async deleteOneUser(req, res, next) {
    try {
      await User.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ status: 200, message: 'Successfully deleted user' });
    } catch (error) {
      next(error);
    }
  }
};

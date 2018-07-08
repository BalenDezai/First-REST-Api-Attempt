const mongoose = require('mongoose');
const User = require('./userModel');

const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const foundUsers = await User.find({}, 'username email links');
      foundUsers.forEach((user) => {
        user.SetUpHyperLinks(req.headers.host, req.originalUrl);
      });
      const documents = {
        count: foundUsers.length,
        employees: foundUsers,
      };
      if (documents.count > 0) {
        res.status(200).json(documents);
      } else {
        res.status(204).json(documents);
      }
    } catch (error) {
      error.status = 500;
      error.message = 'Error processing the request';
      next(error);
    }
  },
  getOneUser: async (req, res, next) => {
    try {
      const foundUser = await User.findOne({ _id: req.params.id }, 'username email links');
      foundUser.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(foundUser);
    } catch (error) {
      error.status = 500;
      error.message = 'Error processing the request';
      next(error);
    }
  },

  createOneUser: async (req, res, next) => {
    try {
      const foundUser = await User.findOne({ username: req.body.username });
      const foundEmail = await User.findOne({ email: req.body.email });
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
      const newUser = {
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        links: [],
      };

      const createdUser = await User.create(newUser);
      createdUser.SetUpHyperLinks(req.headers.host, req.originalUrl);
      return res.status(201).json(createdUser.removePassword());
    } catch (error) {
      error.status = 500;
      error.message = 'Error processing the request';
      return next(error);
    }
  },

  updateOneUser: async (req, res, next) => {
    try {
      const updatedUser = await User
        .findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, fields: 'username email links' });
      updatedUser.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedUser);
    } catch (error) {
      error.status = 500;
      error.message = 'Error processing the request';
      next(error);
    }
  },

  deleteOneUser: async (req, res, next) => {
    try {
      await User.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ status: 200, message: 'Successfully deleted user' });
    } catch (error) {
      error.status = 500;
      error.message = 'Error processing the request';
      next(error);
    }
  },
};

module.exports = userController;

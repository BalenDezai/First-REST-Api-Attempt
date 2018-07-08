const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../api/user/userModel');
const config = require('../config/config');

const authController = {
  registerUser: async (req, res, next) => {
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
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      await User.create(user);
      return res.status(201).json({
        status: 201,
        message: 'User successfully created',
      });
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error creating user';
      return next(error);
    }
  },

  signinUser: async (req, res, next) => {
    try {
      const token = await jwt
        .sign({ _id: req.user._id }, config.jwt.secret, { expiresIn: config.jwt.expireTime });
      return res.status(200).json({
        status: 200,
        message: ' Auth successful',
        token,
      });
    } catch (error) {
      error.status = 500;
      error.resMessage = 'Error signing in user';
      return next(error);
    }
  },

  updateCurrentUser: async (req, res, next) => {
    try {
      const updatedUser = await User
        .findOneAndUpdate({ _id: req.user._id }, { $set: req.body }, { new: true, fields: 'username email links' });
      updatedUser.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedUser);
    } catch (error) {
      error.status = 500;
      error.message = 'Error processing the request';
      next(error);
    }
  },

  viewCurrentUserUser: async (req, res) => {
    res.status(200).json(req.user);
  },

  deleteCurrentUser: async (req, res, next) => {
    try {
      await User.findOneAndRemove({ _id: req.user._id });
      res.status(200).json({ status: 200, message: 'Successfully deleted user' });
    } catch (error) {
      error.status = 500;
      error.message = 'Error processing the request';
      next(error);
    }
  },
};

module.exports = authController;

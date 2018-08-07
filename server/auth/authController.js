const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../api/user/userModel');
const config = require('../config/config');

module.exports = class AuthController {
  static async registerUser(req, res, next) {
    try {
      const [foundUser, foundEmail] = await Promise.all([
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
      const role = `${req.body.role.substring(0, 1).toUpperCase()}${req.body.role.substring(1, req.body.role.length - 1).toLowerCase()}`;
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        email: req.body.email,
        role,
        password: req.body.password,
      });
      await User.create(user);
      return res.status(201).json({
        status: 201,
        message: 'User successfully created',
      });
    } catch (error) {
      return next(error);
    }
  }

  static async signinUser(req, res, next) {
    try {
      const token = await jwt
        .sign({ _id: req.user._id }, config.jwt.secret, { expiresIn: config.jwt.expireTime });
      return res.status(200).json({
        status: 200,
        message: ' Auth successful',
        token,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateCurrentUser(req, res, next) {
    try {
      //  delete performance might be worse than other options
      //  TODO: reconsider
      delete req.body._id;

      const [foundUser, foundEmail] = await Promise.all([
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
      const updatedUser = await User
        .findOneAndUpdate({ _id: req.user._id }, { $set: req.body }, { new: true, fields: 'username email role links' });
      updatedUser.SetUpHyperLinks(req.headers.host, req.originalUrl);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return next(error);
    }
  }

  static viewCurrentUserUser(req, res) {
    res.status(200).json(req.user);
  }

  static async deleteCurrentUser(req, res, next) {
    try {
      await User.findOneAndRemove({ _id: req.user._id });
      res.status(200).json({ status: 200, message: 'Successfully deleted user' });
    } catch (error) {
      next(error);
    }
  }
};

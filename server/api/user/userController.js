const User = require('./userModel');

const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const foundUsers = await User.find({}, 'username email links employee');
      const documents = {
        count: foundUsers.length,
        users: foundUsers,
      };
      if (documents.count > 0) {
        for (let i = 0; i < foundUsers; i += 1) {
          foundUsers[i].SetUpHyperLinks(req.headers.host, req.originalUrl);
        }
        res.status(200).json(documents);
      } else {
        res.status(204).json(documents);
      }
    } catch (error) {
      next(error);
    }
  },
  getOneUser: async (req, res, next) => {
    try {
      const foundUser = await User.findOne({ _id: req.params.id }, 'username email links employee').populate('employee', 'firstName lastName email phoneNumber links');
      foundUser.SetUpHyperLinks(req.headers.host, req.originalUrl);
      foundUser.employee.SetUpHyperLinks(req.headers.host, '/api/v1/employees/');
      res.status(200).json(foundUser);
    } catch (error) {
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
  },

  updateOneUser: async (req, res, next) => {
    try {
      const updatedUser = await User
        .findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, fields: 'username email links' });
      updatedUser.SetUpHyperLinks(req.headers.host, req.originalUrl);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  deleteOneUser: async (req, res, next) => {
    try {
      await User.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ status: 200, message: 'Successfully deleted user' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;

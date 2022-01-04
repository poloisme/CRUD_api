const userService = require("../services/user.service");

//get all user
const getAllUser = async (req, res, next) => {
  try {
    const response = await userService.getAll();
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

//get a user by id
const getUser = async (req, res, next) => {
  try {
    const response = await userService.getOne({ id: req.params.id });
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

//create a new user
const createNewUser = async (req, res, next) => {
  try {
    const response = await userService.createNew(req.body);
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

//update a user by id
const updateUser = async (req, res, next) => {
  try {
    const response = await userService.update({ id: req.params.id }, req.body);
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

//delete a user by id
const deleteUser = async (req, res, next) => {
  try {
    const response = await userService.deleteOne({ id: req.params.id });
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

//delete all user
const deleteAll = async (req, res, next) => {
  try {
    const response = await userService.deleteAll();
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  getUser,
  deleteUser,
  deleteAll,
};

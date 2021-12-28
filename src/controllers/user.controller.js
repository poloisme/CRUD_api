const userService = require("../services/user.service");

//[GET] api/users
const getAllUser = async (req, res, next) => {
  try {
    const response = await userService.getAll();
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

//[GET] api/users/:id
const getUser = async (req, res, next) => {
  try {
    const response = await userService.getOne({ id: req.params.id });
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

//[POST] api/users/create
const createNewUser = async (req, res, next) => {
  try {
    const response = await userService.createNew(req.body);
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

//[PUT] api/users/:id
const updateUser = async (req, res, next) => {
  try {
    const response = await userService.update({ id: req.params.id }, req.body);
    return res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

//[DELETE] api/users/:id
const deleteUser = async (req, res, next) => {
  try {
    const response = await userService.deleteOne({ id: req.params.id });
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

//[DELETE] api/users/delete-all
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

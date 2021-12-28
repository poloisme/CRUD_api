const db = require("../models/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//get all user
const getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.User.findAll({
        attributes: [
          "id",
          "username",
          "email",
          "password_hash",
          "status",
          "roles_id",
        ],
      });
      //check res
      if (res < 1) {
        const err = new Error("No records found!");
        err.status = 500;
        reject(err);
      }
      resolve({ status: "success", data: res });
    } catch (err) {
      reject(err);
    }
  });
};

//get user by id
const getOne = (condition) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.User.findOne({
        attributes: [
          "id",
          "username",
          "password_hash",
          "email",
          "status",
          "roles_id",
        ],
        where: { ...condition },
      });
      //check res
      if (res < 1) {
        const err = new Error("User not found!");
        err.status = 404;
        reject(err);
      }
      resolve({ status: "success", data: res });
    } catch (err) {
      reject(err);
    }
  });
};

//create user
const createNew = (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Create password_hash
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(newUser.password, salt);

      const user = await db.User.create({
        username: newUser.username,
        password_hash: password_hash,
        email: newUser.email,
        status: newUser.status || 1,
        roles_id: newUser.roles_id || 4,
      });
      resolve({
        status: "success",
        message: `create new user: ${user.id}`,
        data: user,
      });
    } catch (err) {
      reject(err);
    }
  });
};

//update user
const update = (condition, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { password } = data;
      if (password) {
        //Create password_hash
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        data = { ...data, password_hash };
      }
      const res = await db.User.update(
        { ...data },
        {
          where: { ...condition },
        }
      );
      //check res
      if (res < 1) {
        const err = new Error("User not found!");
        err.status = 404;
        reject(err);
      }
      resolve({
        status: "success",
        message: `update ${res} row`,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const deleteOne = (condition) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.User.destroy({
        where: { ...condition },
      });
      //check res
      if (res < 1) {
        const err = new Error("User not found!");
        err.status = 404;
        reject(err);
      }
      resolve({ status: "success", message: `delete ${res} row` });
    } catch (err) {
      reject(err);
    }
  });
};

const deleteAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.User.destroy({
        truncate: true,
      });
      resolve({ status: "success", message: `exist ${res} row` });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  getAll,
  createNew,
  update,
  getOne,
  deleteOne,
  deleteAll,
};

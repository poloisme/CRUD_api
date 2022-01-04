const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { validateBody } = require("../middlewares/validateData");

//router
router.route("/").get(userController.getAllUser);

router
  .route("/create")
  .post(validateBody("userSchemaCreate"), userController.createNewUser);

router.route("/delete-all").delete(userController.deleteAll);

router
  .route("/:id")
  .put(validateBody("userSchemaUpdate"), userController.updateUser)
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;

const express = require("express");
const { upload, exel_upload } = require("./middleware/fileUpload");
const userRouter = express.Router();

const UserController = require("../controller/userController");

userRouter.post("/get_all_users", UserController.GetAllUsers);
userRouter.get("/get_single_user/:user_Id", UserController.GetUserById);
userRouter.post(
  "/add_single_user",
  upload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "profileVideo", maxCount: 1 },
  ]),
  UserController.CreateUser
);

userRouter.post(
  "/add_multipal_user",
  exel_upload.single("file"),
  UserController.CreateMultiUser
);
userRouter.post(
  "/update_single_user/:user_Id",
  upload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "profileVideo", maxCount: 1 },
  ]),
  UserController.UpdateUser
);
userRouter.post("/delete_single_user/:user_Id", UserController.DeleteUser);

module.exports = userRouter;

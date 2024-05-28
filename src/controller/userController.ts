const UserModel = require("../query/userQuery");

exports.GetAllUsers = (request, response) => {
  UserModel.getAllUsers({ request: request, response: response });
};

exports.GetUserById = (request, response) => {
  UserModel.getUserById({ request: request, response: response });
};

exports.CreateUser = (request, response) => {
  UserModel.createUser({ request: request, response: response });
};

exports.CreateMultiUser = (request, response) => {
  UserModel.createMultiUser({ request: request, response: response });
};

exports.UpdateUser = (request, response) => {
  UserModel.updateUser({ request: request, response: response });
};

exports.DeleteUser = (request, response) => {
  UserModel.deleteUser({ request: request, response: response });
};

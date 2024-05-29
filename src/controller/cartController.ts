const cartModel = require("../query/cartQuery");

exports.GetAllcarts = (request, response) => {
  cartModel.getAllCarts({ request: request, response: response });
};

exports.GetcartById = (request, response) => {
  cartModel.getCartById({ request: request, response: response });
};

exports.Createcart = (request, response) => {
  cartModel.createCart({ request: request, response: response });
};

exports.CreateMulticart = (request, response) => {
  cartModel.createMultiCart({ request: request, response: response });
};

exports.Updatecart = (request, response) => {
  cartModel.updateCart({ request: request, response: response });
};

exports.Deletecart = (request, response) => {
  cartModel.deleteCart({ request: request, response: response });
};

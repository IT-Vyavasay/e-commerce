const orderModel = require("../query/orderQuery");

exports.GetAllorders = (request, response) => {
  orderModel.getAllOrders({ request: request, response: response });
};

exports.GetorderById = (request, response) => {
  orderModel.getOrderById({ request: request, response: response });
};

exports.Createorder = (request, response) => {
  orderModel.createOrder({ request: request, response: response });
};

exports.CreateMultiorder = (request, response) => {
  orderModel.createMultiOrder({ request: request, response: response });
};

exports.Updateorder = (request, response) => {
  orderModel.updateOrder({ request: request, response: response });
};

exports.Deleteorder = (request, response) => {
  orderModel.deleteOrder({ request: request, response: response });
};

const express = require("express");
const orderRouter = express.Router();

const orderController = require("../controller/orderController");

orderRouter.post("/get_all_orders", orderController.GetAllorders);
orderRouter.get("/get_single_order/:order_id", orderController.GetorderById);
orderRouter.post("/add_single_order", orderController.Createorder);
orderRouter.post("/add_multipal_order", orderController.CreateMultiorder);
orderRouter.post("/update_single_order/:order_id", orderController.Updateorder);
orderRouter.post("/delete_single_order/:order_id", orderController.Deleteorder);

module.exports = orderRouter;

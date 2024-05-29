const express = require("express");
const { upload, exel_upload } = require("./middleware/fileUpload");
const cartRouter = express.Router();

const cartController = require("../controller/cartController");

cartRouter.post("/get_all_carts", cartController.GetAllcarts);
cartRouter.get("/get_single_cart/:cart_id", cartController.GetcartById);
cartRouter.post("/add_single_cart", cartController.Createcart);
cartRouter.post("/add_multipal_cart", cartController.CreateMulticart);
cartRouter.post("/update_single_cart/:cart_id", cartController.Updatecart);
cartRouter.post("/delete_single_cart/:cart_id", cartController.Deletecart);

module.exports = cartRouter;

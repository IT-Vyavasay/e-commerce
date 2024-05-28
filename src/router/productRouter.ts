const express = require("express")

const productRouter = express.Router()


const ProductController = require('../controller/productController');

productRouter.post('/get_all_products', ProductController.GetAllProducts);
productRouter.get('/get_single_product/:productId', ProductController.GetProductById);
productRouter.post('/add_single_product', ProductController.CreateProduct);
productRouter.post('/update_single_product/:productId', ProductController.UpdateProduct);
productRouter.post('/delete_single_product/:productId', ProductController.DeleteProduct);


module.exports = productRouter
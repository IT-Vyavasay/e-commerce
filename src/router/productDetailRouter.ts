const express = require("express")

const productDetailRouter = express.Router()


const productDetailController = require('../controller/productDetailController');

productDetailRouter.post('/get_all_productDetails', productDetailController.GetAllProductDetails);
productDetailRouter.get('/get_single_productDetail/:productDetailId', productDetailController.GetProductDetailById);
productDetailRouter.post('/add_single_productDetail', productDetailController.CreateProductDetail);
productDetailRouter.post('/update_single_productDetail/:productDetailId', productDetailController.UpdateProductDetail);
productDetailRouter.post('/delete_single_productDetail/:productDetailId', productDetailController.DeleteProductDetail);


module.exports = productDetailRouter
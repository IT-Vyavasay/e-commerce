const ProductDetailModel = require('../query/productDetailQuery');

exports.GetAllProductDetails = (request, response) => {
  ProductDetailModel.getAllProductDetails({ request: request, response: response });
};


exports.GetProductDetailById = (request, response) => {
  ProductDetailModel.getProductDetailById({ request: request, response: response });
};


exports.CreateProductDetail = (request, response) => {
  ProductDetailModel.createProductDetail({ request: request, response: response });
};


exports.UpdateProductDetail = (request, response) => {
  ProductDetailModel.updateProductDetail({ request: request, response: response });
};

exports.DeleteProductDetail = (request, response) => {
  ProductDetailModel.deleteProductDetail({ request: request, response: response });
};
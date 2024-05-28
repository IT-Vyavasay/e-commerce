const ProductModel = require('../query/productQuery');

exports.GetAllProducts = (request, response) => {
  ProductModel.getAllProducts({ request: request, response: response });
};


exports.GetProductById = (request, response) => {
  ProductModel.getProductById({ request: request, response: response });
};


exports.CreateProduct = (request, response) => {
  ProductModel.createProduct({ request: request, response: response });
};


exports.UpdateProduct = (request, response) => {
  ProductModel.updateProduct({ request: request, response: response });
};

exports.DeleteProduct = (request, response) => {
  ProductModel.deleteProduct({ request: request, response: response });
};
const CommonQuery = require("../query/commonQuery/commonQuery");
const {
  FinalQueryGenerator,
  ResponseManage,
} = require("../helper/commonFunction");

exports.getAllProducts = ({ request, response }) => {
  const FinalQueryString = FinalQueryGenerator({
    tableName: "product",
    defaultSortingField: "productId",
    request: request,
  });
  CommonQuery.getAllItems({
    querySyntex: FinalQueryString,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          success: "Get product list successfully",
          error: "Error fetching product",
        },
      }),
  });
};

exports.getProductById = ({ request, response }) => {
  const productId = request.params.productId;
  CommonQuery.getItemById({
    querySyntex: "SELECT * FROM product WHERE productId = ?",
    ItemId: productId,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          success: "Get product successfully",
          error: "Error fetching product",
        },
      }),
  });
};

exports.createProduct = ({ request, response }) => {
  const productData = request.body;
  CommonQuery.createItem({
    querySyntex: "INSERT INTO product SET ?",
    ItemData: productData,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          success: "Product created successfully",
          error: "Error in creating product",
        },
      }),
  });
};

exports.updateProduct = ({ request, response }) => {
  const productId = request.params.productId;
  const userData = request.body;

  CommonQuery.updateItem({
    querySyntex: "UPDATE product SET ? WHERE productId = ?",
    ItemData: userData,
    ItemId: productId,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          error: "Error in updating product",
          success: "Product updated successfully",
        },
      }),
  });
};

exports.deleteProduct = ({ request, response }) => {
  const productId = request.params.productId;

  CommonQuery.deleteItem({
    querySyntex: "DELETE FROM product WHERE productId = ?",
    ItemId: productId,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          error: "Error in deleting product",
          success: "Product deleted successfully",
        },
      }),
  });
};

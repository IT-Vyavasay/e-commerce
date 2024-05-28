const CommonQuery = require("../query/commonQuery/commonQuery");
const {
  FinalQueryGenerator,
  ResponseManage,
} = require("../helper/commonFunction");

exports.getAllProductDetails = ({ request, response }) => {
  const FinalQueryString = FinalQueryGenerator({
    tableName: "productDetail",
    defaultSortingField: "productDetailId",
    request: request,
    relationQuery:
      "INNER JOIN product ON productDetail.productID = product.productId",
  });
  CommonQuery.getAllItems({
    querySyntex: FinalQueryString,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          success: "Get productDetail list successfully",
          error: "Error fetching productDetail",
        },
      }),
  });
};

exports.getProductDetailById = ({ request, response }) => {
  const productDetailId = request.params.productDetailId;
  CommonQuery.getItemById({
    querySyntex: "SELECT * FROM productDetail WHERE productDetailId = ?",
    ItemId: productDetailId,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          success: "Get productDetail successfully",
          error: "Error fetching productDetail",
        },
      }),
  });
};

exports.createProductDetail = ({ request, response }) => {
  const productData = request.body;

  CommonQuery.createItem({
    querySyntex: "INSERT INTO productDetail SET ?",
    ItemData: productData,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          success: "ProductDetail created successfully",
          error: "Error in creating productDetail",
        },
      }),
  });
};

exports.updateProductDetail = ({ request, response }) => {
  const productDetailId = request.params.productDetailId;
  const userData = request.body;

  CommonQuery.updateItem({
    querySyntex: "UPDATE productDetail SET ? WHERE productDetailId = ?",
    ItemData: userData,
    ItemId: productDetailId,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          error: "Error in updating productDetail",
          success: "ProductDetail updated successfully",
        },
      }),
  });
};

exports.deleteProductDetail = ({ request, response }) => {
  const productDetailId = request.params.productDetailId;

  CommonQuery.deleteItem({
    querySyntex: "DELETE FROM productDetail WHERE productDetailId = ?",
    ItemId: productDetailId,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          error: "Error in deleting productDetail",
          success: "ProductDetail deleted successfully",
        },
      }),
  });
};

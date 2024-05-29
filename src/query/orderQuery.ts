const xlsx = require("xlsx");
const CommonQuery = require("../query/commonQuery/commonQuery");
const { removeFile } = require("../router/middleware/fileUpload");
const {
  FinalQueryGenerator,
  ResponseManage,
} = require("../helper/commonFunction");

exports.getAllOrders = ({ request, response }) => {
  const FinalQueryString = FinalQueryGenerator({
    tableName: "orders",
    defaultSortingField: "order_id",
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
          success: "Get orders list successfully",
          error: "Error fetching order",
        },
      }),
  });
};

exports.getOrderById = ({ request, response }) => {
  const order_id = request.params.order_id;
  CommonQuery.getItemById({
    querySyntex: "SELECT * FROM orders WHERE order_id = ?",
    ItemId: order_id,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          success: "Get order successfully",
          error: "Error fetching order",
        },
      }),
  });
};

exports.createOrder = ({ request, response }) => {
  const orderData = request.body;

  CommonQuery.createItem({
    querySyntex: "INSERT INTO orders SET ?",
    ItemData: orderData,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          success: "Order created successfully",
          error: "Error in creating order",
        },
      }),
  });
};

exports.createMultiOrder = ({ request, response }) => {
  const file = request.file;
  if (!file) {
    return response.status(400).send("No file uploaded.");
  }

  // Parse the Excel file
  const workbook = xlsx.read(file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  // Prepare and execute MySQL insert query
  const query = "INSERT INTO order (user_id, product_id,quantity) VALUES ?";
  const values = jsonData
    .map((row) => {
      if (typeof row.index == "number") {
        return [row?.user_id || "", row?.product_id || "", row?.quantity || 0];
      }
    })
    .filter((i) => i !== undefined);
  CommonQuery.createItem({
    querySyntex: query,
    ItemData: [values],
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          success: "Orders created successfully",
          error: "Error in creating multipal orders",
        },
      }),
  });
};

exports.updateOrder = ({ request, response }) => {
  const order_id = request.params.order_id;
  const orderData = request.body;
  const profileImg = () => {
    if (request.files.profileImg) {
      removeFile({
        recordId: order_id,
        tablename: "orders",
        fieldName: "profileImg",
      });
      return request.files.profileImg[0];
    } else {
      return null;
    }
  };

  const profileVideo = () => {
    if (request.files.profileImg) {
      removeFile({
        recordId: order_id,
        tablename: "orders",
        fieldName: "profileVideo",
      });
      return request.files.profileVideo[0];
    } else {
      return null;
    }
  };

  CommonQuery.updateItem({
    querySyntex: "UPDATE orders SET ? WHERE order_id = ?",
    ItemData: orderData,
    ItemId: order_id,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          error: "Error in updating order",
          success: "Order updated successfully",
        },
      }),
  });
};

exports.deleteOrder = ({ request, response }) => {
  const order_id = request.params.order_id;

  CommonQuery.deleteItem({
    querySyntex: "DELETE FROM orders WHERE order_id = ?",
    ItemId: order_id,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          error: "Error in deleting order",
          success: "Order deleted successfully",
        },
      }),
  });
};

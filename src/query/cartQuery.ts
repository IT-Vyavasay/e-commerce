const xlsx = require("xlsx");
const CommonQuery = require("../query/commonQuery/commonQuery");
const { removeFile } = require("../router/middleware/fileUpload");
const {
  FinalQueryGenerator,
  ResponseManage,
} = require("../helper/commonFunction");

exports.getAllCarts = ({ request, response }) => {
  const FinalQueryString = FinalQueryGenerator({
    tableName: "cart",
    defaultSortingField: "cart_id",
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
          success: "Get cart list successfully",
          error: "Error fetching cart",
        },
      }),
  });
};

exports.getCartById = ({ request, response }) => {
  const cart_id = request.params.cart_id;
  CommonQuery.getItemById({
    querySyntex: "SELECT * FROM cart WHERE cart_id = ?",
    ItemId: cart_id,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          success: "Get cart successfully",
          error: "Error fetching cart",
        },
      }),
  });
};

exports.createCart = ({ request, response }) => {
  const cartData = request.body;

  CommonQuery.createItem({
    querySyntex: "INSERT INTO cart SET ?",
    ItemData: cartData,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          success: "Cart created successfully",
          error: "Error in creating cart",
        },
      }),
  });
};

exports.createMultiCart = ({ request, response }) => {
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
  const query = "INSERT INTO cart (user_id, product_id,quantity) VALUES ?";
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
          success: "Carts created successfully",
          error: "Error in creating multipal carts",
        },
      }),
  });
};

exports.updateCart = ({ request, response }) => {
  const cart_id = request.params.cart_id;
  const cartData = request.body;
  const profileImg = () => {
    if (request.files.profileImg) {
      removeFile({
        recordId: cart_id,
        tablename: "cart",
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
        recordId: cart_id,
        tablename: "cart",
        fieldName: "profileVideo",
      });
      return request.files.profileVideo[0];
    } else {
      return null;
    }
  };

  CommonQuery.updateItem({
    querySyntex: "UPDATE cart SET ? WHERE cart_id = ?",
    ItemData: cartData,
    ItemId: cart_id,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          error: "Error in updating cart",
          success: "Cart updated successfully",
        },
      }),
  });
};

exports.deleteCart = ({ request, response }) => {
  const cart_id = request.params.cart_id;

  CommonQuery.deleteItem({
    querySyntex: "DELETE FROM cart WHERE cart_id = ?",
    ItemId: cart_id,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          error: "Error in deleting cart",
          success: "Cart deleted successfully",
        },
      }),
  });
};

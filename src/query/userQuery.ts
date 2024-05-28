const xlsx = require("xlsx");
const CommonQuery = require("../query/commonQuery/commonQuery");
const { removeFile } = require("../router/middleware/fileUpload");
const {
  FinalQueryGenerator,
  ResponseManage,
} = require("../helper/commonFunction");

exports.getAllUsers = ({ request, response }) => {
  const FinalQueryString = FinalQueryGenerator({
    tableName: "user",
    defaultSortingField: "user_Id",
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
          success: "Get user list successfully",
          error: "Error fetching user",
        },
      }),
  });
};

exports.getUserById = ({ request, response }) => {
  const user_Id = request.params.user_Id;
  CommonQuery.getItemById({
    querySyntex: "SELECT * FROM user WHERE user_id = ?",
    ItemId: user_Id,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          success: "Get user successfully",
          error: "Error fetching user",
        },
      }),
  });
};

exports.createUser = ({ request, response }) => {
  const userData = request.body;

  const profileImg = request.files.profileImg
    ? request.files.profileImg[0]
    : null;
  const profileVideo = request.files.profileVideo
    ? request.files.profileVideo[0]
    : null;

  const formData = request.body; // other form data
  CommonQuery.createItem({
    querySyntex: "INSERT INTO user SET ?",
    ItemData: {
      ...userData,
      profileImg: profileImg
        ? `${request.protocol}://${request.get("host")}/uploads/img/${
            profileImg.filename
          }`
        : null,
      profileVideo: profileVideo
        ? `${request.protocol}://${request.get("host")}/uploads/vid/${
            profileVideo.filename
          }`
        : null,
    },
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          success: "User created successfully",
          error: "Error in creating user",
        },
      }),
  });
};

exports.createMultiUser = ({ request, response }) => {
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
  const query =
    "INSERT INTO user (name, mobile,role, profileVideo,profileImg) VALUES ?";
  const values = jsonData
    .map((row) => {
      if (typeof row.index == "number") {
        return [
          row?.name || "",
          row?.mobile || 0,
          row?.role || 0,
          row?.profileVideo || "",
          row?.profileImg || "",
        ];
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
          success: "Users created successfully",
          error: "Error in creating multipal users",
        },
      }),
  });
};

exports.updateUser = ({ request, response }) => {
  const user_Id = request.params.user_Id;
  const userData = request.body;
  const profileImg = () => {
    if (request.files.profileImg) {
      removeFile({
        recordId: user_Id,
        tablename: "user",
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
        recordId: user_Id,
        tablename: "user",
        fieldName: "profileVideo",
      });
      return request.files.profileVideo[0];
    } else {
      return null;
    }
  };

  CommonQuery.updateItem({
    querySyntex: "UPDATE user SET ? WHERE user_Id = ?",
    ItemData: {
      ...userData,
      ...{
        profileImg: profileImg
          ? `${request.protocol}://${request.get("host")}/uploads/img/${
              profileImg().filename
            }`
          : null,
      },
      profileVideo: profileVideo
        ? `${request.protocol}://${request.get("host")}/uploads/vid/${
            profileVideo().filename
          }`
        : null,
    },
    ItemId: user_Id,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          error: "Error in updating user",
          success: "User updated successfully",
        },
      }),
  });
};

exports.deleteUser = ({ request, response }) => {
  const user_Id = request.params.user_Id;

  CommonQuery.deleteItem({
    querySyntex: "DELETE FROM user WHERE user_Id = ?",
    ItemId: user_Id,
    callback: (error, responseData) =>
      ResponseManage({
        error: error,
        responseData: responseData,
        response: response,
        messageObject: {
          error: "Error in deleting user",
          success: "User deleted successfully",
        },
      }),
  });
};

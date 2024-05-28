const multer = require("multer");
const path = require("path");
const CommonQuery = require("../../query/commonQuery/commonQuery");
// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == "profileImg") {
      cb(null, "uploads/img");
    } else {
      cb(null, "uploads/vid");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Set up Multer middleware
const upload = multer({ storage: storage });

// Create the uploads directory if it doesn't exist
const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Set up Multer storage (memory storage, not saving files to disk)
const temp_storage = multer.memoryStorage();
const exel_upload = multer({ storage: temp_storage });

const removeFile = ({ recordId, tablename, fieldName }) => {
  CommonQuery.getItemById({
    querySyntex: `SELECT * FROM ${tablename} WHERE user_id = ?`,
    ItemId: recordId,
    callback: (error, responseData) => {
      const filePath = responseData[0][fieldName]
        .split("/")
        .splice(3, 3)
        .join("/");
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error removing file: ${err}`);
          return;
        }
      });
    },
  });
};

module.exports = { upload, removeFile, exel_upload };

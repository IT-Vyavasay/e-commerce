const { DATABASE } = require("../../database/dbConnect")
const { ThrowErrorReponse } = require("../../helper/commonFunction")




exports.getAllItems = ({ callback, querySyntex }) => {
  try {
    DATABASE.query(querySyntex, callback);
  } catch (error) {
    ThrowErrorReponse({ type: "error", object: error })
  }

};

exports.getItemById = ({ ItemId, callback, querySyntex }) => {
  try {
    DATABASE.query(querySyntex, [ItemId], callback);
  } catch (error) {
    ThrowErrorReponse({ type: "error", object: error })
  }

};

exports.createItem = ({ ItemData, callback, querySyntex }) => {
  try {
    DATABASE.query(querySyntex, ItemData, callback);
  } catch (error) {
    ThrowErrorReponse({ type: "error", object: error })
  }

};

exports.updateItem = ({ ItemId, ItemData, callback, querySyntex }) => {
  try {
    DATABASE.query(querySyntex, [ItemData, ItemId], callback);
  } catch (error) {
    ThrowErrorReponse({ type: "error", object: error })
  }

};

exports.deleteItem = ({ ItemId, callback, querySyntex }) => {
  try {
    DATABASE.query(querySyntex, [ItemId], callback);
  } catch (error) {
    ThrowErrorReponse({ type: "error", object: error })
  }

};

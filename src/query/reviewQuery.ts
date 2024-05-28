
const CommonQuery = require("../query/commonQuery/commonQuery")
const { FinalQueryGenerator, ResponseManage } = require("../helper/commonFunction")


exports.getAllReviews = ({ request, response }) => {
  const FinalQueryString = FinalQueryGenerator({ tableName: "review", defaultSortingField: "reviewId", request: request })
  CommonQuery.getAllItems({
    querySyntex: FinalQueryString, callback: (error, responseData) =>
      ResponseManage({
        error: error, responseData: responseData, response: response, messageObject: {
          success: "Get review list successfully",
          error: "Error fetching review"
        }
      })

  });
};

exports.getReviewById = ({ request, response }) => {
  const reviewId = request.params.reviewId;
  CommonQuery.getItemById({
    querySyntex: 'SELECT * FROM review WHERE reviewId = ?', ItemId: reviewId, callback: (error, responseData) => ResponseManage({
      error: error, responseData: responseData, response: response, messageObject: {
        success: "Get review successfully",
        error: "Error fetching review"
      }
    })

  });
};

exports.createReview = ({ request, response }) => {
  const reviewData = request.body;


  CommonQuery.createItem({
    querySyntex: 'INSERT INTO review SET ?', ItemData: reviewData, callback: (error, responseData) =>

      ResponseManage({
        error: error, responseData: responseData, response: response, messageObject: {
          success: "Review created successfully",
          error: "Error in creating review"
        }
      })
  });
};

exports.updateReview = ({ request, response }) => {

  const reviewId = request.params.reviewId;
  const userData = request.body;

  CommonQuery.updateItem({
    querySyntex: 'UPDATE review SET ? WHERE reviewId = ?', ItemData: userData, ItemId: reviewId, callback: (error, responseData) =>

      ResponseManage({
        error: error, responseData: responseData, response: response, messageObject: {
          error: "Error in updating review",
          success: "Review updated successfully"
        }
      })
  });
};

exports.deleteReview = ({ request, response }) => {
  const reviewId = request.params.reviewId;

  CommonQuery.deleteItem({
    querySyntex: 'DELETE FROM review WHERE reviewId = ?', ItemId: reviewId, callback: (error, responseData) =>

      ResponseManage({
        error: error, responseData: responseData, response: response, messageObject: {
          error: "Error in deleting review",
          success: "Review deleted successfully"
        }
      })
  });
};



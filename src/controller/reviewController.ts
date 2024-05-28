const ReviewModel = require('../query/reviewQuery');

exports.GetAllReviews = (request, response) => {
  ReviewModel.getAllReviews({ request: request, response: response });
};


exports.GetReviewById = (request, response) => {
  ReviewModel.getReviewById({ request: request, response: response });
};


exports.CreateReview = (request, response) => {
  ReviewModel.createReview({ request: request, response: response });
};


exports.UpdateReview = (request, response) => {
  ReviewModel.updateReview({ request: request, response: response });
};

exports.DeleteReview = (request, response) => {
  ReviewModel.deleteReview({ request: request, response: response });
};
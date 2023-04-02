const ReviewModel = require('../models/review-model')
class ReviewService{
    async createReview(data){
        const res = await ReviewModel.create(data);
        return res;
    }
}

module.exports = new ReviewService()
const CommentModel = require('../models/comment-model');


class CommentService {

   async createComment(userId, text){
       console.log(userId, text)
       return (await CommentModel.create({author: userId, text}));
   }

}

module.exports = new CommentService();

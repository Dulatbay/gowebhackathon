const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    content: { type: String, required: true },
    images: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    brandLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tags: [{type: String}],
    views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

HistorySchema.methods.addComment = async function(commentId) {
    this.comments.push(commentId);
    await this.save();
}


module.exports = mongoose.model('History', HistorySchema);

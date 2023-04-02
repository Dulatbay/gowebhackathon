const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true}],
    createdAt: { type: Date, default: Date.now },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isActivated: {type: Boolean, default: false},
    supportBrands: [{type: mongoose.Schema.Types.ObjectId, ref: 'Brand'}],
    tags: [{type: String}],
});


BlogSchema.methods.addComment = async function(commentId) {
    this.comments.push(commentId);
    await this.save();
}


module.exports = mongoose.model('Blog', BlogSchema);

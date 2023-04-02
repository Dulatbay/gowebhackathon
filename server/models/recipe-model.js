const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    authors: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    content: { type: String, required: true },
    images: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    brandLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isActivated: {type: Boolean, default: false},
    supportBrands: [{type: mongoose.Schema.Types.ObjectId, ref: 'Brand'}],
    tags: [{type: String}],
});


RecipeSchema.methods.addComment = async function(commentId) {
    this.comments.push(commentId);
    await this.save();
}
module.exports = mongoose.model('Recipe', RecipeSchema);

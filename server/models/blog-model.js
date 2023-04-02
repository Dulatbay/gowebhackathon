const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    createdAt: { type: Date, default: Date.now },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    brandLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }],
    comments: [{
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    }],
    saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isActivated: {type: Boolean, default: false},
    supportBrands: [{type: mongoose.Schema.Types.ObjectId, ref: 'Brand'}],
    tags: [{type: String}],
});

module.exports = mongoose.model('Blog', BlogSchema);

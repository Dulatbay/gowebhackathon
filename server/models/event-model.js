const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    eventAt: { type: Date, require: true },
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
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    supportBrands: [{type: mongoose.Schema.Types.ObjectId, ref: 'Brand'}],
    tags: [{type: String}],
    addresses: [{type: String, required: true}],
});

module.exports = mongoose.model('Event', EventSchema);

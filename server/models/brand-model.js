const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    founders: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    createdAt: {type: Date, default: Date.now},
    description: {type: String, require: true},
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    isActivated: {type: Boolean, default: false},
    addresses: [{type: String}],
});


module.exports = mongoose.model('Brand', BrandSchema);

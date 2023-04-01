const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    founders: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    name: {type: String, require: true},
    createdAt: {type: Date, default: Date.now},
    image: {type: String},
    description: {type: String, require: true},
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    isActivated: {type: Boolean, default: false},
    addresses: [{type: String}],
});


module.exports = mongoose.model('Brand', BrandSchema);

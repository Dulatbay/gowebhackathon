const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    founders: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    name: {type: String, require: true},
    createdAt: {type: Date, default: Date.now},
    description: {type: String, require: true},
    usersFollowers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    userSubscriptions: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    brandsSubscriptions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Brand'}],
    brandsFollowers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Brand'}],
    isActivated: {type: Boolean, default: false},
    addresses: [{type: String}],
});


module.exports = mongoose.model('Brand', BrandSchema);

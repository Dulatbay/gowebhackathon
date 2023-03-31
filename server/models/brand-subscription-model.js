const mongoose = require('mongoose');

const BrandSubscriptionSchema = new mongoose.Schema({
    subscriber: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    subscribedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model('BrandSubscription', BrandSubscriptionSchema);

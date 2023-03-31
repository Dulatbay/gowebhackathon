const mongoose = require('mongoose');

const UserSubscriptionSchema = new mongoose.Schema({
    subscriber: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    subscribedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model('UserSubscription', UserSubscriptionSchema);
;
const mongoose = require('mongoose');

const UserSubscriptionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userSubscriptions: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userFollowers: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    brandFollowers: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    brandSubscriptions: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});


module.exports = mongoose.model('UserSubscription', UserSubscriptionSchema);
;
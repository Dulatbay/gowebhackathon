const UserSubscription = require('../models/user-subscription-model');

class UserSubscriptionService {
    async subscribeToUser(userId, userToSubscribeId) {

        const userSubscription = await UserSubscription.findOne({ user: userToSubscribeId });
        const user = await UserSubscription.findOne({ user: userId });

        user.userSubscriptions.push(userSubscription._id);
        userSubscription.followers.push(user._id);

        await userSubscription.save();
        await user.save();
        return userSubscription;
    }

    async subscribeToBrand(userId, brandToSubscribeId) {
        const userSubscription = await UserSubscription.findOne({ user: userId });
        userSubscription.brandSubscriptions.push(brandToSubscribeId);
        await userSubscription.save();
        return userSubscription;
    }

    async subscribeToEvent(userId, eventToSubscribeId) {
        const userSubscription = await UserSubscription.findOne({ user: userId });
        userSubscription.eventSubscriptions.push(eventToSubscribeId);
        await userSubscription.save();
        return userSubscription;
    }
}

module.exports = UserSubscriptionService;

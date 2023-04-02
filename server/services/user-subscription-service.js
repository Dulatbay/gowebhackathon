const UserSubscriptionModel = require('../models/user-subscription-model');
const BrandModel = require('../models/user-subscription-model');
const EventModel = require('../models/event-model');

class UserSubscriptionService {
    async subscribeToUser(userId, userToSubscribeId) {

        const userSubscription = await UserSubscriptionModel.findOne({user: userToSubscribeId});
        const user = await UserSubscriptionModel.findOne({user: userId});

        user.userSubscriptions.push(userSubscription._id);
        userSubscription.followers.push(user._id);

        await userSubscription.save();
        await user.save();
        return userSubscription;
    }

    async subscribeToBrand(userId, brandId) {
        const userSubscription = await UserSubscriptionModel.findOne({user: userId});
        userSubscription.brandSubscriptions.push(brandId);
        const brand = await BrandModel.findById(brandId);
        brand.followers.push(userId);
        await brand.save()
        await userSubscription.save();
        return userSubscription;
    }

    async subscribeToEvent(userId, eventId) {
        const userSubscription = await UserSubscriptionModel.findOne({user: userId});
        userSubscription.eventSubscriptions.push(eventId);
        const event = await EventModel.findById(eventId)
        event.followers.push(userId);
        await event.save();
        await userSubscription.save();
        return userSubscription;
    }
}

module.exports = new UserSubscriptionService();

const EventModel = require('../models/event-model')
class EventService{
    async create(eventData){
        const event = await EventModel.create(eventData);
        return event
    }

    async getAllEvents() {
        return (await EventModel.find({}));
    }
    async getPopularEvents() {
        const events = await EventModel.find()
            .sort({likes: -1})
            .populate('author', '-password')
            .limit(10);
        return events;
    }
}

module.exports = new EventService();
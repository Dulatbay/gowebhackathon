const EventModel = require("../models/event-model");
const ApiError = require("../exceptions/api-error");

class EventService {
    async getAllEvents() {
        const events = await EventModel.find({})
            .populate('authors', 'username')
            .populate('likes', 'username')
            .populate('brandLikes', 'name')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username'
                }
            })
            .populate('saves', 'username')
            .populate('shares', 'username')
            .populate('followers', 'username')
            .populate('supportBrands', 'name');
        return events;
    }

    async getPopularEvents() {
        const events = await EventModel.find()
            .sort({followers: -1})
            .populate('authors', 'username')
            .populate('likes', 'username')
            .populate('brandLikes', 'name')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username'
                }
            })
            .populate('saves', 'username')
            .populate('shares', 'username')
            .populate('followers', 'username')
            .populate('supportBrands', 'name');
        return events;
    }

    async getMostViewedEvents() {
        const events = await EventModel.find()
            .sort({views: -1})
            .populate('authors', 'username')
            .populate('likes', 'username')
            .populate('brandLikes', 'name')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username'
                }
            })
            .populate('saves', 'username')
            .populate('shares', 'username')
            .populate('followers', 'username')
            .populate('supportBrands', 'name');
        return events;
    }

    async getNewestEvents() {
        const events = await EventModel.find()
            .sort({createdAt: -1})
            .populate('authors', 'username')
            .populate('likes', 'username')
            .populate('brandLikes', 'name')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username'
                }
            })
            .populate('saves', 'username')
            .populate('shares', 'username')
            .populate('followers', 'username')
            .populate('supportBrands', 'name');
        return events;
    }

    async createEvent(eventData) {
        return (await EventModel.create(eventData));
    }

    async getEventById(id) {
        const event = await EventModel.findById(id)
            .populate('authors', 'username')
            .populate('likes', 'username')
            .populate('brandLikes', 'name')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username'
                }
            })
            .populate('saves', 'username')
            .populate('shares', 'username')
            .populate('followers', 'username')
            .populate('supportBrands', 'name');
        return event;
    }

    async updateEvent(eventId, eventData) {
        const event = await EventModel.findByIdAndUpdate(
            eventId,
            {$set: eventData},
            {new: true}
        );
        return event;
    }

    async deleteEvent(id) {
        const event = await EventModel.findByIdAndDelete(id);
        return event;
    }

    async confirmEvent(id) {
        const event = await EventModel.findByIdAndUpdate(id, {isActivated: true}, {new: true})
        return event;
    }

    async banEvent(id) {
        const event = await EventModel.findByIdAndUpdate(id, {isActivated: false}, {new: true})
        return event;
    }

    async getEventsByUser(userId) {
        const events = await EventModel.find({authors: userId})
        return events;
    }


    async addTag(eventId, tag) {
        const event = await EventModel.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        if (!event.tags.includes(tag)) {
            event.tags.push(tag);
            await event.save();
        }
        return event;
    }

    async removeTag(eventId, tag) {
        const event = await EventModel.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        const index = event.tags.indexOf(tag);
        if (index !== -1) {
            event.tags.splice(index, 1);
            await event.save();
        }
        return event;
    }

    async addLike(eventId, userId) {
        const event = await EventModel.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        if (!event.likes.includes(userId)) {
            event.likes.push(userId);
            await event.save();
        } else throw ApiError.BadRequest('User already liked it')
        return event;
    }

    async removeLike(eventId, userId) {
        const event = await EventModel.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        const index = event.likes.indexOf(userId);
        if (index !== -1) {
            event.likes.splice(index, 1);
            await event.save();
        } else throw ApiError.BadRequest('User not liked it')
        return event;
    }

    async addComment(eventId, commentId) {
        const event = await EventModel.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        await event.addComment(commentId);
        return event;
    }
}

// todo: delete same codes

module.exports = new EventService();

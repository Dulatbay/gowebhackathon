const commentService = require('../services/comment-service');
const eventService = require('../services/event-service');
const fileService = require('../services/file-service');
const ApiError = require("../exceptions/api-error");

class EventController {
    async createEvent(req, res, next) {
        try {
            const images = req.files?.images;
            const arrPathImages = await fileService.getImages(images);
            const tags = req.body?.tags;
            const eventData = {
                ...req.body, images: arrPathImages,
                tags: tags?.split(' ')
            }


            const event = await eventService.createEvent(eventData);
            return res.json(event);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const {id} = req.params;
            const event = await eventService.getEventById(id);
            return res.json(event);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async getAllEvents(req, res, next) {
        try {
            const events = await eventService.getAllEvents();
            return res.json(events);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async getPopularEvents(req, res, next) {
        try {
            const events = await eventService.getPopularEvents();
            return res.json(events);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async getNewestEvent(req, res, next) {
        try {
            const events = await eventService.getNewestEvents();
            return res.json(events);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async getMostViewedEvents(req, res, next) {
        try {
            const events = await eventService.getMostViewedEvents();
            return res.json(events);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async getUserEvents(req, res, next) {
        try {
            const userId = req.params.userId;
            const events = await eventService.getEventsByUser({userId});
            return res.json(events);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async updateEvent(req, res, next) {
        try {
            const eventId = req.params.id;
            const eventData = req.body;
            const events = await eventService.updateEvent({eventId}, {eventData});
            return res.json(events);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async deleteEvent(req, res, next) {
        try {
            const eventId = req.params.id;
            const result = await eventService.deleteEvent({eventId});
            return res.json(result);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async confirmEvent(req, res, next) {
        try {
            const id = req.params.id;
            return res.json(await eventService.confirmEvent(id))
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async banEvent(req, res, next) {
        try {
            const id = req.params.id;
            return res.json(await eventService.banEvent(id))
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async addComment(req, res, next) {
        try {
            const comment = await commentService.createComment(req.user.id, req.body.text);
            console.log(comment)
            const result = await eventService.addComment(req.params.id, comment._id);
            console.log(result)
            return res.json()
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    async addLike(req, res, next) {
        try {
            const eventId = req.params.id
            const userId = req.user.id
            const result = await eventService.addLike(eventId, userId);
            return res.json(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async removeLike(req, res, next) {
        try {
            const eventId = req.params.id
            const userId = req.user.id
            const result = await eventService.removeLike(eventId, userId);
            return res.json(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async addTag(req, res, next) {
        try {
            const tag = req.body.tag
            const eventId = req.params.id
            const result = await eventService.addTag(eventId, tag);
            return res.json(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async removeTag(req, res, next) {
        try {
            const tag = req.body.tag
            const eventId = req.params.id
            const result = await eventService.removeTag(eventId, tag);
            return res.json(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


}

module.exports = new EventController();
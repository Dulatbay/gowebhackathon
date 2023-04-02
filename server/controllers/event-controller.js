const commentService = require('../services/comment-service');
const eventService = require('../services/event-service');
const fileService = require('../services/file-service');
const ApiError = require("../exceptions/api-error");

class EventController {
    async create(req, res, next) {
        try {
            const images = req.files?.images;
            const arrPathImages = await fileService.getImages(images);

            const blogData = {...req.body, images: arrPathImages};

            const blog = await eventService.createEvent(blogData);
            return res.json(blog);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const {id} = req.params;
            const blog = await eventService.getEventById(id);
            return res.json(blog);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async getAllEvents(req, res, next) {
        try {
            const blogs = await eventService.getAllEvents();
            return res.json(blogs);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async getPopularEvents(req, res, next) {
        try {
            const blogs = await eventService.getPopularEvents();
            return res.json(blogs);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async getNewestEvent(req, res, next) {
        try {
            const blogs = await eventService.getNewestEvents();
            return res.json(blogs);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async getMostViewedEvents(req, res, next) {
        try {
            const blogs = await eventService.getMostViewedEvents();
            return res.json(blogs);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async getUserEvents(req, res, next) {
        try {
            const userId = req.params.userId;
            const blogs = await eventService.getEventsByUser({userId});
            return res.json(blogs);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async updateEvent(req, res, next) {
        try {
            const blogId = req.params.id;
            const blogData = req.body;
            const blogs = await eventService.updateEvent({blogId}, {blogData});
            return res.json(blogs);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async deleteEvent(req, res, next) {
        try {
            const blogId = req.params.id;
            const result = await eventService.deleteEvent({blogId});
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
            const blogId = req.params.id
            const userId = req.user.id
            const result = await eventService.addLike(blogId, userId);
            return res.json(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async removeLike(req, res, next) {
        try {
            const blogId = req.params.id
            const userId = req.user.id
            const result = await eventService.removeLike(blogId, userId);
            return res.json(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async addTag(req, res, next) {
        try {
            const tag = req.body.tag
            const blogId = req.params.id
            const result = await eventService.addTag(blogId, tag);
            return res.json(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async removeTag(req, res, next) {
        try {
            const tag = req.body.tag
            const blogId = req.params.id
            const result = await eventService.removeTag(blogId, tag);
            return res.json(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


}

module.exports = new EventController();
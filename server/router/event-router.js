const Router = require('express')
const eventController = require('../controllers/event-controller')
const multipartMiddleware = require('../middlewares/multipart-middleware')
const authMiddleware = require('../middlewares/auth-middlware')
const {body} = require("express-validator");
const eventRouter = new Router();

eventRouter.post('/',
    authMiddleware,
    multipartMiddleware,
    body("title").exists(),
    body("content").exists(),
    eventController.createEvent)



eventRouter.get("/", eventController.getAllEvents)
eventRouter.get("/:id", eventController.getEventById)
eventRouter.get("/popular", eventController.getPopularEvents)
eventRouter.get("/most-viewed", eventController.getMostViewedEvents)
eventRouter.get("/newest", eventController.getNewestEvent)
eventRouter.get("/user/:userId", eventController.getUserEvents)

eventRouter.put("/:id", authMiddleware, multipartMiddleware, eventController.updateEvent)

eventRouter.delete("/:id", authMiddleware, eventController.deleteEvent)


eventRouter.get("/activate/:id", eventController.confirmEvent)
eventRouter.get("/ban/:id", eventController.banEvent)



eventRouter.patch("/:id/like", authMiddleware, eventController.addLike);
eventRouter.delete("/:id/like", authMiddleware, eventController.removeLike);


eventRouter.patch("/:id/tag", authMiddleware, eventController.addTag)
eventRouter.delete("/:id/tag", authMiddleware, eventController.removeTag)


module.exports = eventRouter


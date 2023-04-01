const Router = require('express')
const historyController = require('../controllers/history-controller')
const authMiddleware = require('../middlewares/auth-middlware')
const historyRouter = new Router();

historyRouter.post('/', authMiddleware, historyController.createHistory)

historyRouter.get("/", historyController.getAllHistories)

historyRouter.get("/:id", historyController.getHistoryById)

historyRouter.get("/popular", historyController.getPopularHistories)

historyRouter.get("/most-viewed", historyController.getMostViewedHistories)

historyRouter.get("/newest", historyController.getNewestHistories)

historyRouter.get("/user/:userId", historyController.getUserHistories)

historyRouter.put("/:id", authMiddleware, historyController.updateHistory)

historyRouter.delete("/:id", authMiddleware, historyController.deleteHistory)



module.exports = historyRouter


const Router = require('express').Router;
const authMiddleware = require('../middlewares/auth-middlware')
const userController = require('../controllers/user-controller')

const userRouter = new Router();



userRouter.get("/", authMiddleware, userController.getUsers)

userRouter.get("/:id", authMiddleware, userController.getUserById)

module.exports = userRouter

const Router = require('express').Router;
const authMiddleware = require('../middlewares/auth-middlware')
const userController = require('../controllers/user-controller')

const userRouter = new Router();


// TODO: убрал перехватчик для дева
userRouter.get("/", userController.getUsers)
userRouter.get("/:id", userController.getUserById)
userRouter.get("/email/:email", userController.getUserByEmail)

module.exports = userRouter

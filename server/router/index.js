const Router = require('express').Router;
const authRouter = require('./auth-router')
const userRouter = require('./user-router')


const router = new Router();

router.use('/auth', authRouter)

router.use("/users", userRouter)

module.exports = router

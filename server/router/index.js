const Router = require('express').Router;
const authRouter = require('./auth-router')
const userRouter = require('./user-router')
const historyRouter = require('./history-router')
const blogRouter = require('./blog-router')
const recipeRouter = require('./recipe-router')
const brandRouter = require('./brand-router')


const router = new Router();

router.use('/auth', authRouter)

router.use("/users", userRouter)

router.use('/histories', historyRouter)

router.use('/blogs', blogRouter)

router.use('/recipes', recipeRouter)

router.use('/brands', brandRouter)




module.exports = router

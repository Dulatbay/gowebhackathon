const Router = require('express')
const {body} = require('express-validator')
const authController = require('../controllers/auth-controller')
const authRouter = new Router();


authRouter.post('/login',
    body("email").isEmail(),
    body("password").isLength({min: 4, max: 32}),
    authController.login)


authRouter.post("/logout",    authController.logout)

authRouter.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 4, max: 32}),
    authController.registration)

authRouter.get("/activate/:link", authController.activate)

authRouter.get("/refresh", authController.refresh)



module.exports = authRouter


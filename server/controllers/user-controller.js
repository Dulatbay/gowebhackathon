const userService = require("../services/user-service");

class UserController {
    async getUsers(req, res, next) {
        try {
            res.json(await userService.getAllUsers())
        } catch (e) {
            next(e);
        }
    }

    async getUserById(req, res, next) {
        try {
            const {id} = req.params
            const user = await userService.getUserById(id);
            res.json(user)
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
    async getUserByEmail(req, res, next) {
        try {
            const {email} = req.params
            const user = await userService.getUserByEmail(email);
            res.json(user)
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

}

module.exports = new UserController();

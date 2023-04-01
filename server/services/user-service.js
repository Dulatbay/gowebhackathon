const userModel = require('../models/user-model');
class UserService {
    async getAllUsers() {
        return (await userModel.find({}));
    }

    async getUserById(id) {
        return (await userModel.findById(id));
    }
}

module.exports = new UserService()
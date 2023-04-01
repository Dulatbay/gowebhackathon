const userModel = require('../models/user-model');
class UserService {
    async getAllUsers() {
        return (await userModel.find({}));
    }

    async getUserById(id) {
        return (await userModel.findById(id));
    }
    async getUserByEmail(email) {
        return (await userModel.find({email}));
    }
}

module.exports = new UserService()
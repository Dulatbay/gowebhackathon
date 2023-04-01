module.exports = class UserDto{
    email
    id
    isActivated
    roles
    constructor(model) {
        this.email = model.email
        this.isActivated = model.isActivated
        this.id = model._id
        this.roles = model.roles
    }
}
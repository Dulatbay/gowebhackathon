const {Schema, model, Decimal128} = require("mongoose");

const roles = ["ADMIN", "MANAGER", "USER"]

const UserSchema = new Schema({
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    username: {type: String, require: false, unique: true},
    roles: [{type: String, enum: roles}],
    isActivated: {type: String, default: false},
    leaves: {type: Decimal128, default: 0},
})

module.exports = model("User", UserSchema);
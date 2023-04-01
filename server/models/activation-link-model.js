const {Schema, model} = require("mongoose");


const ActivationLinkSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    creatAt: {type: Date, default: Date.now},
    activationLink: {type: String, require: true, unique: true}
})
module.exports = model("ActivationLink", ActivationLinkSchema);

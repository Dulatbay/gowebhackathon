const {Schema, model} = require("mongoose");


const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    creatAt: {type: Date, default: Date.now},
    activationLink: {type: String, require: true}
})
module.exports = model("Token", TokenSchema);

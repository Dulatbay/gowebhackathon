const {Schema, model} = require("mongoose");


const ReviewSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    rating: {type: Schema.Types.Number, require: true},
    text: {type: Schema.Types.String, require: true},
    createAt: {type: Date, default: Date.now},
})

module.exports = model("Review", ReviewSchema);

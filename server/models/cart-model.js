const {Schema, model} = require("mongoose");


const CartSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
})
module.exports = model("Cart", CartSchema);

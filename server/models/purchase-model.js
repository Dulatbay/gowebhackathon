const {Schema, model, Decimal128} = require("mongoose");


const PurchaseSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    createAt: {type: Date, default: Date.now},
    price: {type: Decimal128, require: true}
})

module.exports = model("Purchase", PurchaseSchema);

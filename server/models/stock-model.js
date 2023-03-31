const {Schema, model, Float} = require("mongoose");


const StockSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    createAt: {type: Date, default: Date.now},
    endAt: {type: Date, require: true},
    percent: {type: Float, require: true}
})

module.exports = model("Stock", StockSchema);

const {Schema, model, Decimal128} = require("mongoose");


const ProductSchema = new Schema({
    brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
    categories: [{type: Schema.Types.ObjectId, ref: 'Category', require: true}],
    price: {type: Decimal128, require: true},
    title: {type: String, require: true},
    content: {type: String, require: true},
    images: [{type: String}],
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
})

module.exports = model("Product", ProductSchema);

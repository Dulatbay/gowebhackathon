const {Schema, model, Decimal128} = require("mongoose");


const ProductSchema = new Schema({
    brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
    categories: [{type: Schema.Types.ObjectId, ref: 'Category', require: true}],
    price: {type: Decimal128, require: true},
    title: {type: String, require: true},
    content: {type: String, require: true},
    reviews: [{
        user: {type: Schema.Types.ObjectId, ref: 'User'},
        rating: {type: Schema.Types.Number, require: true},
        content: {type: Schema.Types.String, require: true},
        createAt: {type: Date, require: Date.now},
    }]
})

module.exports = model("Product", ProductSchema);

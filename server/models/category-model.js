const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    categoryName: { type: String, require: true },
});

module.exports = mongoose.model('Category', CategorySchema);

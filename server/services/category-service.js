const Category = require('../models/category-model');


class CategoryService {

    async getAllCategories() {
        return (await Category.find());
    };

    async getCategoryById(categoryId) {
        return (await Category.findById(categoryId));
    };

    async createCategory(categoryData) {
        const category = new Category(categoryData);
        return await category.save();
    };

    async updateCategory(categoryId, categoryData) {
        return (await Category.findByIdAndUpdate(categoryId, categoryData, {new: true}));
    };

    async deleteCategory(categoryId) {
        return (await Category.findByIdAndRemove(categoryId));
    };
}

module.exports = new CategoryService();

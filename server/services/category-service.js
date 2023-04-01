const CategoryModel = require('../models/category-model');


class CategoryService {

    async getAllCategories() {
        return (await CategoryModel.find());
    };

    async getCategoryById(categoryId) {
        return (await CategoryModel.findById(categoryId));
    };

    async createCategory(categoryData) {
        const category = new CategoryModel(categoryData);
        return await category.save();
    };

    async updateCategory(categoryId, categoryData) {
        return (await CategoryModel.findByIdAndUpdate(categoryId, categoryData, {new: true}));
    };

    async deleteCategory(categoryId) {
        return (await CategoryModel.findByIdAndRemove(categoryId));
    };
}

module.exports = new CategoryService();

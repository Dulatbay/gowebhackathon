const categoryService = require('../services/category-service');
const fileService = require("../services/file-service");
class CategoryController {
    async getAllCategories(req, res) {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    };

    async getCategoryById(req, res) {
        const categoryId = req.params.id;
        const category = await categoryService.getCategoryById(categoryId);
        res.json(category);
    };

    async createCategory(req, res) {
        const image = req.files?.image;
        const pathImage = await fileService.saveFile(image)

        const categoryData = {...req.body, image: pathImage};
        const category = await categoryService.createCategory(categoryData);
        res.json(category);
    };

    async updateCategory(req, res) {
        const categoryId = req.params.id;
        const categoryData = req.body;
        const updatedCategory = await categoryService.updateCategory(categoryId, categoryData);
        res.json(updatedCategory);
    };

    async deleteCategory (req, res){
        const categoryId = req.params.id;
        await categoryService.deleteCategory(categoryId);
        res.sendStatus(204);
    };
}

module.exports = new CategoryController()
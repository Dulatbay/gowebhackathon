const {Router} = require("express");
const categoryController = require('../controllers/category-controller');




const categoryRouter = new Router()


categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/:id', categoryController.getCategoryById);
categoryRouter.post('/', categoryController.createCategory);
categoryRouter.put('/:id', categoryController.updateCategory);
categoryRouter.delete('/:id', categoryController.deleteCategory);

module.exports = categoryRouter;
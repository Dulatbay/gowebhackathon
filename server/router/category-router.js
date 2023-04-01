const {Router} = require("express");
const categoryController = require('../controllers/category-controller');
const authMiddleware = require('../middlewares/auth-middlware')
const managerMiddleware = require('../middlewares/manager-middleware')
const multipartMiddleware = require('../middlewares/multipart-middleware')


const categoryRouter = new Router()


categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/:id', categoryController.getCategoryById);
categoryRouter.post('/', authMiddleware, multipartMiddleware, managerMiddleware, categoryController.createCategory);
categoryRouter.put('/:id', authMiddleware, multipartMiddleware, managerMiddleware, categoryController.updateCategory);
categoryRouter.delete('/:id', authMiddleware, managerMiddleware, categoryController.deleteCategory);

module.exports = categoryRouter;
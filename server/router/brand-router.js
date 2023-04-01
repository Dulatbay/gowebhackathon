const {Router} = require("express");
const brandController = require('../controllers/brand-сontroller');
const multipartMiddleware = require("../middlewares/multipart-middleware");
const authMiddleware = require("../middlewares/auth-middlware");


const brandRouter = new Router()


brandRouter.get('/', brandController.getAllBrands);
brandRouter.get('/:id', brandController.getBrandById);
brandRouter.post('/', authMiddleware, multipartMiddleware, brandController.createBrand);
brandRouter.put('/:id', authMiddleware, multipartMiddleware, brandController.updateBrand);
brandRouter.delete('/:id', authMiddleware, brandController.deleteBrand);
brandRouter.get('/activate/:id', brandController.confirmBrand);
brandRouter.get('/ban/:id', brandController.banBrand);


module.exports = brandRouter;
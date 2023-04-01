const {Router} = require("express");
const brandController = require('../controllers/brand-сontroller');





const brandRouter = new Router()


brandRouter.get('/', brandController.getAllBrands);
brandRouter.get('/:id', brandController.getBrandById);
brandRouter.post('/', brandController.createBrand);
brandRouter.put('/:id', brandController.updateBrand);
brandRouter.delete('/:id', brandController.deleteBrand);


module.exports = brandRouter;
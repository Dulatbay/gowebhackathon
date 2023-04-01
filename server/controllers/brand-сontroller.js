const brandService = require('../services/brand-service');
const blogService = require("../services/blog-service");
const ApiError = require("../exceptions/api-error");

class BrandController {
    async getAllBrands(req, res, next) {
        const brands = await brandService.getAllBrands();
        res.json(brands);
    }

    async getBrandById(req, res, next) {
        const { id } = req.params;
        const brand = await brandService.getBrandById(id);
        res.json(brand);
    }

    async createBrand(req, res, next) {
        const brandData = req.body;
        const brand = await brandService.createBrand(brandData);
        res.json(brand);
    }

    async updateBrand(req, res, next) {
        const { id } = req.params;
        const brandData = req.body;
        const brand = await brandService.updateBrand(id, brandData);
        res.json(brand);
    }

    async deleteBrand(req, res, next) {
        const { id } = req.params;
        const brand = await brandService.deleteBrand(id);
        res.json(brand);
    }
    async confirmBrand(req, res, next) {
        try {
            const id = req.params.id;
            return res.json(await brandService.confirmBrand(id))
        } catch (error) {
            next(ApiError.BadRequest(`ValidatorError - ${error.message}`))
        }
    }
    async banBrand(req, res) {
        try {
            const id = req.params.id;
            return res.json(await brandService.banBrand(id))
        } catch (error) {
            next(ApiError.BadRequest(`ValidatorError - ${error.message}`))
        }
    }
}

module.exports = new BrandController();

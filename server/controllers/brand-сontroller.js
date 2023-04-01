const brandService = require('../services/brand-service');

class BrandController {
    async getAllBrands(req, res) {
        const brands = await brandService.getAllBrands();
        res.json(brands);
    }

    async getBrandById(req, res) {
        const { id } = req.params;
        const brand = await brandService.getBrandById(id);
        res.json(brand);
    }

    async createBrand(req, res) {
        const brandData = req.body;
        const brand = await brandService.createBrand(brandData);
        res.json(brand);
    }

    async updateBrand(req, res) {
        const { id } = req.params;
        const brandData = req.body;
        const brand = await brandService.updateBrand(id, brandData);
        res.json(brand);
    }

    async deleteBrand(req, res) {
        const { id } = req.params;
        const brand = await brandService.deleteBrand(id);
        res.json(brand);
    }
}

module.exports = new BrandController();

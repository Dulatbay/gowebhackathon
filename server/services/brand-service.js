const BrandModel = require('../models/brand-model');
class BrandService {
    async getAllBrands() {
        const brands = await BrandModel.find();
        return brands;
    }

    async getBrandById(brandId) {
        const brand = await BrandModel.findById(brandId);
        return brand;
    }

    async createBrand(brandData) {
        const brand = await BrandModel.create(brandData);
        return brand;
    }

    async updateBrand(brandId, brandData) {
        const brand = await BrandModel.findByIdAndUpdate(brandId, brandData, { new: true });
        return brand;
    }

    async deleteBrand(brandId) {
        const brand = await BrandModel.findByIdAndDelete(brandId);
        return brand;
    }

    async confirmBrand(id) {
        const blog = await BrandModel.findByIdAndUpdate(id, {isActivated: true}, {new: true})
        return blog;
    }

    async banBrand(id) {
        const blog = await BrandModel.findByIdAndUpdate(id, {isActivated: false}, {new: true})
        return blog;
    }
}

module.exports = new BrandService();

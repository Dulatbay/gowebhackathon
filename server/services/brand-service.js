const BrandModel = require("../models/brand-model");
const ApiError = require("../exceptions/api-error");

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
        const brand = await BrandModel.findByIdAndUpdate(brandId, brandData, {new: true});
        return brand;
    }

    async deleteBrand(brandId) {
        const brand = await BrandModel.findByIdAndDelete(brandId);
        return brand;
    }

    async confirmBrand(id) {
        const brand = await BrandModel.findByIdAndUpdate(id, {isActivated: true}, {new: true})
        return brand;
    }

    async banBrand(id) {
        const brand = await BrandModel.findByIdAndUpdate(id, {isActivated: false}, {new: true})
        return brand;
    }

    async addReview(brandId, reviewId) {
        const brand = await BrandModel.findById(brandId);
        if (!brand) throw ApiError.NotFound('Brand not found');
        brand.reviews.push(reviewId);
        await brand.save();
        return brand
    }
}

module.exports = new BrandService();

const BrandModel = require('../models/brand-model');
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
        const brand = await BrandModel.findByIdAndUpdate(brandId, brandData, { new: true });
        return brand;
    }

    async deleteBrand(brandId) {
        const brand = await BrandModel.findByIdAndDelete(brandId);
        return brand;
    }
    async brandSubscribeToBrand(fromId, toId) {
        try {
            const toBrand = await BrandModel.findById(toId);
            const fromBrand = await BrandModel.findById(fromId)
            if (!toBrand || !fromBrand) throw ApiError.BadRequest('Brand not found');

            toBrand.brandsFollowers.addToSet(fromId);
            fromBrand.brandsSubscriptions.addToSet(toId);

            await toBrand.save();
            await fromBrand.save();
        } catch (err) {
            throw err;
        }
    }

    async userSubscribeToUser(fromId, toId) {
        try {
            const toUser = await BrandModel.findById(toId);
            const fromUser = await BrandModel.findById(fromId)
            if (!toBrand || !fromBrand) throw ApiError.BadRequest('Brand not found');

            toBrand.brandsFollowers.addToSet(fromId);
            fromBrand.brandsSubscriptions.addToSet(toId);

            await toBrand.save();
            await fromBrand.save();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new BrandService();

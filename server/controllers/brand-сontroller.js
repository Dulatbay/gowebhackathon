const brandService = require('../services/brand-service');
const blogService = require("../services/blog-service");
const ApiError = require("../exceptions/api-error");
const fileService = require("../services/file-service");
const recipeService = require("../services/recipe-service");
const reviewService = require("../services/review-service");

class BrandController {
    async getAllBrands(req, res, next) {
        const brands = await brandService.getAllBrands();
        res.json(brands);
    }

    async getBrandById(req, res, next) {
        const {id} = req.params;
        const brand = await brandService.getBrandById(id);
        res.json(brand);
    }

    async createBrand(req, res, next) {

        const image = req.files?.image;
        const pathImage = await fileService.getImages(image);

        const brandData = {...req.body, image: pathImage};
        const brand = await brandService.createBrand(brandData);
        res.json(brand);
    }

    async updateBrand(req, res, next) {
        const {id} = req.params;
        const brandData = req.body;
        const brand = await brandService.updateBrand(id, brandData);
        res.json(brand);
    }

    async deleteBrand(req, res, next) {
        const {id} = req.params;
        const brand = await brandService.deleteBrand(id);
        res.json(brand);
    }

    async confirmBrand(req, res, next) {
        try {
            const id = req.params.id;
            return res.json(await brandService.confirmBrand(id))
        } catch (error) {
            next(error);
        }
    }

    async banBrand(req, res, next) {
        try {
            const id = req.params.id;
            return res.json(await brandService.banBrand(id))
        } catch (error) {
            next(error);
        }
    }

    async createReview(req, res, next) {
        try {
            const id = req.params.id;
            const userId = req.user.id;
            const review = await reviewService.createReview({user: userId, ...req.body});
            const result = await brandService.addReview(id, review._id)
            return res.json(result)
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BrandController();

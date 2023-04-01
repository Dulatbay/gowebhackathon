const recipeService = require('../services/recipe-service');
const fileService = require('../services/file-service');
const ApiError = require("../exceptions/api-error");

class RecipeController {
    async createRecipe(req, res, next) {
        try {
            if (!req.headers['content-type'].startsWith('multipart/form-data')) next(ApiError.BadRequest('Its not form-data'))
            const images = req.files?.images;

            const arrPathImages = fileService.getImages(images);

            const recipeData = {...req.body, images: arrPathImages};
            const recipe = await recipeService.createRecipe(recipeData);

            return res.json(recipe);
        } catch (error) {
            next(error);
        }
    }

    async getRecipeById(req, res, next) {
        try {
            const {id} = req.params;
            const recipe = await recipeService.getRecipeById(id);
            return res.json(recipe);
        } catch (error) {
            next(error);
        }
    }
    async getAllRecipes(req, res, next) {
        try {
            const recipes = await recipeService.getAllRecipes();
            return res.json(recipes);
        } catch (error) {
            next(error);
        }
    }

    async getPopularRecipes(req, res, next) {
        try {
            const recipes = await recipeService.getPopularRecipes();
            return res.json(recipes);
        } catch (error) {
            next(error);
        }
    }
    async getNewestRecipe(req, res, next) {
        try {
            const recipes = await recipeService.getNewestRecipes();
            return res.json(recipes);
        } catch (error) {
            next(error);
        }
    }
    async getMostViewedRecipes(req, res, next) {
        try {
            const recipes = await recipeService.getMostViewedRecipes();
            return res.json(recipes);
        } catch (error) {
            next(error);
        }
    }

    async getUserRecipes(req, res, next) {
        try {
            const userId = req.params.userId;
            const recipes = await recipeService.getRecipesByUser({userId});
            return res.json(recipes);
        } catch (error) {
            next(error);
        }
    }

    async updateRecipe(req, res, next) {
        try {
            if (!req.headers['content-type'].startsWith('multipart/form-data')) next(ApiError.BadRequest('Its not form-data'))
            const recipeId = req.params.id;
            const recipeData = req.body;
            const recipes = await recipeService.updateRecipe({recipeId}, {recipeData});
            return res.json(recipes);
        } catch (error) {
            next(error);
        }
    }

    async deleteRecipe(req, res, next) {
        try {
            const recipeId = req.params.id;
            const result = await recipeService.deleteRecipe({recipeId});
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async confirmRecipe(req, res, next) {
        try{
            const id = req.params.id;
            return res.json(await recipeService.confirmRecipe(id))
        }catch (error){
            next(error)
        }
    }
    async banRecipe(req, res, next) {
        try{
            const id = req.params.id;
            return res.json(await recipeService.banRecipe(id))
        }catch (error){
            next(error)
        }
    }

}

module.exports = new RecipeController();
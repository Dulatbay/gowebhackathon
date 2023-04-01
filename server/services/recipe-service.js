const RecipeModel = require("../models/recipe-model");
class RecipeService {
    async getAllRecipes() {
        return (await RecipeModel.find({}));
    }
    async getPopularRecipes() {
        const recipes = await RecipeModel.find()
            .sort({likes: -1})
            .populate('author', '-password')
            .limit(10);
        return recipes;
    }

    async getMostViewedRecipes() {
        const recipes = await RecipeModel.find()
            .sort({views: -1})
            .populate('author', '-password')
            .limit(10);
        return recipes;
    }

    async getNewestRecipes() {
        const recipes = await RecipeModel.find()
            .sort({createdAt: -1})
            .populate('author', '-password')
            .limit(10);
        return recipes;
    }
    async createRecipe(recipeData) {
        return (await RecipeModel.create(recipeData));
    }

    async getRecipeById(id) {
        const recipe = await RecipeModel.findById(id)
            .populate('authors', 'username')
            .populate('likes', 'username')
            .populate('brandLikes', 'name')
            .populate('comments.author', 'username')
            .populate('saves', 'username')
            .populate('shares', 'username')
            .populate('supportBrands', 'name');
        return recipe;
    }

    async updateRecipe(recipeId, recipeData) {
        const recipe = await RecipeModel.findByIdAndUpdate(
            recipeId,
            {$set: recipeData},
            {new: true}
        );
        return recipe;
    }

    async deleteRecipe(id) {
        const recipe = await RecipeModel.findByIdAndDelete(id);
        return recipe;
    }

    async confirmRecipe(id) {
        const recipe = await RecipeModel.findByIdAndUpdate(id, {isActivated: true}, {new: true})
        return recipe;
    }

    async banRecipe(id) {
        const recipe = await RecipeModel.findByIdAndUpdate(id, {isActivated: false}, {new: true})
        return recipe;
    }
    async getRecipesByUser(userId) {
        const recipes = await RecipeModel.find({authors: userId})
            .populate('author', '-password')
            .populate({
                path: 'comments',
                populate: {path: 'author', select: '-password'},
            })
            .populate('likes', '-password')
            .populate('brandLikes', '-password')
            .populate('saves', '-password')
            .populate('shares', '-password')
            .populate('views', '-password');
        return recipes;
    }


}

module.exports = new RecipeService();

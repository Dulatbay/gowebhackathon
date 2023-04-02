
const RecipeModel = require("../models/recipe-model");

class RecipeService {
    async getAllRecipes() {
        return (await RecipeModel.find({}));
    }

    async getPopularRecipes() {
        const recipes = await RecipeModel.find()
            .sort({likes: -1})
            .populate('author', '-password')
        return recipes;
    }

    async getMostViewedRecipes() {
        const recipes = await RecipeModel.find()
            .sort({views: -1})
            .populate('author', '-password')
        return recipes;
    }

    async getNewestRecipes() {
        const recipes = await RecipeModel.find()
            .sort({createdAt: -1})
            .populate('author', '-password')
        return recipes;
    }

    async createRecipe(recipeData) {
        return (await RecipeModel.create(recipeData));
    }

    async getRecipeById(id) {
        const recipe = await RecipeModel.findById(id)
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
        return recipes;
    }


    async addComment(recipeId, commentId) {
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            throw new Error('Blog not found');
        }
        await recipe.addComment(commentId);
        return recipe;
    }

    async addTag(recipeId, tag) {
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            throw new Error('Blog not found');
        }
        if (!recipe.tags.includes(tag)) {
            recipe.tags.push(tag);
            await recipe.save();
        }
        return recipe;
    }

    async removeTag(recipeId, tag) {
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        const index = recipe.tags.indexOf(tag);
        if (index !== -1) {
            recipe.tags.splice(index, 1);
            await recipe.save();
        }
        return recipe;
    }

    async removeLike(recipeId, userId) {
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        const index = recipe.likes.indexOf(userId);
        if (index !== -1) {
            recipe.likes.splice(index, 1);
            await recipe.save();
        }
        return recipe;
    }

    async addLike(recipeId, userId) {
        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            throw new Error('Blog not found');
        }
        if (!recipe.likes.includes(userId)) {
            recipe.likes.push(userId);
            await recipe.save();
        }
        return recipe;
    }



}

module.exports = new RecipeService();

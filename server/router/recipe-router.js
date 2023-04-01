const Router = require('express')
const recipeController = require('../controllers/recipe-controller')
const authMiddleware = require('../middlewares/auth-middlware')
const recipeRouter = new Router();

recipeRouter.post('/', authMiddleware, recipeController.createRecipe)

recipeRouter.get("/", recipeController.getAllRecipes)

recipeRouter.get("/:id", recipeController.getRecipeById)

recipeRouter.get("/popular", recipeController.getPopularRecipes)

recipeRouter.get("/most-viewed", recipeController.getMostViewedRecipes)

recipeRouter.get("/newest", recipeController.getNewestRecipe)

recipeRouter.get("/user/:userId", recipeController.getRecipeById)

recipeRouter.put("/:id", authMiddleware, recipeController.updateRecipe)

recipeRouter.delete("/:id", authMiddleware, recipeController.deleteRecipe)


recipeRouter.get("/activate/:id", recipeController.confirmRecipe)

recipeRouter.get("/ban/:id", recipeController.banRecipe)


module.exports = recipeRouter


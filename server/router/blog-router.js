const Router = require('express')
const blogController = require('../controllers/blog-controller')
const multipartMiddleware = require('../middlewares/multipart-middleware')
const authMiddleware = require('../middlewares/auth-middlware')
const blogRouter = new Router();

blogRouter.post('/', authMiddleware, multipartMiddleware, blogController.createBlog)

blogRouter.get("/", blogController.getAllBlogs)

blogRouter.get("/:id", blogController.getBlogById)

blogRouter.get("/popular", blogController.getPopularBlogs)

blogRouter.get("/most-viewed", blogController.getMostViewedBlogs)

blogRouter.get("/newest", blogController.getNewestBlog)

blogRouter.get("/user/:userId", blogController.getUserBlogs)

blogRouter.put("/:id", authMiddleware, multipartMiddleware, blogController.updateBlog)

blogRouter.delete("/:id", authMiddleware, blogController.deleteBlog)


blogRouter.get("/activate/:id", blogController.confirmBlog)

blogRouter.get("/ban/:id", blogController.banBlog)


module.exports = blogRouter


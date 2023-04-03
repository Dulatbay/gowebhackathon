const Router = require('express')
const blogController = require('../controllers/blog-controller')
const multipartMiddleware = require('../middlewares/multipart-middleware')
const authMiddleware = require('../middlewares/auth-middlware')
const {body} = require("express-validator");
const blogRouter = new Router();

blogRouter.post('/',   authMiddleware,
                            multipartMiddleware,
                            body("title").exists(),
                            body("content").exists(),
                            blogController.createBlog)



blogRouter.get("/", blogController.getBlogs)
blogRouter.get("/:id", blogController.getBlogById)
blogRouter.get("/user/:userId", blogController.getUserBlogs)

blogRouter.put("/:id", authMiddleware, multipartMiddleware, blogController.updateBlog)

blogRouter.delete("/:id", authMiddleware, blogController.deleteBlog)


blogRouter.get("/activate/:id", blogController.confirmBlog)
blogRouter.get("/ban/:id", blogController.banBlog)



blogRouter.patch("/:id/comment",authMiddleware, blogController.addComment);

blogRouter.patch("/:id/like", authMiddleware, blogController.addLike);
blogRouter.delete("/:id/like", authMiddleware, blogController.removeLike);


blogRouter.patch("/:id/tag", authMiddleware, blogController.addTag)
blogRouter.delete("/:id/tag", authMiddleware, blogController.removeTag)


module.exports = blogRouter


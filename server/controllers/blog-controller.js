const commentService = require('../services/comment-service');
const blogService = require('../services/blog-service');
const fileService = require('../services/file-service');
const ApiError = require("../exceptions/api-error");
const BlogModel = require("../models/blog-model");

class BlogController {
    async createBlog(req, res, next) {
        try {
            const images = req.files?.images;
            const arrPathImages = await fileService.getImages(images);
            const tags = req.body?.tags;

            const blogData = {
                ...req.body,
                images: arrPathImages,
                tags: tags?.split(' ')
            };

            const blog = await blogService.createBlog(blogData);
            return res.json(blog);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async getBlogById(req, res, next) {
        try {
            const {id} = req.params;
            const blog = await blogService.getBlogById(id);
            return res.json(blog);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async getBlogs(req, res, next) {
        try {
            const blogsPerPage = req.query.limit || 10;  // limit
            const currentPage = req.query.page || 1;
            const sortBy = req.query.sort || '-createdAt';

            const skip = (currentPage - 1) * blogsPerPage;
            console.log(blogsPerPage, currentPage, sortBy, skip)
            const blogs = await blogService.getAllBlogs(skip, blogsPerPage, sortBy);
            const totalBlogs = await BlogModel.countDocuments({});
            const totalPages = Math.ceil(totalBlogs / blogsPerPage);

            res.json({
                blogs,
                currentPage,
                totalPages
            });
        } catch (error) {
            console.log(error);
            next(error)
        }
    }



    async getUserBlogs(req, res, next) {
        try {
            const userId = req.params.userId;
            const blogs = await blogService.getBlogsByUser({userId});
            return res.json(blogs);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async updateBlog(req, res, next) {
        try {
            const blogId = req.params.id;
            const blogData = req.body;
            const blogs = await blogService.updateBlog({blogId}, {blogData});
            return res.json(blogs);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async deleteBlog(req, res, next) {
        try {
            const blogId = req.params.id;
            const result = await blogService.deleteBlog({blogId});
            return res.json(result);
        } catch (error) {
            console.log(error);
            next(error)

        }
    }

    async confirmBlog(req, res, next) {
        try {
            const id = req.params.id;
            return res.json(await blogService.confirmBlog(id))
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async banBlog(req, res, next) {
        try {
            const id = req.params.id;
            return res.json(await blogService.banBlog(id))
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async addComment(req, res, next) {
        try {
            const comment = await commentService.createComment(req.user.id, req.body.text);
            console.log(comment)
            const result = await blogService.addComment(req.params.id, comment._id);
            console.log(result)
            return res.json()
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    async addLike(req, res, next) {
        try {
            const blogId = req.params.id
            const userId = req.user.id
            const result = await blogService.addLike(blogId, userId);
            return res.json(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async removeLike(req, res, next) {
        try {
            const blogId = req.params.id
            const userId = req.user.id
            const result = await blogService.removeLike(blogId, userId);
            return res.json(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async addTag(req, res, next) {
        try {
            const tag = req.body.tag
            const blogId = req.params.id
            const result = await blogService.addTag(blogId, tag);
            return res.json(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async removeTag(req, res, next) {
        try {
            const tag = req.body.tag
            const blogId = req.params.id
            const result = await blogService.removeTag(blogId, tag);
            return res.json(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


}

module.exports = new BlogController();
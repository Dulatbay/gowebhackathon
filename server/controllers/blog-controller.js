const blogService = require('../services/blog-service');
const fileService = require('../services/file-service');
const ApiError = require("../exceptions/api-error");
const BlogModel = require("../models/blog-model");

class BlogController {
    async createBlog(req, res, next) {
        try {
            const images = req.files?.images;
            const arrPathImages = await fileService.getImages(images);

            const blogData = {...req.body, images: arrPathImages};

            const blog = await blogService.createBlog(blogData);
            return res.json(blog);
        } catch (error) {
            console.log(error?.message);
            next(ApiError.BadRequest(`ValidatorError - ${error?.message}`))
        }
    }

    async getBlogById(req, res, next) {
        try {
            const {id} = req.params;
            const blog = await blogService.getBlogById(id);
            return res.json(blog);
        } catch (error) {
            next(ApiError.BadRequest(`ValidatorError - ${error.message}`))
        }
    }

    async getAllBlogs(req, res, next) {
        try {
            const blogs = await blogService.getAllBlogs();
            return res.json(blogs);
        } catch (error) {
            next(ApiError.BadRequest(`ValidatorError - ${error.message}`))

        }
    }

    async getPopularBlogs(req, res, next) {
        try {
            const blogs = await blogService.getPopularBlogs();
            return res.json(blogs);
        } catch (error) {
            next(ApiError.BadRequest(`ValidatorError - ${error.message}`))

        }
    }

    async getNewestBlog(req, res, next) {
        try {
            const blogs = await blogService.getNewestBlogs();
            return res.json(blogs);
        } catch (error) {
            next(ApiError.BadRequest(`ValidatorError - ${error.message}`))

        }
    }

    async getMostViewedBlogs(req, res, next) {
        try {
            const blogs = await blogService.getMostViewedBlogs();
            return res.json(blogs);
        } catch (error) {
            next(ApiError.BadRequest(`ValidatorError - ${error.message}`))

        }
    }

    async getUserBlogs(req, res, next) {
        try {
            const userId = req.params.userId;
            const blogs = await blogService.getBlogsByUser({userId});
            return res.json(blogs);
        } catch (error) {
            next(ApiError.BadRequest(`ValidatorError - ${error.message}`))

        }
    }

    async updateBlog(req, res, next) {
        try {
            const blogId = req.params.id;
            const blogData = req.body;
            const blogs = await blogService.updateBlog({blogId}, {blogData});
            return res.json(blogs);
        } catch (error) {
            next(ApiError.BadRequest(`ValidatorError - ${error.message}`))

        }
    }

    async deleteBlog(req, res, next) {
        try {
            const blogId = req.params.id;
            const result = await blogService.deleteBlog({blogId});
            return res.json(result);
        } catch (error) {
            next(ApiError.BadRequest(`ValidatorError - ${error.message}`))

        }
    }

    async confirmBlog(req, res, next) {
        try {
            const id = req.params.id;
            return res.json(await blogService.confirmBlog(id))
        } catch (error) {
            next(ApiError.BadRequest(`ValidatorError - ${error.message}`))
        }
    }

    async banBlog(req, res, next) {
        try {
            const id = req.params.id;
            return res.json(await blogService.banBlog(id))
        } catch (error) {
            next(ApiError.BadRequest(`ValidatorError - ${error.message}`))
        }
    }

}

module.exports = new BlogController();
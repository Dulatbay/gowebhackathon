const blogService = require('../services/blog-service');
const fileService = require('../services/file-service');
const ApiError = require("../exceptions/api-error");
const BlogModel = require("../models/blog-model");

class BlogController {
    async createBlog(req, res, next) {
        try {
            if (!req.headers['content-type'].startsWith('multipart/form-data')) next(ApiError.BadRequest('Its not form-data'))
            const images = req.files?.images;

            const arrPathImages = fileService.getImages(images);

            const blogData = {...req.body, images: arrPathImages};
            const blog = await blogService.createBlog(blogData);

            return res.json(blog);
        } catch (error) {
            next(error);
        }
    }

    async getBlogById(req, res, next) {
        try {
            const {id} = req.params;
            const blog = await blogService.getBlogById(id);
            return res.json(blog);
        } catch (error) {
            next(error);
        }
    }
    async getAllBlogs(req, res, next) {
        try {
            const blogs = await blogService.getAllBlogs();
            return res.json(blogs);
        } catch (error) {
            next(error);
        }
    }

    async getPopularBlogs(req, res, next) {
        try {
            const blogs = await blogService.getPupularBlogs()();
            return res.json(blogs);
        } catch (error) {
            next(error);
        }
    }
    async getNewestBlog(req, res, next) {
        try {
            const blogs = await blogService.getNewestBlogs();
            return res.json(blogs);
        } catch (error) {
            next(error);
        }
    }
    async getMostViewedBlogs(req, res, next) {
        try {
            const blogs = await blogService.getMostViewedBlogs();
            return res.json(blogs);
        } catch (error) {
            next(error);
        }
    }

    async getUserBlogs(req, res, next) {
        try {
            const userId = req.params.userId;
            const blogs = await blogService.getBlogsByUser({userId});
            return res.json(blogs);
        } catch (error) {
            next(error);
        }
    }

    async updateBlog(req, res, next) {
        try {
            if (!req.headers['content-type'].startsWith('multipart/form-data')) next(ApiError.BadRequest('Its not form-data'))
            const blogId = req.params.id;
            const blogData = req.body;
            const blogs = await blogService.updateBlog({blogId}, {blogData});
            return res.json(blogs);
        } catch (error) {
            next(error);
        }
    }

    async deleteBlog(req, res, next) {
        try {
            const blogId = req.params.id;
            const result = await blogService.deleteBlog({blogId});
            return res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async confirmBlog(req, res, next) {
        try{
            const id = req.params.id;
            return res.json(await blogService.confirmBlog(id))
        }catch (error){
            next(error)
        }
    }
    async banBlog(req, res, next) {
        try{
            const id = req.params.id;
            return res.json(await blogService.banBlog(id))
        }catch (error){
            next(error)
        }
    }

}

module.exports = new BlogController();
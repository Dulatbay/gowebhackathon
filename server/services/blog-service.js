const BlogModel = require("../models/blog-model");

class BlogService {
    async getAllBlogs() {
        const blogs = await BlogModel.find({})
            .populate('authors', 'email')
            .populate('authors', 'username')
        return blogs;
    }

    async getPopularBlogs() {
        const blogs = await BlogModel.find()
            .sort({likes: -1})
            .populate('author', '-password')
            .limit(10);
        return blogs;
    }

    async getMostViewedBlogs() {
        const blogs = await BlogModel.find()
            .sort({views: -1})
            .populate('author', '-password')
            .limit(10);
        return blogs;
    }

    async getNewestBlogs() {
        const blogs = await BlogModel.find()
            .sort({createdAt: -1})
            .populate('author', '-password')
            .limit(10);
        return blogs;
    }

    async createBlog(blogData) {
        return (await BlogModel.create(blogData));
    }

    async getBlogById(id) {
        const blog = await BlogModel.findById(id)

        return blog;
    }

    async updateBlog(blogId, blogData) {
        const blog = await BlogModel.findByIdAndUpdate(
            blogId,
            {$set: blogData},
            {new: true}
        );
        return blog;
    }

    async deleteBlog(id) {
        const blog = await BlogModel.findByIdAndDelete(id);
        return blog;
    }

    async confirmBlog(id) {
        const blog = await BlogModel.findByIdAndUpdate(id, {isActivated: true}, {new: true})
        return blog;
    }

    async banBlog(id) {
        const blog = await BlogModel.findByIdAndUpdate(id, {isActivated: false}, {new: true})
        return blog;
    }

    async getBlogsByUser(userId) {
        const blogs = await BlogModel.find({authors: userId})
        return blogs;
    }


}

// todo: delete same codes

module.exports = new BlogService();

const BlogModel = require("../models/blog-model");
const ApiError = require("../exceptions/api-error");

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


    async addTag(blogId, tag) {
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            throw new Error('Blog not found');
        }
        if (!blog.tags.includes(tag)) {
            blog.tags.push(tag);
            await blog.save();
        }
        return blog;
    }

    async removeTag(blogId, tag) {
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            throw new Error('Blog not found');
        }
        const index = blog.tags.indexOf(tag);
        if (index !== -1) {
            blog.tags.splice(index, 1);
            await blog.save();
        }
        return blog;
    }

    async addLike(blogId, userId) {
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            throw new Error('Blog not found');
        }
        if (!blog.likes.includes(userId)) {
            blog.likes.push(userId);
            await blog.save();
        }
        else throw ApiError.BadRequest('User already liked it')
        return blog;
    }

    async removeLike(blogId, userId) {
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            throw new Error('Blog not found');
        }
        const index = blog.likes.indexOf(userId);
        if (index !== -1) {
            blog.likes.splice(index, 1);
            await blog.save();
        }
        else throw ApiError.BadRequest('User not liked it')
        return blog;
    }

    async addComment(blogId, commentId) {
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            throw new Error('Blog not found');
        }
        await blog.addComment(commentId);
        return blog;
    }
}

// todo: delete same codes

module.exports = new BlogService();

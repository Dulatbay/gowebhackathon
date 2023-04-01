const BlogModel = require("../models/blog-model");
const ApiError = require("../exceptions/api-error");

class BlogService {
    async getAllBlogs() {
        const res = await BlogModel.find({});
        return res;
    }

    async createBlog(authors, content, images, tags) {
        const blog = new BlogModel({
            authors: authors,
            content: content,
            images: images,
            tags: tags
        });
        await blog.save();
        return blog;
    }

    async getBlogById(id) {
        const blog = await BlogModel.findById(id)
            .populate('authors', 'username')
            .populate('likes', 'username')
            .populate('brandLikes', 'name')
            .populate('comments.author', 'username')
            .populate('saves', 'username')
            .populate('shares', 'username')
            .populate('supportBrands', 'name');
        return blog;
    }

    async updateBlog(id, blogData) {
        const blog = await BlogModel.findById(id);
        if (!blog) {
            throw ApiError.BadRequest('Blog not found');
        }
        if (blogData.authors) {
            blog.authors = blogData.authors;
        }
        if (blogData.content) {
            blog.content = blogData.content;
        }
        if (blogData.images) {
            blog.images = blogData.images;
        }
        if (blogData.tags) {
            blog.tags = blogData.tags;
        }
        await blog.save();
        return blog;
    }

    async deleteBlog(id) {
        const result = await BlogModel.deleteOne({_id: id});
        if (result.deletedCount === 0) {
            throw ApiError.BadRequest('Blog not found');
        }
    }

    async confirmBlog(id) {
        const blog = await BlogModel.findByIdAndUpdate(id, {isActivated: true}, {new: true})
        return blog;
    }

    async banBlog(id) {
        const blog = await BlogModel.findByIdAndUpdate(id, {isActivated: false}, {new: true})
        return blog;
    }
   async getBlogsByUser(id) {
       const blogs = await BlogModel.find({ authors: id }).populate("authors");
       return blogs;
    }


}

module.exports = new BlogService();

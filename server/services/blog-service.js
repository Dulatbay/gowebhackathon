const BlogModel = require("../models/blog-model");
class BlogService {
    async getAllBlogs() {
        return (await BlogModel.find({}));
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
            .populate('authors', 'username')
            .populate('likes', 'username')
            .populate('brandLikes', 'name')
            .populate('comments.author', 'username')
            .populate('saves', 'username')
            .populate('shares', 'username')
            .populate('supportBrands', 'name');
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
           .populate('author', '-password')
           .populate({
               path: 'comments',
               populate: {path: 'author', select: '-password'},
           })
           .populate('likes', '-password')
           .populate('brandLikes', '-password')
           .populate('saves', '-password')
           .populate('shares', '-password')
           .populate('views', '-password');
       return blogs;
    }


}
// todo: delete same codes

module.exports = new BlogService();

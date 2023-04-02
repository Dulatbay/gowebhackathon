import $api from "../http";

export default class BlogService {

    static async fetchAll() {
        return $api.get('/api/blogs')
    }

    static async fetchCreate(blog) {
        return $api.post('/api/blogs', blog)
    }

    static async fetchOnAddLike(blogId) {
        return $api.patch(`/api/blogs/${blogId}/like`)
    }

    static async fetchOnRemoveLike(blogId) {
        return $api.delete(`/api/blogs/${blogId}/like`)
    }


}
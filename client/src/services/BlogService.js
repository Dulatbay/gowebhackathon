import $api from "../http";

export default class BlogService {

    static async fetchWithParams(currentPage, blogsPerPage, sortBy) {
        return $api.get(`/api/blogs?page=${currentPage}&limit=${blogsPerPage}&sort=${sortBy}`)
    }


    static async fetchWithParam(sortBy='createdAt') {
        return $api.get(`/api/blogs?sort=${sortBy}`)
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
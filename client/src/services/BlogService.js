import $api from "../http";

export default class BlogService {

    static async fetchAll() {
        return $api.get('/api/blogs')
    }

    static async fetchCreate(blog){
        return $api.post('/api/blogs', blog)
    }
}
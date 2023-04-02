import $api from "../http";

export default class CategoryService{
    static async fetchAll(){
        return $api.get('/api/categories')
    }
    static async fetchById(id){
        return $api.get(`/api/categories/${id}`)
    }

}
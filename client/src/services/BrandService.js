import $api from "../http";

export default class BrandService{
    static async fetchCreate(){
        return $api.post('/api/brands')
    }
    static async fetchById(id){
        return $api.get(`/api/brands/${id}`)
    }

    static async fetchAll(){
        return $api.get(`/api/brands/`)
    }

}
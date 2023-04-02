import $api from "../http";

export default class UserService{
    static async fetchAll(){
        return $api.get('/api/users')
    }
    static async fetchById(id){
        return $api.get(`/api/users/${id}`)
    }
}
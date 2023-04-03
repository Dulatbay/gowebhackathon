import $api from "../http";

export default class UserService{
    static async fetchAll(){
        return $api.get('/api/users')
    }
    static async fetchById(id){
        return $api.get(`/api/users/${id}`)
    }

    static async updateUsername(username, id){
        return $api.patch(`/api/users/${id}`, {username})
    }

}
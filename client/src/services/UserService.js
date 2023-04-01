import $api from "../http";

export default class UserService{
    static fetchUsers(){
        return $api.get('/users')
    }
    static fetchUserById(id){
        return $api.get(`/users/${id}`)
    }

}
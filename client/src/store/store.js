import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";

export default class Store{
    user = {}
    isAuth = false
    constructor() {
        makeAutoObservable(this)
    }
    setAuth(value){
        this.isAuth = value
    }

    setUser(user){
        this.user = user;
    }

    async login(email, password){
        try {
            const res = await AuthService.login(email, password)
            console.log(res);
            localStorage.setItem('token', res.data.accessToken)
            this.setAuth(true)
            this.setUser(res.data.user)
        }catch (e) {
            console.log(e)
        }
    }
    async registration(email, password){
        try {
            const res = await AuthService.registration(email, password)
            console.log(res);
            localStorage.setItem('token', res.data.accessToken)
            this.setAuth(true)
            this.setUser(res.data.user)
        }catch (e) {
            console.log(e)
        }
    }
    async logout(){
        try {
            const res = await AuthService.logout()
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
        }catch (e) {
            console.log(e)
        }
    }
    async check(){
        try {
            const res = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})
            console.log(res);
            localStorage.setItem('token', res.data.accessToken)
            this.setAuth(true)
            this.setUser(res.data.user)
        }catch (e) {
            console.log(e)
        }
    }
}

import $api from "../http";

export default class ProductService {
    static async fetchWithParams(sortBy='createdAt') {
        return $api.get(`/api/products?sort=${sortBy}`)
    }
}
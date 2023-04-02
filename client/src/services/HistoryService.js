import $api from "../http";

export default class HistoryService {
    static async fetchAll() {
        return $api.get('/api/histories');
    }

    static async fetchById(id) {
        return $api.get(`/api/histories/${id}`);
    }

    static async fetchCreate(payload) {
        return $api.post('/api/histories', payload);
    }

    static async fetchUpdate(id, payload) {
        return $api.put(`/api/histories/${id}`, payload);
    }

    static async fetchDelete(id) {
        return $api.delete(`/api/histories/${id}`);
    }
}

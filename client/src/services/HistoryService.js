import $api from "../http";

export default class HistoryService {
    static fetchHistories() {
        return $api.get('/histories');
    }

    static fetchHistoryById(id) {
        return $api.get(`/histories/${id}`);
    }

    static createHistory(payload) {
        return $api.post('/histories', payload);
    }

    static updateHistory(id, payload) {
        return $api.put(`/histories/${id}`, payload);
    }

    static deleteHistory(id) {
        return $api.delete(`/histories/${id}`);
    }
}

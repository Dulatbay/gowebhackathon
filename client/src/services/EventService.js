import $api from "../http";

export default class EventService {

    static async fetchAll() {
        return $api.get('/api/events')
    }

    static async fetchCreate(event) {
        return $api.post('/api/events', event)
    }
    static async fetchById(eventId) {
        return $api.get(`/api/events/${eventId}`)
    }
    static async fetchOnAddLike(eventId) {
        return $api.patch(`/api/events/${eventId}/like`)
    }

    static async fetchOnRemoveLike(eventId) {
        return $api.delete(`/api/events/${eventId}/like`)
    }



}
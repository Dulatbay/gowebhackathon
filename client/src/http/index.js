import axios from 'axios'

export const API_URL = 'http://localhost:5000'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})


$api.interceptors.response.use((config) => config, async (error) => {
    const request = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        request._isRetry = true
        try {
            const res = await axios.get(`${API_URL}/api/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', res.data.accessToken)
            console.log("Отработал интерцептор")
            return $api.request(request);
        } catch (e) {
            console.log(e)
            throw e;
        }

    }
    throw error
})

export default $api
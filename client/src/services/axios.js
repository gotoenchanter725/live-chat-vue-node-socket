import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL; //BASE URL

axios.interceptors.request.use(function(request) {
    if (localStorage.getItem('token'))
        request.headers = {
            ...request.headers,
            token: localStorage.getItem('token')
        }
    return request
})
export default axios
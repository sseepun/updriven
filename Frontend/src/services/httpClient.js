import axios from "axios";
import store from '@/store'

axios.interceptors.request.use(function (config) {
    let source = axios.CancelToken.source();
    config.cancelToken = source.token;
    store.commit('axios/addCancelToken', source);
    return config;
}, function (error) {
return Promise.reject(error);
});

axios.interceptors.response.use(
    response => {
        return response
    },
    err => {
        if(!err.response){
            return Promise.reject(err)
        }
        else if (err.response.status === 401 && err.response.data.message === 'Token expired') {
            router.push('/')
        }
        else if (err.response.status === 401 && err.response.data.message === 'Not logged in') {
            store.dispatch('authentication/signout')
            router.push('/')
        }
        return Promise.reject(err)
    }
)

export default axios;
import axios from "axios";
import store from '../store/index.js';
import router from '../router/index.js';

axios.defaults.baseURL = (process.env.VUE_APP_API_URL + '/apis')
axios.defaults.withCredentials = true;

axios.interceptors.request.use( 
    function (config) {
        let source = axios.CancelToken.source();
        config.cancelToken = source.token;
        store.commit('axios/addCancelToken', source);
        return config;
    }, function (error) {
        console.log( 'request error :', err.response)
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        return response
    },
    err => {
        console.log( 'response error :', err)
        console.log( 'router :', router.currentRoute._rawValue.fullPath)
        if (err.message === "Network Error" || err.message === undefined ) {
            console.log('The server is down');

            if ( router.currentRoute._rawValue.fullPath !== "/" ) {
                localStorage.clear();
                router.push('/');
                router.go();
            }
        }
        else if (!err.response) {
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
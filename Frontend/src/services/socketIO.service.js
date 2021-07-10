import axios from 'axios';
import authHeader from './auth-header';

class SocketIO {
    initializer() {
        let socket = io.connect(process.env.VUE_APP_SERVERURL ,{
            withCredentials: false,
            transports : ['websocket']
        });

        return socket;
    }


    // ffGetAllTgadmin() {
    //     return axios.get('ff/getalltgadmin', { headers: authHeader() })
        
    // }

    // tg_adminGetAllFF(company_id) {
    //     return axios.get(`tgadmin/getallff/${company_id}` , { headers: authHeader() })
    // }
    
}

export default new SocketIO();
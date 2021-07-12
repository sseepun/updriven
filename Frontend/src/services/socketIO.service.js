import axios from 'axios';

class SocketIO {
    initializer() {
        let socket = io.connect("http://localhost:8081" ,{
            withCredentials: false,
            transports : ['websocket']
        });
        console.log('connect to port 8081')
        return socket;
    }


    getAllNotification() {
        return axios.get('/user/notification') 
    }

    // tg_adminGetAllFF(company_id) {
    //     return axios.get(`tgadmin/getallff/${company_id}` , { headers: authHeader() })
    // }
    
}

export default new SocketIO();
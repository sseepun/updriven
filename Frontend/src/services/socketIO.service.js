import axios from 'axios';

class SocketIO {
    initializer() {
        let socket = io.connect(process.env.VUE_APP_API_URL ,{
            withCredentials: false,
            transports : ['websocket']
        });
        
        return socket;
    }
    
}

export default new SocketIO();
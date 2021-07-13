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
    
}

export default new SocketIO();
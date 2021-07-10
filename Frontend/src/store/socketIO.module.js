import SocketIO from '../services/socketIO.service';
import UserService from '../services/user.service';
import moment from 'moment';

export const socketIO = {
    namespaced: true,
    state: {
        roomid: null,
        userid: null,
        avatar: '',
        loadingStatus: false,
        message: '',
        messageHistory: [],
        socket: SocketIO.initializer(),
        contents: [],
        contentCount: 0
    },
    actions: {
        getAllNotify({ commit , dispatch }) {
            return new Promise((resolve, reject) => {        
                UserService.getAllNotification().then(
                    response => {
                        commit('fetchContents', response.data)
                        resolve(response)
                    },
                    error => {
                        if (error.response.data.message == 'refresh token expired') {                            
                            dispatch('auth/logout', null, {root:true});
                        }
                        reject(error)
                    }
                )
            })
        },
        removeNotification({ commit , dispatch }, id) {
            return new Promise((resolve, reject) => {        
                UserService.removeNotification(id).then(
                    response => {
                        dispatch('getAllNotify')
                        resolve(response)
                    },
                    error => {
                        reject(error)
                    }
                )
            })
        },
        tg_adminGetAllTgadmin() {
            return new Promise((resolve, reject) => {        
                SocketIO.tg_adminGetAllTgadmin().then(
                    response => {
                        resolve(response)
                    },
                    error => {
                        reject(error)
                    }
                )
            })
        },
        ffGetAllTgadmin({ commit }) {
            return new Promise((resolve, reject) => {        
                SocketIO.ffGetAllTgadmin().then(
                    response => {
                        resolve(response)
                    },
                    error => {
                        reject(error)
                    }
                )
            })
        },
        tg_adminGetAllFF({ commit },company_id) {
            return new Promise((resolve, reject) => {        
                SocketIO.tg_adminGetAllFF(company_id).then(
                    response => {
                        resolve(response)
                    },
                    error => {
                        reject(error)
                    }
                )
            })
        },
        driverGetAllFF({ commit },company_id) {
            return new Promise((resolve, reject) => {        
                SocketIO.driverGetAllFF(company_id).then(
                    response => {
                        resolve(response)
                    },
                    error => {
                        reject(error)
                    }
                )
            })
        },
        async joinChatRoom ({ commit, state }) {
            await commit('chageLoadingStatus', true)

            await state.socket.emit('join', {
                job_id: state.roomid,
                user_id: state.userid,
            });
            
            await SocketIO.messageHistory(state.roomid).then( oldMessage => {
                
                console.log('message: ',oldMessage.data)
                let lengthOldMessagee = (oldMessage.data).length
                let profileAvatar = (oldMessage.data)[lengthOldMessagee - 1]
                oldMessage.data.pop()
                var newArr = oldMessage.data.map(function(item){
                    let avatarindex = profileAvatar.find(element => element.name == item.avatar)
                    return {
                        self: item.self, 
                        message: item.message,
                        avatar: avatarindex['value'],
                        createdAt: item.createdAt,
                    };
                });
                state.messageHistory = [...newArr]
            })

            await commit('chageLoadingStatus', false)
        },
        async leaveChatRoom ({ commit, state }) {
            await commit('chageLoadingStatus', true)
            await state.socket.emit('leave', state.userid)
            await commit('chageLoadingStatus', false)
        },
        async receiveMessage ({ commit, state }) {
            await state.socket.on('recive-message', (data) => {
                state.messageHistory.push({
                    self: false,
                    message: data.message,
                    avatar: data.avatar,
                    createdAt: data.createdAt
                })
            });
        },
        async sendMessage ({ dispatch, commit, state }, message ) {
            await commit('chageLoadingStatus', true)
            let tempDate = Date.now()
            await state.socket.emit('send-message', { 
                user_id: state.userid,                
                job_id: state.roomid,
                message: message,
                createdAt: tempDate
              });
            await state.messageHistory.push({
                self: true,
                message: message,
                avatar: state.avatar,
                createdAt: new Date(tempDate)
            })

            await commit('chageLoadingStatus', false)
        }
    },
    mutations: {
        fetchContents(state, input) {
            state.contents = []
            input.forEach(notification => {
                state.contents.push({
                    detail: notification.detail,
                    createdAt: notification.createdAt,
                    job_id: notification.job[0],
                    _id: notification._id
                })
            });           
        },
        InitialInfo(state, input) {
            state.roomid = input.roomid
            state.userid = input.userid
            state.avatar = input.avatar
        },
        chageLoadingStatus(state, input) {
            state.loadingStatus = input
        },
        fetchContent_Noti(state, input) {
            state.contents.push(input)
        },
    },
    getters: {
        getAmount(state) {
            return state.contents.length
        },
        getContents(state) {
            return state.contents
        },
        getSocketID(state) {
            return state.socket
        },
        getMessageHistory(state) {
            return state.messageHistory
        },
        getAmount_Noti(state) {
            return state.contents.length
        },
        getContents_Noti(state) {
            return state.contents
        },
    }
}
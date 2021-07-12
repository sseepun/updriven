import SocketIO from '../services/socketIO.service';
import moment from 'moment';

export const socketIO = {
    namespaced: true,
    state: {
        roomid: null,
        userid: null,
        avatar: '',
        loadingStatus: false,
        socket: SocketIO.initializer(),
        contents: [],
        contentCount: 0
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
        async addNotification ({ commit, state },input ) {
            console.log(input)
            await commit('addNotification', input)
        },
        async removeAllNotification ({ commit, state } ) {
            await commit('removeAllNotification')
            console.log("Remove All Notify Successful")
        
        },

    },
    mutations: {
        fetchContents(state, input) {
            state.contents = []
            input.forEach(notification => {
                state.contents.push({
                    post_id: notification.post_id,
                    user_id: notification.user_id,
                    user_like_post_id: notification.user_like_post_id,
                    user_like_post_firstname: notification.user_like_post_firstname,
                    user_like_post_lastname: notification.user_like_post_lastname,
                    _id: notification._id,
                    createdAt: notification.createdAt,
                })
            });           
        },
        addNotification(state,input) {
            state.contents.push(input)
        }
        ,
        removeAllNotification(state) {
            state.contents = []
        }
        ,
        InitialInfo(state, input) {
            state.roomid = input.roomid
            state.userid = input.userid
            state.avatar = input.avatar
        },
        chageLoadingStatus(state, input) {
            state.loadingStatus = input
        },
    },
}
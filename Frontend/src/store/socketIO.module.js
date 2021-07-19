import SocketIO from '../services/socketIO.service';
import { userService } from '../services'
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
                userService.getAllNotify().then(
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
                userService.clear_notify(id).then(
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
        async removeAllNotification ({ commit, state } ) {
            await commit('removeAllNotification')        
        },

    },
    mutations: {
        fetchContents(state, input) {
            state.contents = []
            input.forEach(notification => {
                const [yyyy,mm,dd,hh,mi]=notification.createdAt.split(/[/:\-T]/)
                state.contents.push({
                    _id: notification._id,
                    action_type: notification.action_on,
                    action_to: notification.action_to_content,
                    user_id: notification.action_by.user_detail[0]._id,
                    user_like_post_firstname: notification.action_by.user_detail[0].firstname,
                    user_like_post_lastname: notification.action_by.user_detail[0].lastname,
                    createdAt: `${dd}-${mm}-${yyyy} ${hh}:${mi}`,
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
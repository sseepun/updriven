import { authenService } from '../services';
import { userService } from '../services';
import { checkCookie } from '../helpers/authHeader';
import User from '../models/user.js';
import router from '../router';
import countrySC from '../assets/country-state-city'
const user = JSON.parse(localStorage.getItem(`${process.env.VUE_APP_API_URL}_USER`));

export const authentication = {
  namespaced: true,
  state: {
      user: user,
      otherUser: null,
      authenticated: user? true: false
  },
  getters: {
    user: state => state.user,
    isSignedin: state => state.user? true: false,
    isAdmin: state => state.user && state.user.is_admin,
    isUser: state => state.user,
    isAuthenticated: state => state.authenticated
  },
  // Asynchronous 
  actions: {
    async signin({ dispatch, commit }, { authen, password }) {
      return await new Promise((resolve, reject) => {        
         authenService.signin( authen, password ).then(
          response => {
            var resUser = new User(
              response._id,
              response.user_detail[0].firstname,
              response.user_detail[0].lastname,
              response.user_detail[0].profile_pic,
              response.user_detail[0].background_pic,
              response.user_detail[0].state_id,
              response.user_detail[0].province,
              response.email,
              response.user_detail[0].organization,
            )
            resUser.country_id = response.user_detail[0].country_id
            resUser.about = response.user_detail[0].about_us
            resUser.interests = response.user_detail[0].interests

            commit('signinSuccess', resUser);
            dispatch('csc/mapFullName',{"country_code":response.user_detail[0].country_id , "states_code":response.user_detail[0].state_id}, { root: true })
            dispatch('alert/assign', { type: 'Success', message: 'Sign In Successful' }, { root: true })
            resolve(response)
          },
          error => {
            commit('signinFailed');
            dispatch('alert/assign', { type: 'Warning', message: error.response.data.message }, { root: true })
            reject(error)
          }
        ).catch(err => {
          commit('signinFailed');
          dispatch('alert/assign', { type: 'Danger', message: 'System error' }, { root: true })
        })
      })
    },
    signout({ dispatch, commit }) {
      return new Promise((resolve, reject) => {    
        authenService.logout().then(
          response => {
            commit('signout');
            dispatch('alert/assign', { type: 'Success', message: 'Sign Out Successful' }, { root: true })
            resolve(response)
          }).catch(err => {
            reject(err)
          })
        });
    },
    register({ dispatch, commit }, regisuser) {
      return new Promise((resolve, reject) => {   
      authenService.register(regisuser).then(
        response => {
          dispatch('alert/assign', { type: 'Success', message: 'Sign Up Successful' }, { root: true })
          
          resolve(response)
        },
        error => {
          dispatch('alert/assign', { type: 'Warning', message: error.response.data.message }, { root: true })
          
          reject(error)
        }
      ).catch(err => {
        dispatch('alert/assign', { type: 'Danger', message: 'System error.' }, { root: true })
        
      })
    })
    },
    verifyEmailRegister({ dispatch,commit }, token) {
      return new Promise((resolve, reject) => {   
      authenService.verifyEmailRegister(token).then(
        response => {
          dispatch('alert/assign', { type: 'Success', message: 'Verify Email Successful' }, { root: true })
          
          resolve(response.data)
        },
        error => {
          dispatch('alert/assign', { type: 'Warning', message: error.response.data.message }, { root: true })
          
          reject(error)
        }
      ).catch(err => {
         dispatch('alert/assign', { type: 'Danger', message: 'System error' }, { root: true })
        
      })
    })
    },
    forgetPasswordSentEmail({ dispatch,commit }, email) {
      return new Promise((resolve, reject) => {   
      authenService.forgetPasswordSentEmail(email).then(
        response => {
           dispatch('alert/assign', { type: 'Success', message: response.message }, { root: true })
          
          resolve(response)
        },
        error => {
           dispatch('alert/assign', { type: 'Warning', message: error.response.data.message }, { root: true })
          
          reject(error)
        }
      ).catch(err => {
         dispatch('alert/assign', { type: 'Danger', message: 'System error' }, { root: true })
        
      })
    })
    },
    resetPassword({ dispatch,commit },input) {
      return new Promise((resolve, reject) => {   
      authenService.resetPassword(input).then(
        response => {
          dispatch('alert/assign',  { type: 'Success', message: response.message }, { root: true })
          resolve(response)
        },
        error => {
          dispatch('alert/assign', { type: 'Warning', message: error.response.message }, { root: true })
          reject(error)
        }
      ).catch(err => {
        dispatch('alert/assign', { type: 'Danger', message: 'System error' }, { root: true })
      })
    })
    },
    checkPassword({ commit },token) {
      return new Promise((resolve, reject) => {   
      authenService.checkTokenResetPassword(token).then(
        response => {
          resolve(response)
        },
        error => {
          reject(error)
        }
      ).catch(err => {
        
      })
    })
    },
    checkAuth({ commit, dispatch }, id) {      
      return new Promise((resolve, reject) => {    
        authenService.verify(id).then(
          response => {
            var resUser = new User(
              response._id,
              response.user_detail[0].firstname,
              response.user_detail[0].lastname,
              response.user_detail[0].profile_pic,
              response.user_detail[0].background_pic,
            )
            resUser.email = response.email
            resUser.country_id = response.user_detail[0].country_id
            resUser.state_id = response.user_detail[0].state_id
            dispatch('csc/mapFullName',{"country_code":response.user_detail[0].country_id , "states_code":response.user_detail[0].state_id}, { root: true })
            commit('signinSuccess', resUser);
            dispatch('alert/assign', { type: 'Success', message: 'Sign In Successful' }, { root: true })
            resolve(response)
          },
          error => {
            commit('signinFailed');
            dispatch('alert/assign', { type: 'Warning', message: error.response.data.message }, { root: true })
            reject(error)
          }).catch(err => {
            commit('signinFailed');
            dispatch('alert/assign', { type: 'Danger', message: 'System error' }, { root: true })
          })
        });
    },
    editProfile({ commit, dispatch },input) {
      return new Promise((resolve, reject) => {   
      userService.editProfile(input).then(
        
        response => {
          dispatch( 'getProfile' )
          dispatch('alert/assign', { type: 'Success', message: 'Edit Profile Successful' }, { root: true })
          resolve(response)
        },
        error => {
          reject(error)
        }
      ).catch(err => {
        
      })
    })
    },
    editProfileImage({ commit, dispatch },response) {
      return new Promise((resolve, reject) => {   
        var resUser = new User(
          response._id,
          response.user_detail[0].firstname,
          response.user_detail[0].lastname,
          response.user_detail[0].profile_pic,
          response.user_detail[0].background_pic,
          response.user_detail[0].state_id,
          response.user_detail[0].province,
          response.email,
          response.user_detail[0].organization,
        )
        resUser.country_id = response.user_detail[0].country_id
        resUser.about = response.user_detail[0].about_us
        resUser.interests = response.user_detail[0].interests
        commit('signinSuccess', resUser);
        dispatch('alert/assign', { type: 'Success', message: 'Edit Image Successfully.' }, { root: true })
        resolve(response)
    })
    },  
    editProfileBackground({ commit, dispatch },response) {
      return new Promise((resolve, reject) => {   
        var resUser = new User(
          response._id,
          response.user_detail[0].firstname,
          response.user_detail[0].lastname,
          response.user_detail[0].profile_pic,
          response.user_detail[0].background_pic,
          response.user_detail[0].state_id,
          response.user_detail[0].province,
          response.email,
          response.user_detail[0].organization,
        )
        resUser.country_id = response.user_detail[0].country_id
        resUser.about = response.user_detail[0].about_us
        resUser.interests = response.user_detail[0].interests
        commit('signinSuccess', resUser);
        dispatch('alert/assign', { type: 'Success', message: 'Edit Background Successfully.' }, { root: true })
        resolve(response)
    })
    },
    getProfile({ commit , dispatch}) {
      return new Promise((resolve, reject) => {   
      userService.getProfile().then(
        response => {
          var resUser = new User(
            response._id,
            response.user_detail[0].firstname,
            response.user_detail[0].lastname,
            response.user_detail[0].profile_pic,
            response.user_detail[0].background_pic,
            response.user_detail[0].state_id,
            response.user_detail[0].province,
            response.email,
            response.user_detail[0].organization,
          )
          resUser.country_id = response.user_detail[0].country_id
          resUser.about = response.user_detail[0].about_us
          resUser.interests = response.user_detail[0].interests
          dispatch('csc/mapFullName',{"country_code":response.user_detail[0].country_id , "states_code":response.user_detail[0].state_id}, { root: true })
          commit('signinSuccess', resUser);
          resolve()
        },
        error => {
          reject(error)
        }
      ).catch(err => {
        
      })
    })
    },
    getFollowing({ commit , dispatch }) {
      return new Promise((resolve, reject) => {        
          userService.getFollowing().then(
              response => {
                let myFollowings = response.data.results
                for (let i = 0; i < myFollowings.length; i++) { 
                  if(myFollowings[i].follow.user_detail[0].country_id != "-"){
                    var country = countrySC.find(function(item){
                      if(item.numeric_code === myFollowings[i].follow.user_detail[0].country_id){
                        return item;
                      }})
                    myFollowings[i].follow.user_detail[0].countryFullName = country.name
                    if(myFollowings[i].follow.user_detail[0].state_id != "-" ){
                      var states = country.states.find(function(item){
                        if(item.state_code === myFollowings[i].follow.user_detail[0].state_id){
                          return item;
                        }})
                      myFollowings[i].follow.user_detail[0].stateFullName = states.name
                    }
                    else{
                      myFollowings[i].follow.user_detail[0].stateFullName = "-"
                    }
                  }
                }
                commit('setFollowing', myFollowings);
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
    getImages({ commit , dispatch }) {
      return new Promise((resolve, reject) => {        
          userService.getImages().then(
              response => {
                let images = response.data.results
                if(images.length > 0){
                  for (let i = 0; i < images.length; i++) { 
                    let pathList = images[i].path.split('/')
                    const lastIndex = pathList.pop(pathList.length-1)
                    const hostPath =  pathList.join('/')+"/"
                    images[i].hostPath = hostPath
                    images[i].name = lastIndex
                    images[i].id = i
                    images[i].image = images[i].path
                  }
                }
                commit('setImages', images);
                resolve(response)
              },
              error => {
                  reject(error)
              }
          )
      })
    },
    
  },
  // Synchronous
  mutations: {
    signinSuccess(state, user) {
      
      localStorage.setItem(`${process.env.VUE_APP_API_URL}_USER`, JSON.stringify(user));
      state.user = user;
      state.authenticated = true
    },
    signinFailed(state) {
      localStorage.removeItem(`${process.env.VUE_APP_API_URL}_USER`);
      localStorage.removeItem(`${process.env.VUE_APP_API_URL}_CSC`);
      state.user = null;
      state.authenticated = false
    },
    async signout(state) {
      await localStorage.removeItem(`${process.env.VUE_APP_API_URL}_USER`);
      localStorage.removeItem(`${process.env.VUE_APP_API_URL}_CSC`);
      state.user = null;
      state.authenticated = false
    },
    setFollowing(state , myFollowings) {
      let localUser = localStorage.getItem(`${process.env.VUE_APP_API_URL}_USER`);
      
      localUser = JSON.parse(localUser)
      localUser.followings = myFollowings
      state.user.followings = myFollowings
      
      localStorage.setItem(`${process.env.VUE_APP_API_URL}_USER`, JSON.stringify(localUser));
    },
    setImages(state , images) {
      let localUser = localStorage.getItem(`${process.env.VUE_APP_API_URL}_USER`);
      localUser = JSON.parse(localUser)
      localUser.images = images
      state.user.images = images
      
      localStorage.setItem(`${process.env.VUE_APP_API_URL}_USER`, JSON.stringify(localUser));
    },
  }
}

import { authenService } from '../services';
import { userService } from '../services';
import { checkCookie } from '../helpers/authHeader';
import User from '../models/user.js';
import router from '../router';

const user = JSON.parse(localStorage.getItem(`${process.env.VUE_APP_API_URL}_USER`));

export const authentication = {
  namespaced: true,
  state: {
      user: user,
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
          res => {
            var resUser = new User(
              res._id,
              res.user_detail[0].firstname,
              res.user_detail[0].lastname,
              res.user_detail[0].profile_pic,
              res.user_detail[0].background_pic,
              res.user_detail[0].state_id,
              res.user_detail[0].province,
              res.email,
              res.user_detail[0].organization,
            )
            commit('signinSuccess', resUser);
            //dispatch('alert/assign', { type: 'Success', message: 'Sign in successful' }, { root: true })
            resolve(res)
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
            dispatch('alert/assign', { type: 'Success', message: 'Sign out successful' }, { root: true })
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
          dispatch('alert/assign', { type: 'Success', message: 'Sign up successful' }, { root: true })
          
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
          dispatch('alert/assign', { type: 'Success', message: 'Verify email successful' }, { root: true })
          
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
            commit('signinSuccess', resUser);
            dispatch('alert/assign', { type: 'Success', message: 'Sign in successful' }, { root: true })
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
          dispatch('alert/assign', { type: 'Success', message: 'Edit profile successful' }, { root: true })
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
        commit('signinSuccess', resUser);
        dispatch('alert/assign', { type: 'Success', message: 'Edit image successfully.' }, { root: true })
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
        commit('signinSuccess', resUser);
        dispatch('alert/assign', { type: 'Success', message: 'Edit Background successfully.' }, { root: true })
        resolve(response)
    })
    },
    getProfile({ commit }) {
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
          commit('signinSuccess', resUser);
          resolve()
        },
        error => {
          reject(error)
        }
      ).catch(err => {
        
      })
    })
    }
    
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
      state.user = null;
      state.authenticated = false
    },
    async signout(state) {
      await localStorage.removeItem(`${process.env.VUE_APP_API_URL}_USER`);
      state.user = null;
      state.authenticated = false
    }
  }
}

import { authenService } from '../services';
import { userService } from '../services';
import { checkCookie } from '../helpers/authHeader';
import User from '../models/user.js';
import router from '../router';

const user = JSON.parse(localStorage.getItem(`${process.env.VUE_APP_API_URL}_USER`));

export const authentication = {
  namespaced: true,
  state: {
      user: user
  },
  getters: {
    user: state => state.user,
    isSignedin: state => state.user? true: false,
    isAdmin: state => state.user && state.user.is_admin,
    isUser: state => state.user
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
              '/assets/img/bg/01.jpg',
              res.user_detail[0].state_id,
              res.user_detail[0].province,
              res.email,
              res.user_detail[0].organization,
            )
            commit('signinSuccess', resUser);
            //dispatch('alert/assign', { type: 'Success', message: 'Signed in successfully.' }, { root: true })
            resolve(res)
          },
          error => {
            commit('signinFailed');
            dispatch('alert/assign', { type: 'Warning', message: error.response.data.message }, { root: true })
            reject(error)
          }
        ).catch(err => {
          commit('signinFailed');
          dispatch('alert/assign', { type: 'Danger', message: 'System error.' }, { root: true })
        })
      })
    },
    signout({ dispatch, commit }) {
      return new Promise((resolve, reject) => {    
        authenService.logout().then(
          response => {
            commit('signout');
            dispatch('alert/assign', { type: 'Success', message: 'Signed out successfully.' }, { root: true })
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
          dispatch('alert/assign', { type: 'Success', message: 'Signed up successfully.' }, { root: true })
          
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
          dispatch('alert/assign', { type: 'Success', message: 'Verify email successfully.' }, { root: true })
          
          resolve(response.data)
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
         dispatch('alert/assign', { type: 'Danger', message: 'System error.' }, { root: true })
        
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
        dispatch('alert/assign', { type: 'Danger', message: 'System error.' }, { root: true })
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
              '/assets/img/bg/01.jpg'
            )
            commit('signinSuccess', resUser);
            dispatch('alert/assign', { type: 'Success', message: 'Signed in successfully.' }, { root: true })
            resolve(response)
          },
          error => {
            commit('signinFailed');
            dispatch('alert/assign', { type: 'Warning', message: error.response.data.message }, { root: true })
            reject(error)
          }).catch(err => {
            commit('signinFailed');
            dispatch('alert/assign', { type: 'Danger', message: 'System error.' }, { root: true })
          })
        });
    },
    editProfile({ commit, dispatch },input) {
      return new Promise((resolve, reject) => {   
      userService.editProfile(input).then(
        response => {
          dispatch( 'getProfile' )
          dispatch('alert/assign', { type: 'Success', message: 'Edit profile successfully.' }, { root: true })
          resolve(response)
        },
        error => {
          reject(error)
        }
      ).catch(err => {
        
      })
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
            '/assets/img/bg/01.jpg',
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
      state.user = user;
      localStorage.setItem(`${process.env.VUE_APP_API_URL}_USER`, JSON.stringify(user));
    },
    signinFailed(state) {
      state.user = null;
      localStorage.removeItem(`${process.env.VUE_APP_API_URL}_USER`);
    },
    signout(state) {
      state.user = null;
      localStorage.removeItem(`${process.env.VUE_APP_API_URL}_USER`);
    }
  }
}

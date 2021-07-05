import { authenService } from '../services'
import { checkCookie } from '../helpers/authHeader';
import User from '../models/user.js';
import router from '../router';

const user = JSON.parse(localStorage.getItem(`${process.env.VUE_APP_API_URL}_USER`));

export const authentication = {
  namespaced: true,
  state: {
      user: user,
      alert: { type: null, message: null }
  },
  getters: {
    user: state => state.user,
    isSignedin: state => state.user? true: false,
    isAdmin: state => state.user && state.user.is_admin,
    isUser: state => state.user,
    alert: state => state.alert,
  },
  // Asynchronous 
  actions: {
    async signin({ dispatch, commit }, { authen, password }) {
      // authenService.signin(authen, password)
      //   .then(res => {
      //     if(res.response_status=='Success'){
      //       let user = res.user_detail;
      //       commit('signinSuccess', user);
      //       commit('updateAlert', { type: 'Success', message: 'Signed in successfully.' });
      //       if(user.is_admin) router.push('/admin/dashboard');
      //       else router.push('/bunit/dashboard');
      //     }else{
      //       commit('signinFailed');
      //       commit('updateAlert', { type: 'Warning', message: res.returnMessage });
      //     }
      //   })
      //   .catch(err => {
      //     commit('signinFailed');
      //     commit('updateAlert', { type: 'Danger', message: 'System error.' });
      //   });
      return await new Promise((resolve, reject) => {        
         authenService.signin( authen, password ).then(
          res => {
            var resUser = new User(
              res._id,
              res.user_detail[0].firstname,
              res.user_detail[0].lastname,
              '/assets/img/profile/01.jpg',
              '/assets/img/bg/01.jpg'
            )

            commit('signinSuccess', resUser);
            commit('updateAlert', { type: 'Success', message: 'Signed in successfully.' });
            resolve(res)
          },
          error => {
            commit('signinFailed');
            commit('updateAlert', { type: 'Warning', message: error.response.data.message });
            reject(error)
          }
        ).catch(err => {
          commit('signinFailed');
          commit('updateAlert', { type: 'Danger', message: 'System error.' });
        })
      })
    },
    signout({ dispatch, commit }) {
      return new Promise((resolve, reject) => {    
        authenService.logout().then(
          response => {
            commit('signout');
            commit('updateAlert', { type: 'Success', message: 'Signed out successfully.' });
            resolve(response)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
        });
    },
    register({ commit }, regisuser) {
      return new Promise((resolve, reject) => {   
      authenService.register(regisuser).then(
        response => {
          commit('updateAlert', { type: 'Success', message: 'Signed up successfully.' });
          resolve(response)
        },
        error => {
          console.log(error.response.data.message)
          commit('updateAlert', { type: 'Warning', message: error.response.data.message });
          reject(error)
        }
      ).catch(err => {
        commit('updateAlert', { type: 'Danger', message: 'System error.' });
      })
    })
    },
    verifyEmailRegister({ commit }, token) {
      return new Promise((resolve, reject) => {   
      authenService.verifyEmailRegister(token).then(
        response => {
          console.log("verify email success")
          commit('updateAlert', { type: 'Success', message: 'Verify email successfully.' });
          resolve(response.data)
        },
        error => {
          console.log(error.response.data.message)
          commit('updateAlert', { type: 'Warning', message: error.response.data.message });
          reject(error)
        }
      ).catch(err => {
        commit('updateAlert', { type: 'Danger', message: 'System error.' });
      })
    })
    },
    checkAuth({ commit }, id) {      
      return new Promise((resolve, reject) => {    
        authenService.verify(id).then(
          response => {
            var resUser = new User(
              response._id,
              response.user_detail[0].firstname,
              response.user_detail[0].lastname,
              '/assets/img/profile/01.jpg',
              '/assets/img/bg/01.jpg'
            )
            commit('signinSuccess', resUser);
            commit('updateAlert', { type: 'Success', message: 'Signed in successfully.' });
            resolve(response)
          },
          error => {
            commit('signinFailed');
            commit('updateAlert', { type: 'Warning', message: error.response.data.message });
            reject(error)
          }).catch(err => {
            commit('signinFailed');
            commit('updateAlert', { type: 'Danger', message: 'System error.' });
          })
        });
    },
    
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
    },
    updateAlert(state, alert) {
      state.alert = alert;
      setTimeout(() => {
        state.alert = { type: null, message: null };
      }, 2400);
    }
  }
}

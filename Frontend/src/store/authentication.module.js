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
    checkSignin({ dispatch, commit }) {
    //   var that = this;
    //   if(that.state.user && that.state.user.refresh_token){
    //     authenService.refreshToken(that.state.user.refresh_token)
    //       .then(res => {
    //         if(res.response_status=='Success'){
    //           let user = that.state.user;
    //           user.access_token = res.result.access_token;
    //           user.refresh_token = res.result.refresh_token;
    //           commit('signinSuccess', user);
    //         }else{
    //           dispatch('signout');
    //         }
    //       })
    //       .catch(err => {
    //         dispatch('signout');
    //       });
    //   }else{
    //     commit('signout');
    //   }
    },
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
              '/assets/img/bg/01.jpg')
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
    async signFacebook({ commit }) {
      return await new Promise((resolve, reject) => {        
        authenService.signFacebook().then(
          res => {
            console.log(res)
            /*var resUser = new User(
              res._id, 
              res.user_detail[0].firstname, 
              res.user_detail[0].lastname, 
              '/assets/img/profile/01.jpg', 
              '/assets/img/bg/01.jpg')
            commit('signinSuccess', resUser);            
            resolve(res)*/
            resolve(res)
          },
          error => {
            reject(error)
          }
        )
     })
     /*await authenService.signFacebook().then( res => {
        localStorage.setItem('user', JSON.stringify(res))
        console.log('res', res);
      }).catch( err => {
        return Promise.reject(err)
      })*/
    },
    async signGoogle({ commit }) {
      return await new Promise((resolve, reject) => {        
        authenService.signGoogle().then(
          res => {
            console.log(res)
            /*var resUser = new User(
              res._id, 
              res.user_detail[0].firstname, 
              res.user_detail[0].lastname, 
              '/assets/img/profile/01.jpg', 
              '/assets/img/bg/01.jpg')
            commit('signinSuccess', resUser);            
            resolve(res)*/
            resolve(res)
          },
          error => {
            reject(error)
          }
        )
      })
     /*await authenService.signFacebook().then( res => {
        localStorage.setItem('user', JSON.stringify(res))
        console.log('res', res);
      }).catch( err => {
        return Promise.reject(err)
      })*/
    },
    signout({ dispatch, commit }) {
      commit('signout');
      commit('updateAlert', { type: 'Success', message: 'Signed out successfully.' });
    },
    register({ commit }, regisuser) {
      return authenService.register(regisuser).then(
        response => {
          commit('updateAlert', { type: 'Success', message: 'Signed up successfully.' });
          return Promise.resolve(response.data);
        },
        error => {
          commit('updateAlert', { type: 'Warning', message: error.response.data.message });
          console.log(error.response.data.message)
          return Promise.reject(error);
        }
      );
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
      router.push('/auth/signin');
    },
    updateAlert(state, alert) {
      state.alert = alert;
      setTimeout(() => {
        state.alert = { type: null, message: null };
      }, 2400);
    }
  }
}

import { authenService } from '../services'
import router from '../router';

export const authentication = {
  namespaced: true,
  state: {
    // user: localStorage.getItem(`${process.env.VUE_APP_API_URL}_USER`)
    //   ? JSON.parse(localStorage.getItem(`${process.env.VUE_APP_API_URL}_USER`))
    //   : null,
    user: {
      id: 1,
      firstname: 'Emilia',
      lastname: 'Bubu',
      avatar: '/assets/img/profile/01.jpg',
      background: '/assets/img/bg/01.jpg'
    },
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

      await authenService.signin( authen, password ).then( res => {
        localStorage.setItem('user_info', JSON.stringify(res))
        console.log('res', res);
      }).catch( err => {
        return Promise.reject(err)
      })
    },
    signout({ dispatch, commit }) {
      commit('signout');
      commit('updateAlert', { type: 'Success', message: 'Signed out successfully.' });
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

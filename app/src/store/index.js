import { createStore } from 'vuex';
// import { authenService } from '../services';
import router from '../router'

export default createStore({
  state: {
    member: localStorage.getItem(`${process.env.VUE_APP_API_URL}_MEMBER`)
      ? JSON.parse(localStorage.getItem(`${process.env.VUE_APP_API_URL}_MEMBER`))
      : null,
    alert: { type: null, message: null }
  },
  getters: {
    member: state => state.member,
    isSignedin: state => state.member? true: false,
    isAdmin: state => state.member && state.member.is_admin,
    isMember: state => state.member && !state.member.is_admin,
    alert: state => state.alert,
  },
  // Asynchronous 
  actions: {
    checkSignin({ dispatch, commit }) {
    //   var that = this;
    //   if(that.state.member && that.state.member.refresh_token){
    //     authenService.refreshToken(that.state.member.refresh_token)
    //       .then(res => {
    //         if(res.response_status=='Success'){
    //           let member = that.state.member;
    //           member.access_token = res.result.access_token;
    //           member.refresh_token = res.result.refresh_token;
    //           commit('signinSuccess', member);
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
    signin({ dispatch, commit }, { authen, password }) {
      // authenService.signin(authen, password)
      //   .then(res => {
      //     if(res.response_status=='Success'){
      //       let member = res.member_detail;
      //       commit('signinSuccess', member);
      //       commit('updateAlert', { type: 'Success', message: 'Signed in successfully.' });
      //       if(member.is_admin) router.push('/admin/dashboard');
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
    },
    signout({ dispatch, commit }) {
      commit('signout');
      commit('updateAlert', { type: 'Success', message: 'Signed out successfully.' });
    }
  },
  // Synchronous
  mutations: {
    signinSuccess(state, member) {
      state.member = member;
      localStorage.setItem(`${process.env.VUE_APP_API_URL}_MEMBER`, JSON.stringify(member));
    },
    signinFailed(state) {
      state.member = null;
      localStorage.removeItem(`${process.env.VUE_APP_API_URL}_MEMBER`);
    },
    signout(state) {
      state.member = null;
      localStorage.removeItem(`${process.env.VUE_APP_API_URL}_MEMBER`);
      router.push('/auth/signin');
    },

    updateAlert(state, alert) {
      state.alert = alert;
      setTimeout(() => {
        state.alert = { type: null, message: null };
      }, 2400);
    }
  }
})

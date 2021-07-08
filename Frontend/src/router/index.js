import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js';

function requireAuth (to, from, next) {
  if ( store.getters['auth/isAuthenticated'] ) {
    const LS_ROUTE_KEY = localStorage.getItem('LS_ROUTE_KEY')
    if (LS_ROUTE_KEY != null) {
      localStorage.removeItem('LS_ROUTE_KEY')
      next(LS_ROUTE_KEY)
    } else {
      next()
    }
    
  } else {
    localStorage.setItem('LS_ROUTE_KEY', to.fullPath);
    next('/');
  }  
}
const routes = [

  // Auth Pages
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/auth/SignIn.vue')
  },
  {
    path: '/auth/signin',
    name: 'AuthSignInPage',
    component: () => import('../views/auth/SignIn.vue')
  },
  {
    path: '/auth/signup',
    name: 'AuthSignUpPage',
    component: () => import('../views/auth/SignUp.vue')
  },
  {
    path: '/auth/success/:id',
    name: 'AuthSuccess',
    component: () => import('../components/AuthSuccess.vue')
  },
  {
    path: '/auth/forget-password',
    name: 'AuthForgetPasswordPage',
    component: () => import('../views/auth/ForgetPassword.vue')
  },
  {
    path: '/auth/check-forget-password/:token?',
    name: 'AuthForgetConfirmPasswordPage',
    component: () => import('../views/auth/ForgetConfirmPassword.vue')
  },
  {
    path: '/auth/verify-token-register/:token?',//  path: '/auth/verify-token-register/:token?',
    name: 'AuthVerifyTokenRegisterPage',
    component: () => import('../views/auth/verifyTokenRegister.vue')
  },

  // User Pages
  {
    path: '/user/dashboard/:username?',
    name: 'UserDashboardPage',
    component: () => import('../views/user/Dashboard.vue')
  },
  {
    path: '/user/profile',
    name: 'UserProfilePage',
    component: () => import('../views/user/Profile.vue')
  },
  {
    path: '/user/chat',
    name: 'UserChatPage',
    component: () => import('../views/user/Chat.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// router.beforeEach((to, from, next) => {
  
// });

export default router

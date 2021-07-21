import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js';

const routes = [

  // Auth Pages
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/auth/SignIn.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters['authentication/isAuthenticated']) next({ name: 'UserDashboardPage' })
      else next()
    }
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
    path: '/auth/verify-token-register/:token?',
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
  
  {
    path: '/user/profile/update',
    name: 'UserProfileUpdatePage',
    component: () => import('../views/user/ProfileUpdate.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  if (!(to.path.includes('/auth') || to.name == 'Home') && !store.getters['authentication/isAuthenticated']) next({ name: 'Home' })
  else next()
});

export default router

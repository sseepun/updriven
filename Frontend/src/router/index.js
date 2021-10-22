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

  // Auth Mentor Pages
  {
    path: '/auth/signup-mentor',
    name: 'AuthSignUpMentorPage',
    component: () => import('../views/auth/SignUpMentor.vue')
  },

  // User Pages
  {
    path: '/user/dashboard/:careers?',
    name: 'UserDashboardPage',
    component: () => import('../views/user/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      if ( from.name === "UserProfilePage" ) store.dispatch('post/clearCategory')
      else if ( from.name === "UserProfilePage" ) store.dispatch('post/clearCategory')
      next()
    }
  },
  {
    path: '/user/chat',
    name: 'UserChatPage',
    component: () => import('../views/user/Chat.vue')
  },
  {
    path: '/user/search',
    name: 'SearchPage',
    component: () => import('../views/user/Search.vue')
  },
  
  {
    path: '/user/profile/:username?',
    name: 'UserProfilePage',
    component: () => import('../views/user/Profile.vue'),
    beforeEnter: (to, from, next) => {
      if ( from.name === "UserDashboardPage" ) store.dispatch('post/clearCategory')
      next()
    }
  },
  {
    path: '/user/profile/about/:username?',
    name: 'UserProfileAboutPage',
    component: () => import('../views/user/ProfileAbout.vue')
  },
  {
    path: '/user/profile/following/:username?',
    name: 'UserProfileFollowingPage',
    component: () => import('../views/user/ProfileFollowing.vue')
  },
  {
    path: '/user/profile/image/:username?',
    name: 'UserProfileImagePage',
    component: () => import('../views/user/ProfileImage.vue')
  },
  {
    path: '/user/profile/update',
    name: 'UserProfileUpdatePage',
    component: () => import('../views/user/ProfileUpdate.vue')
  },

  // Page Not Found
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../components/PageNotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  store.dispatch('axios/cancelPendingRequests');
  if (!(to.path.includes('/auth') || to.name == 'Home') && !store.getters['authentication/isAuthenticated']) next({ name: 'Home' })
  else next()
});

export default router
